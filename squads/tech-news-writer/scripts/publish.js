const fs = require("fs");
const path = require("path");

// Resolução inteligente do .env.local — busca na raiz do portal
function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, "../../../portal/.env.local"),
    path.resolve(__dirname, "../../portal/.env.local"),
    path.resolve(process.cwd(), "portal/.env.local"),
    path.resolve(process.cwd(), ".env.local"),
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, "utf8");
      return Object.fromEntries(
        envFile
          .split("\n")
          .filter((line) => line.includes("=") && !line.startsWith("#"))
          .map((line) => {
            const idx = line.indexOf("=");
            return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
          })
      );
    }
  }

  console.error("❌ Erro: Nenhum arquivo .env.local encontrado.");
  console.error("   Caminhos verificados:", possiblePaths.join(", "));
  process.exit(1);
}

const env = loadEnv();

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Erro: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontradas no .env.local.");
  process.exit(1);
}

async function publishNews() {
  const jsonFilePath = process.argv[2];

  if (!jsonFilePath) {
    console.error("❌ Erro: Forneça o caminho do arquivo JSON com os dados da notícia.");
    console.error("   Uso: node publish.js <caminho-do-json>");
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), jsonFilePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Erro: O arquivo não foi encontrado em: ${resolvedPath}`);
    process.exit(1);
  }

  let payload = {};

  try {
    const fileContent = fs.readFileSync(resolvedPath, "utf-8");
    payload = JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Erro ao ler o JSON:`, error.message);
    process.exit(1);
  }

  // Schema unificado: imagem_url (URL pública), NÃO imagem_base64
  const requiredKeys = ["titulo", "conteudo_markdown", "categoria", "autor"];
  for (const key of requiredKeys) {
    if (!payload[key]) {
      console.error(`❌ Erro: Faltando a chave '${key}' no JSON.`);
      process.exit(1);
    }
  }

  // Validação do Título (10 a 100 caracteres)
  const tituloLength = payload.titulo.length;
  if (tituloLength < 10 || tituloLength > 100) {
    console.error(`❌ Erro: O título deve ter entre 10 e 100 caracteres. (Atual: ${tituloLength})`);
    process.exit(1);
  }

  // Validação da imagem (aceita imagem_url ou fallback)
  const imageUrl = payload.imagem_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop";

  if (payload.imagem_url && !payload.imagem_url.startsWith("http")) {
    console.error(`❌ Erro: imagem_url deve ser uma URL pública válida (http/https).`);
    process.exit(1);
  }

  try {
    console.log("🚀 Publicando notícia no portal FolhaByte...");

    const noticiaRecord = {
      titulo: payload.titulo,
      autor: payload.autor || "Redação Tech",
      categoria: payload.categoria,
      conteudo_markdown: payload.conteudo_markdown,
      imagem_url: imageUrl,
      publicado_em: new Date().toISOString(),
      views: 0,
    };

    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(noticiaRecord),
    });

    if (dbRes.ok) {
      const insertedData = await dbRes.json();
      const newPostId = insertedData[0]?.id;

      console.log(`✅ Matéria publicada com sucesso!`);
      console.log(`   📌 ID: ${newPostId}`);
      console.log(`   🖼️ Imagem: ${imageUrl}`);
      console.log(`   📂 Categoria: ${payload.categoria}`);

      // GATILHO PARA FASE 2: MONETIZAÇÃO
      if (newPostId) {
        console.log("🔗 Ativando Affiliate Squad (Fase 2) para monetização automática...");
        try {
          const { execSync } = require("child_process");
          const triggerScript = path.join(__dirname, "trigger-phase2.js");
          if (fs.existsSync(triggerScript)) {
            execSync(`node "${triggerScript}" ${newPostId} "${resolvedPath}"`, { stdio: "inherit" });
          } else {
            console.log("   ⚠️ trigger-phase2.js não encontrado — monetização ignorada.");
          }
        } catch (triggerErr) {
          console.error("   ⚠️ Aviso: Falha ao disparar o Affiliate Squad:", triggerErr.message);
        }
      }

      process.exit(0);
    } else {
      const errText = await dbRes.text();
      console.error("❌ Erro de Banco de Dados:", errText);
      process.exit(1);
    }
  } catch (err) {
    console.error("💥 Falha Crítica na operação:", err.message);
    process.exit(1);
  }
}

publishNews();

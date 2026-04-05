const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// As chaves públicas do Supabase (que o Portal usa)
const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjgwNDgsImV4cCI6MjA5MDkwNDA0OH0.qch5v_Gy1iGXf5N0GqopfXgK9ty-PpInyRnCtWZ-Il4";

async function publishNews() {
  const jsonFilePath = process.argv[2];

  if (!jsonFilePath) {
    console.error("❌ Erro: Forneça o caminho do arquivo JSON com os dados da notícia.");
    process.exit(1);
  }

  // Se o caminho passado começar com "squads/", certifique-se de resolver a partir da raiz
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

  const requiredKeys = ["titulo", "conteudo_markdown", "categoria", "imagem_base64", "autor"];
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

  try {
    console.log("🚀 Iniciando injeção direta no Banco de Dados (Bypass do Dashboard)...");

    let imageUrl = "";

    // 1. Processar e Enviar Imagem pro Storage do Supabase
    if (payload.imagem_base64.startsWith("data:image")) {
      console.log("🖼️ Fazendo upload da imagem gerada pelo esquadrão...");
      const matches = payload.imagem_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const extension = mimeType.split('/')[1] || 'png';
        const fileName = `squad_auto_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${extension}`;
        
        // Converte base64 para buffer (binário) nativamente no Node
        const buffer = Buffer.from(base64Data, "base64");

        const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/capas_noticias/${fileName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': mimeType,
                'x-upsert': 'true'
            },
            body: buffer // enviando o buffer cru da imagem
        });

        if (!uploadRes.ok) {
            const errBody = await uploadRes.text();
            throw new Error(`Falha no upload da imagem pro Supabase: ${errBody}`);
        }

        // Construir URL Pública da imagem recém postada
        imageUrl = `${SUPABASE_URL}/storage/v1/object/public/capas_noticias/${fileName}`;
      }
    }

    // 2. Montar Objeto da Notícia e Enviar
    console.log("📑 Escrevendo o arquivo final na base de dados principal...");
    
    const noticiaRecord = {
        titulo: payload.titulo,
        autor: payload.autor || "Redação Tech",
        categoria: payload.categoria,
        conteudo_markdown: payload.conteudo_markdown, // Corrigido para conteudo_markdown
        imagem_url: imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
        views: 0 // Corrigido de engajamento para views
    };

    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
        method: "POST",
        headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation" // Agora pedimos os dados de volta para pegar o ID
        },
        body: JSON.stringify(noticiaRecord)
    });

    if (dbRes.ok) {
      const insertedData = await dbRes.json();
      const newPostId = insertedData[0]?.id;

      console.log(`✅ Matéria lançada com sucesso! ID: ${newPostId}`);
      console.log(`🌐 A URL da imagem ficou: ${imageUrl}`);

      // GATILHO PARA FASE 2: MONETIZAÇÃO
      if (newPostId) {
        console.log("🔗 Ativando Affiliate Squad (Fase 2) para monetização automática...");
        try {
          const { execSync } = require("child_process");
          const triggerScript = path.join(__dirname, "trigger-phase2.js");
          // Executa o gatilho passando o ID e o caminho do JSON original para contexto
          execSync(`node "${triggerScript}" ${newPostId} "${resolvedPath}"`, { stdio: "inherit" });
        } catch (triggerErr) {
          console.error("⚠️ Aviso: Falha ao disparar o Affiliate Squad:", triggerErr.message);
        }
      }

      process.exit(0);
    } else {
      const errText = await dbRes.text();
      console.log("❌ Erro de Banco de Dados:", errText);
      process.exit(1);
    }

  } catch (err) {
    console.error("💥 Falha Crítica na operação:", err.message);
    process.exit(1);
  }
}

publishNews();

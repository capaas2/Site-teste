const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// 1. Carregar variáveis de ambiente do .env.local
function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, "../../portal/.env.local"),
    path.resolve(__dirname, "../../../portal/.env.local"),
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
  process.exit(1);
}

const env = loadEnv();

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const AZURE_TRANSLATOR_KEY = env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = env.AZURE_TRANSLATOR_REGION;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Erro: Credenciais do Supabase não encontradas no .env.local.");
  process.exit(1);
}

if (!AZURE_TRANSLATOR_KEY || !AZURE_TRANSLATOR_REGION) {
  console.error("❌ Erro: AZURE_TRANSLATOR_KEY ou AZURE_TRANSLATOR_REGION não configuradas no .env.local.");
  console.error("   Por favor, ative o recurso de Tradução na Azure e configure as chaves.");
  process.exit(1);
}

// 2. Função auxiliar para chamar a API do Azure Translator
// 2. Função auxiliar para chamar a API do Azure Translator com Retry para Rate Limits (429)
async function translateText(textsArray, retryCount = 0) {
  const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en&to=es`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_TRANSLATOR_KEY,
        "Ocp-Apim-Subscription-Region": AZURE_TRANSLATOR_REGION,
        "Content-Type": "application/json",
        "X-ClientTraceId": crypto.randomUUID(),
      },
      body: JSON.stringify(textsArray.map(t => ({ text: t }))),
    });

    if (res.status === 429 && retryCount < 5) {
      const waitTime = (retryCount + 1) * 15000; // 15s, 30s, 45s...
      console.warn(`   ⚠️ Limite de requisições excedido (429). Aguardando ${waitTime / 1000}s para tentar novamente (Tentativa ${retryCount + 1}/5)...`);
      await new Promise(r => setTimeout(r, waitTime));
      return await translateText(textsArray, retryCount + 1);
    }

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Erro na API do Translator (HTTP ${res.status}): ${errBody}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Falha na tradução Azure:", err.message);
    throw err;
  }
}

// 3. Executar tradução retroativa de todos os posts do banco
async function runRetroactiveTranslation() {
  console.log("🔍 Buscando posts que necessitam de tradução no Supabase...");

  try {
    // Busca posts onde titulo_en ou conteudo_markdown_en sejam nulos
    // Para atualizar todos, buscamos posts com filtro
    const fetchUrl = `${SUPABASE_URL}/rest/v1/posts?select=id,titulo,conteudo_markdown&or=(titulo_en.is.null,conteudo_markdown_en.is.null)`;
    
    const postsRes = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    });

    if (!postsRes.ok) {
      const errText = await postsRes.text();
      throw new Error(`Erro ao buscar posts: ${errText}`);
    }

    const posts = await postsRes.json();
    console.log(`📋 Encontrados ${posts.length} posts para traduzir.`);

    if (posts.length === 0) {
      console.log("✅ Todos os posts já possuem tradução!");
      process.exit(0);
    }

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`\n[${i + 1}/${posts.length}] Traduzindo post ID: ${post.id}...`);
      console.log(`   📝 Título original: "${post.titulo}"`);

      try {
        // Envia o título e o conteúdo em markdown para tradução
        const translationRes = await translateText([post.titulo, post.conteudo_markdown]);

        // Estrutura o payload de tradução
        // translationRes[0] -> Título (en, es)
        // translationRes[1] -> Conteúdo (en, es)
        const titulo_en = translationRes[0].translations.find(t => t.to === "en").text;
        const titulo_es = translationRes[0].translations.find(t => t.to === "es").text;
        const conteudo_markdown_en = translationRes[1].translations.find(t => t.to === "en").text;
        const conteudo_markdown_es = translationRes[1].translations.find(t => t.to === "es").text;

        console.log(`   🇺🇸 Título EN: "${titulo_en}"`);
        console.log(`   🇪🇸 Título ES: "${titulo_es}"`);

        // Atualiza o registro no Supabase
        const updateUrl = `${SUPABASE_URL}/rest/v1/posts?id=eq.${post.id}`;
        const updateRes = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo_en,
            titulo_es,
            conteudo_markdown_en,
            conteudo_markdown_es
          }),
        });

        if (!updateRes.ok) {
          const updateErr = await updateRes.text();
          console.error(`   ❌ Falha ao atualizar post no banco: ${updateErr}`);
        } else {
          console.log(`   ✅ Post ID ${post.id} atualizado com sucesso!`);
        }

        // Delay de 4 segundos para evitar rate limiting do plano gratuito
        await new Promise(r => setTimeout(r, 4000));

      } catch (postErr) {
        console.error(`   💥 Erro ao processar o post ${post.id}:`, postErr.message);
      }
    }

    console.log("\n🎉 Tradução retroativa concluída com sucesso!");
    process.exit(0);

  } catch (err) {
    console.error("\n💥 Erro crítico no processo de migração:", err.message);
    process.exit(1);
  }
}

runRetroactiveTranslation();

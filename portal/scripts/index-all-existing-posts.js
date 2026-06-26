const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Leitura manual do .env.local para carregar variáveis de ambiente locais
function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, "../.env.local"),
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), "portal/.env.local"),
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
const GOOGLE_CLIENT_EMAIL = env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error("❌ Erro: Chaves do Supabase ou Google Cloud ausentes no .env.local.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Helper de slugify idêntico ao do portal
function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function indexAll() {
  try {
    console.log("🔍 Consultando todos os posts no Supabase...");
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, titulo')
      .order('publicado_em', { ascending: false });

    if (error) throw error;

    console.log(`✅ Busca concluída. Encontrados ${posts.length} posts.`);

    // Limpa aspas extras se as chaves do env as possuírem
    const formattedClientEmail = GOOGLE_CLIENT_EMAIL.replace(/"/g, '').trim();
    const formattedPrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '').trim();

    // Autentica o cliente JWT no Google Cloud
    const jwtClient = new google.auth.JWT({
      email: formattedClientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    await jwtClient.authorize();
    const indexing = google.indexing({ version: 'v3', auth: jwtClient });

    const baseUrl = env.NEXT_PUBLIC_SITE_URL || "https://folhabyte.dev";

    // Dispara a requisição de indexação em lote com um pequeno delay (concorrência amigável)
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const slug = slugify(post.titulo);
      const postUrl = `${baseUrl}/post/${slug}`;

      console.log(`[${i + 1}/${posts.length}] 📤 Notificando Google: ${postUrl}`);

      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: postUrl,
            type: 'URL_UPDATED',
          },
        });
        console.log(`   ✅ Sucesso! Status: ${response.statusText || 'OK'}`);
      } catch (err) {
        console.error(`   ⚠️ Falha ao notificar URL: ${postUrl}. Erro:`, err.message);
      }

      // Delay de 300ms para respeitar o limite de rate limit de chamadas da API
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    console.log("\n🎉 Processamento em lote concluído com sucesso!");

  } catch (err) {
    console.error("💥 Erro crítico no processo de indexação em lote:", err.message);
  }
}

indexAll();

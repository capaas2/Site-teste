const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

/**
 * Verificador de Unicidade de Imagens para o Squad FolhaByte.
 * 
 * Modo 1 (sem argumentos): Lista todas as URLs recentes.
 * Modo 2 (com URL): Verifica se uma URL específica já foi usada.
 * 
 * Uso:
 *   node check_image_uniqueness.js                    → Lista URLs recentes
 *   node check_image_uniqueness.js <URL_PARA_CHECAR>  → Verifica se é única
 */

// Carregar credenciais do .env.local
function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, "portal/.env.local"),
    path.resolve(__dirname, "../portal/.env.local"),
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
  console.error("❌ Erro: .env.local não encontrado.");
  process.exitCode = 1;
  return null;
}

const env = loadEnv();
if (!env) return;

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function getRecentImages(limit = 20) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, titulo, imagem_url, conteudo_markdown")
    .order("publicado_em", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao buscar imagens:", error.message);
    process.exitCode = 1;
    return new Map();
  }

  const usedUrls = new Map(); // URL → { postId, titulo }

  data.forEach((post) => {
    // Imagem de capa
    if (post.imagem_url) {
      usedUrls.set(post.imagem_url.split("?")[0], {
        postId: post.id,
        titulo: post.titulo,
        tipo: "capa",
      });
    }

    // Imagens dentro do markdown
    if (post.conteudo_markdown) {
      const markdownImgs = post.conteudo_markdown.matchAll(
        /\[IMAGEM:\s*([^\s|]+)/gi
      );
      for (const match of markdownImgs) {
        usedUrls.set(match[1].trim().split("?")[0], {
          postId: post.id,
          titulo: post.titulo,
          tipo: "corpo",
        });
      }

      // Também capturar imagens em formato markdown padrão ![alt](url)
      const stdImgs = post.conteudo_markdown.matchAll(
        /!\[.*?\]\((https?:\/\/[^\s)]+)\)/gi
      );
      for (const match of stdImgs) {
        usedUrls.set(match[1].trim().split("?")[0], {
          postId: post.id,
          titulo: post.titulo,
          tipo: "corpo",
        });
      }
    }
  });

  return usedUrls;
}

async function main() {
  const urlToCheck = process.argv[2];
  const usedUrls = await getRecentImages();
  if (usedUrls.size === 0 && process.exitCode === 1) return;

  if (urlToCheck) {
    // Modo 2: Verificar URL específica
    const cleanUrl = urlToCheck.split("?")[0];
    const conflict = usedUrls.get(cleanUrl);

    if (conflict) {
      console.log(`❌ [DUPLICADA] Esta imagem já foi usada!`);
      console.log(`   📰 Post: "${conflict.titulo}"`);
      console.log(`   🆔 ID: ${conflict.postId}`);
      console.log(`   📍 Tipo: ${conflict.tipo}`);
      process.exitCode = 1;
    } else {
      console.log(`✅ [ÚNICA] Esta imagem NÃO foi usada nos últimos ${usedUrls.size} registros.`);
      process.exitCode = 0;
    }
  } else {
    // Modo 1: Listar todas
    console.log(`--- AUDITORIA DE UNICIDADE: ${usedUrls.size} URLs em uso ---`);
    let i = 0;
    for (const [url, info] of usedUrls) {
      i++;
      if (i <= 15) {
        console.log(`  ${i}. [${info.tipo}] ${url}`);
        console.log(`     └─ "${info.titulo}"`);
      }
    }
    if (usedUrls.size > 15) {
      console.log(`  ... e mais ${usedUrls.size - 15} URLs.`);
    }
    console.log(`----------------------------------`);
    process.exitCode = 0;
  }
}

main();

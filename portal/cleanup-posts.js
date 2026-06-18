const fs = require('fs');
const path = require('path');

function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, "../portal/.env.local"),
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
  return {};
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const keptIds = [
  "91af7174-7c4f-4d48-9a2a-4c466f48fc89",
  "9d9672b2-79eb-461f-aadd-116161a46b93",
  "eba2d5f4-befb-4220-8bb6-ea986f19360a"
];

async function cleanup() {
  console.log("🧼 Iniciando limpeza do banco de dados...");
  console.log(`📌 Mantendo apenas os posts: ${keptIds.join(", ")}`);

  const idsQuery = keptIds.join(",");
  const logsUrl = `${supabaseUrl}/rest/v1/newsletter_logs?post_id=not.in.(${idsQuery})`;
  const postsUrl = `${supabaseUrl}/rest/v1/posts?id=not.in.(${idsQuery})`;

  try {
    // 1. Deletar logs de newsletter dependentes
    console.log("📨 Deletando logs de newsletter antigos...");
    const logsRes = await fetch(logsUrl, {
      method: "DELETE",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!logsRes.ok) {
      const logsErr = await logsRes.text();
      console.error("⚠️ Aviso: Erro ao deletar logs de newsletter:", logsErr);
    } else {
      console.log("✅ Logs de newsletter limpos com sucesso.");
    }

    // 2. Deletar os posts
    console.log("📰 Deletando posts antigos...");
    const postsRes = await fetch(postsUrl, {
      method: "DELETE",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      }
    });

    if (!postsRes.ok) {
      const postsErr = await postsRes.text();
      console.error("❌ Erro ao deletar posts:", postsErr);
      return;
    }

    const deletedData = await postsRes.json();
    console.log(`✅ Sucesso! Foram deletados ${deletedData.length} posts do banco de dados.`);
    deletedData.forEach(post => {
      console.log(`   🗑️ Removido: "${post.titulo}" (ID: ${post.id})`);
    });
  } catch (error) {
    console.error("💥 Falha na operação de limpeza:", error.message);
  }
}

cleanup();

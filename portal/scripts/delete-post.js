const fs = require('fs');
const path = require('path');

function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, "../../portal/.env.local"),
    path.resolve(__dirname, "../.env.local"),
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

async function deletePost() {
  const postId = process.argv[2];

  if (!postId) {
    console.error("❌ Erro: Forneça o ID do post a ser excluído.");
    console.error("   Uso: node delete-post.js <id-do-post>");
    process.exit(1);
  }

  console.log(`🗑️ Removendo post com ID: ${postId} do Supabase via Fetch...`);

  try {
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/posts?id=eq.${postId}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

    if (dbRes.ok) {
      console.log("✅ Post excluído com sucesso do banco de dados!");
      process.exit(0);
    } else {
      const errText = await dbRes.text();
      console.error("❌ Erro ao deletar o post:", errText);
      process.exit(1);
    }
  } catch (err) {
    console.error("💥 Falha Crítica na operação:", err.message);
    process.exit(1);
  }
}

deletePost();

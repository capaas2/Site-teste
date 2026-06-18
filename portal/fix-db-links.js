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

const postsToFix = [
  {
    id: "91af7174-7c4f-4d48-9a2a-4c466f48fc89",
    name: "Água da IA",
    targetPattern: /> VEJA TAMBÉM: \[.*?\]\(\/post\/.*?\)/gi,
    replacement: `> VEJA TAMBÉM: [Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero](/post/9d9672b2-79eb-461f-aadd-116161a46b93)`
  },
  {
    id: "9d9672b2-79eb-461f-aadd-116161a46b93",
    name: "Intel Loihi 3",
    targetPattern: /> VEJA TAMBÉM: \[.*?\]\(\/post\/.*?\)/gi,
    replacement: `> VEJA TAMBÉM: [SpaceX vê escassez de água como risco crítico para IA](/post/91af7174-7c4f-4d48-9a2a-4c466f48fc89)`
  },
  {
    id: "eba2d5f4-befb-4220-8bb6-ea986f19360a",
    name: "Baterias de Grafeno",
    targetPattern: /> VEJA TAMBÉM: \[.*?\]\(\/post\/.*?\)/gi,
    replacement: `> VEJA TAMBÉM: [Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero](/post/9d9672b2-79eb-461f-aadd-116161a46b93)`
  }
];

async function fixLinks() {
  console.log("🔗 Ajustando links internos dos posts ativos no Supabase...");

  for (const postInfo of postsToFix) {
    const getUrl = `${supabaseUrl}/rest/v1/posts?id=eq.${postInfo.id}&select=conteudo_markdown`;
    
    try {
      const getRes = await fetch(getUrl, {
        method: "GET",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        }
      });

      if (!getRes.ok) {
        console.error(`❌ Erro ao buscar post ${postInfo.name}:`, await getRes.text());
        continue;
      }

      const postData = await getRes.json();
      if (!postData || postData.length === 0) {
        console.error(`❌ Post ${postInfo.name} não encontrado no banco.`);
        continue;
      }

      const originalMd = postData[0].conteudo_markdown;
      const updatedMd = originalMd.replace(postInfo.targetPattern, postInfo.replacement);

      if (originalMd === updatedMd) {
        console.log(`ℹ️ Post ${postInfo.name} já está atualizado ou padrão não encontrado.`);
        continue;
      }

      // Enviar PATCH
      const patchUrl = `${supabaseUrl}/rest/v1/posts?id=eq.${postInfo.id}`;
      const patchRes = await fetch(patchUrl, {
        method: "PATCH",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conteudo_markdown: updatedMd })
      });

      if (patchRes.ok) {
        console.log(`✅ Post "${postInfo.name}" atualizado com sucesso!`);
      } else {
        console.error(`❌ Erro ao atualizar post ${postInfo.name}:`, await patchRes.text());
      }
    } catch (e) {
      console.error(`💥 Falha na operação para ${postInfo.name}:`, e.message);
    }
  }
}

fixLinks();

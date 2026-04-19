const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

async function checkDuplicates() {
  console.log("🔍 Auditando os últimos 10 posts para identificar duplicidade de imagem...");

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=id,titulo,imagem_url&order=created_at.desc&limit=10`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    if (!res.ok) {
      console.error("❌ Erro ao acessar o banco:", await res.text());
      return;
    }

    const posts = await res.json();
    console.table(posts);

    const imageUrls = posts.map(p => p.imagem_url);
    const duplicates = imageUrls.filter((item, index) => imageUrls.indexOf(item) !== index);

    if (duplicates.length > 0) {
      console.log("\n🚨 [ERRO DETECTADO] URLs duplicadas encontradas:");
      duplicates.forEach(url => console.log(`👉 ${url}`));
    } else {
      console.log("\n✅ Nenhuma URL idêntica encontrada (mas podem ser visualmente similares).");
    }

  } catch (e) {
    console.error("❌ Erro fatal:", e.message);
  }
}

checkDuplicates();

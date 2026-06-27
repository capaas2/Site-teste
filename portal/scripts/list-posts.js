const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

async function listRecentPosts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=id,titulo,categoria,publicado_em&order=publicado_em.desc&limit=15`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar posts: ${await res.text()}`);
    }

    const data = await res.json();
    console.log('📰 ÚLTIMOS POSTS DO ACERVO:');
    data.forEach((p, i) => {
      console.log(`${i + 1}. [${p.categoria}] "${p.titulo}" (Data: ${p.publicado_em}) (ID: ${p.id})`);
    });
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

listRecentPosts();

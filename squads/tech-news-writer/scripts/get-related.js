const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjgwNDgsImV4cCI6MjA5MDkwNDA0OH0.qch5v_Gy1iGXf5N0GqopfXgK9ty-PpInyRnCtWZ-Il4";

async function getRelatedPost() {
  const categoria = process.argv[2];

  if (!categoria) {
    console.error("❌ Erro: Forneça a categoria da matéria como argumento.");
    process.exit(1);
  }

  try {
    // Fazendo um LIKE na categoria e pegando apenas os últimos 5
    const url = `${SUPABASE_URL}/rest/v1/posts?select=id,titulo,categoria&categoria=ilike.*${encodeURIComponent(categoria)}*&order=publicado_em.desc&limit=5`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Erro no Supabase:", data);
        process.exit(1);
    }

    if (data.length > 0) {
      // Sorteia um dos 5 artigos mais recentes para variar a recomendação
      const randomPost = data[Math.floor(Math.random() * data.length)];
      console.log(`\n📌 RESULTADO DA BUSCA:`);
      console.log(`ID: ${randomPost.id}`);
      console.log(`Título: ${randomPost.titulo}`);
      console.log(`Categoria Localizada: ${randomPost.categoria}`);
      console.log(`MARKDOWN SUGERIDO: > LEIA MAIS: [${randomPost.titulo}](/post/${randomPost.id})\n`);
    } else {
      console.log("\n⚠️ Nenhuma matéria antiga foi encontrada para esta categoria neste momento.\n");
    }

  } catch (err) {
    console.error("Erro ao buscar no Supabase:", err.message);
  }
}

getRelatedPost();

const fs = require("fs");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const articleContent = fs.readFileSync("./squads/tech-news-writer/output/2026-04-07-2053/v1/final_article.md", "utf-8");

const postData = {
  titulo: "Google Gemma 4: O Modelo de 2B que Superou Gigantes e Redefiniu o Edge AI em 2026",
  imagem_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920&h=1440",
  autor: "Redação Tech",
  categoria: "Inteligência Artificial",
  conteudo_markdown: articleContent
};

async function publishGemma() {
  console.log("🚀 Iniciando publicação autônoma: Google Gemma 4...");

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(postData)
      });
    
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Falha na publicação:", err);
        return;
      }
    
      const [post] = await res.json();
      console.log(`✅ [PUBLICADO] Artigo Gemma 4 disponível no portal! ID: ${post.id}`);
    
  } catch (e) {
      console.error("❌ Erro fatal na publicação:", e.message);
  }
}

publishGemma();

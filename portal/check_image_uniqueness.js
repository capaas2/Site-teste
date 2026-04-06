const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkImages() {
  console.log("--- UNIQUE AUDIT: IMAGENS EM USO ---");
  const { data, error } = await supabase
    .from('posts')
    .select('id, titulo, imagem_url, conteudo_markdown')
    .order('publicado_em', { ascending: false })
    .limit(20);

  if (error) {
    console.error("Erro ao buscar imagens:", error);
    return;
  }

  const urls = new Set();
  
  data.forEach(post => {
    // Adicionar imagem de destaque
    if (post.imagem_url) urls.add(post.imagem_url);
    
    // Buscar imagens no markdown
    const matches = post.conteudo_markdown.matchAll(/\[IMAGEM:\s*([^|\]]+)/gi);
    for (const match of matches) {
      urls.add(match[1].trim());
    }
  });

  console.log(`TOTAL DE URLS ÚNICAS EM USO: ${urls.size}`);
  console.log("URLS RECENTES:");
  Array.from(urls).slice(0, 10).forEach(url => console.log(`- ${url}`));
  console.log("----------------------------------");
}

checkImages();

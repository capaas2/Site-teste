const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getLinks() {
  console.log("--- NEXUS AUDIT: POSTS VÁLIDOS ---");
  const { data, error } = await supabase
    .from('posts')
    .select('id, titulo, categoria')
    .order('publicado_em', { ascending: false });

  if (error) {
    console.error("Erro ao buscar posts:", error);
    return;
  }

  data.forEach(post => {
    console.log(`ID: ${post.id} | TÍTULO: ${post.titulo} | CATEGORIA: ${post.categoria}`);
  });
  console.log("----------------------------------");
}

getLinks();

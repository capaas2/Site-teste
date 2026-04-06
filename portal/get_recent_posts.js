const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getRecentPosts() {
  console.log("--- BUSCANDO POSTS RECENTES ---");
  const { data, error } = await supabase
    .from('posts')
    .select('id, titulo, categoria, publicado_em')
    .order('publicado_em', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Erro ao buscar:", JSON.stringify(error, null, 2));
    return;
  }

  console.log(JSON.stringify(data, null, 2));
  console.log("--- FIM DA LISTA ---");
}

getRecentPosts();

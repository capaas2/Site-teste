const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function listAllCategories() {
  const { data, error } = await supabase
    .from('posts')
    .select('categoria');

  if (error) {
    console.error("Erro:", error);
    return;
  }

  const counts = {};
  data.forEach(p => {
    counts[p.categoria] = (counts[p.categoria] || 0) + 1;
  });

  console.log("--- CATEGORIAS NO BANCO ---");
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`${cat}: ${count} posts`);
    });
  console.log("---------------------------");
}

listAllCategories();

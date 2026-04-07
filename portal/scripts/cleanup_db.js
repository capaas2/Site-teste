const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
  console.log("Limpando banco de dados para o lançamento oficial FolhaByte...");
  
  // IDs das notícias de teste anteriores
  const testIds = [
    "b7f7e912-a65c-482a-9e12-c7f4e912482a",
    "f9a6b12d-3c4e-5f6a-7b8c-9d0e1f2a3b4c"
  ];

  const { error } = await supabase
    .from('posts')
    .delete()
    .in('id', testIds);

  if (error) {
    console.error("Erro ao limpar:", error);
  } else {
    console.log("Sucesso! Antigas notícias de teste removidas.");
  }
}

cleanup();

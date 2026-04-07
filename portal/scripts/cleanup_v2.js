const { createClient } = require('@supabase/supabase-js');

// v2.20.17 - Usando Node 24 native env loading
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: Variáveis de ambiente Supabase não detectadas.");
  console.log("👉 DICA: Rode usando: node --env-file=.env.local scripts/cleanup_v2.js");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
  console.log("🧹 Iniciando limpeza profunda nativa (FolhaByte v2.20.17)...");
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.error("❌ Erve na limpeza:", error);
  } else {
    console.log("✅ Sucesso! Banco de dados limpo pelo motor nativo.");
  }
}

cleanup();

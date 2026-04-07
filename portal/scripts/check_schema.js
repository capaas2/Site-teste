const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("🔍 Verificando colunas da tabela 'posts'...");
  
  // Tenta buscar uma linha para ver as chaves retornadas
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .limit(1);

  if (error) {
    console.error("❌ Erro ao buscar dados:", error);
    
    // Se a tabela estiver vazia, tentamos uma query de RPC ou informamos o erro
    if (error.code === 'PGRST116') {
        console.log("A tabela está vazia. Não é possível inferir colunas via SELECT *.");
    }
  } else if (data && data.length > 0) {
    console.log("✅ Colunas detectadas:", Object.keys(data[0]));
  } else {
    console.log("A tabela está vazia ou a query não retornou dados.");
  }
}

checkSchema();

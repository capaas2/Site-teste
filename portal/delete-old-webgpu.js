const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteOldWebgpu() {
  const targetId = '4821f08d-7a58-446c-aedc-fc6b59a8a874';
  
  console.log(`🧹 Deletando post antigo com ID: ${targetId}...`);
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', targetId)
    .select();

  if (error) {
    console.error("❌ Erro ao deletar:", error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log(`✅ Sucesso! Post antigo deletado: "${data[0].titulo}"`);
  } else {
    console.log("⚠️ Nenhum post encontrado para deleção.");
  }
}

deleteOldWebgpu();

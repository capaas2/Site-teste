const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  console.log("🔍 Inspetando a primeira linha da tabela 'posts'...");
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error("❌ Erro ao buscar dados:", error.message);
    return;
  }

  console.log("✅ Colunas encontradas:", Object.keys(data));
}

inspectSchema();

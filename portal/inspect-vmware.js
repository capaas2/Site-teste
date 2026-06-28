const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectVMware() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', '0046328f-7c4d-42a6-a66e-1fa24781ca32')
    .single();

  if (error) {
    console.error("❌ Erro:", error.message);
    return;
  }

  console.log("TITULO:", data.titulo);
  console.log("IMAGEM_URL:", data.imagem_url);
  console.log("CONTEUDO_MARKDOWN:\n", data.conteudo_markdown);
}

inspectVMware();

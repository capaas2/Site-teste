const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../portal/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testando inserção em subscribers...');
  const testEmail = `test-${Date.now()}@example.com`;
  
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email: testEmail }])
    .select();

  if (error) {
    console.error('ERRO DETALHADO:', JSON.stringify(error, null, 2));
  } else {
    console.log('SUCESSO:', data);
  }
}

test();

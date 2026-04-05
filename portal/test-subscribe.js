const { createClient } = require('@supabase/supabase-js');
// Native Node.js env support for v24
// The user is on Windows, so we use the CWD from the command

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

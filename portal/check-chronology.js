const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkChronology() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('titulo, publicado_em, categoria')
    .order('publicado_em', { ascending: false });

  if (error) {
    console.error("Erro:", error);
    return;
  }

  console.log("=== ORDEM CRONOLÓGICA DAS NOTÍCIAS (Mais recentes primeiro) ===\n");
  posts.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.publicado_em}] - ${p.titulo} (${p.categoria})`);
  });
}

checkChronology();

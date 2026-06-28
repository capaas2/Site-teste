const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Import slugify from portal
// We can copy the slugify logic since it's simple
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlugs() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo');

  if (error) {
    console.error("Erro:", error);
    return;
  }

  console.log("Slugs dos posts atuais na DB:");
  posts.forEach(p => {
    console.log(`- Título: "${p.titulo}"\n  Slug esperado: "/post/${slugify(p.titulo)}"`);
  });
}

checkSlugs();

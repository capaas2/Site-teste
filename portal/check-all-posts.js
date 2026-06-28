const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, categoria, imagem_url, conteudo_markdown');

  if (error) {
    console.error("Erro:", error);
    return;
  }

  console.log(`=== ANALISANDO ${posts.length} POSTS ATIVOS ===\n`);
  posts.forEach((p, idx) => {
    const images = p.conteudo_markdown.match(/\[IMAGEM:[^\]]+\]/gi) || [];
    const internalLinks = p.conteudo_markdown.match(/\/post\/[a-z0-9-]+/gi) || [];
    const externalLinks = p.conteudo_markdown.match(/https?:\/\/[^\s\)]+/gi) || [];
    console.log(`${idx + 1}. Título: "${p.titulo}"`);
    console.log(`   - Categoria: "${p.categoria}"`);
    console.log(`   - Imagem Capa: "${p.imagem_url}"`);
    console.log(`   - Imagens no corpo: ${images.length}`);
    images.forEach(img => console.log(`     * ${img}`));
    console.log(`   - Links internos para outros posts: ${internalLinks.length}`);
    internalLinks.forEach(link => console.log(`     * ${link}`));
    console.log(`   - Links externos/outros: ${externalLinks.length}`);
    console.log('-'.repeat(50));
  });
}

checkAllPosts();

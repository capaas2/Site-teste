/**
 * Script para inspecionar artigos de review remanescentes no banco de dados.
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("🔍 Buscando posts que contêm 'Review' no título...");
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, categoria, conteudo_markdown')
    .ilike('titulo', '%Review%');

  if (error || !posts) {
    console.error("❌ Erro ao buscar posts:", error?.message);
    process.exit(1);
  }

  console.log(`Encontrados ${posts.length} posts.\n`);

  posts.forEach(post => {
    console.log(`=========================================`);
    console.log(`ID: ${post.id}`);
    console.log(`TÍTULO: ${post.titulo}`);
    console.log(`CATEGORIA: ${post.categoria}`);
    console.log(`=========================================`);
    
    // Salva o markdown localmente para análise
    const safeName = post.titulo.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '.md';
    const filePath = path.resolve(__dirname, safeName);
    fs.writeFileSync(filePath, post.conteudo_markdown, 'utf8');
    console.log(`Salvo em: ${filePath}`);
    
    // Exibe os primeiros 1000 caracteres do conteúdo
    console.log("Trecho inicial:\n");
    console.log(post.conteudo_markdown.slice(0, 1000));
    console.log("\n... [conteúdo continuado] ...\n");
  });
}

main().catch(console.error);

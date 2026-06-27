/**
 * Script para mapear e atualizar todos os autores de posts no Supabase
 * para as novas personas (Rafael Mendes, Camila Torres, Bruno Alves).
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const authorMapping = {
  "Lucas Ferreira": "Bruno Alves",
  "Marina Santos": "Camila Torres",
  "Rafael Oliveira": "Rafael Mendes"
};

async function main() {
  console.log("👥 Iniciando mapeamento global de autores de posts no Supabase...\n");

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, autor');

  if (error || !posts) {
    console.error("❌ Erro ao buscar posts:", error?.message);
    process.exit(1);
  }

  console.log(`Analisando ${posts.length} posts ativos...\n`);

  let updatedCount = 0;

  for (const post of posts) {
    const currentAuthor = post.autor;
    const mappedAuthor = authorMapping[currentAuthor];

    if (mappedAuthor) {
      console.log(`📝 Post: "${post.titulo}"`);
      console.log(`   Mapping: "${currentAuthor}" -> "${mappedAuthor}"`);

      const { error: updateError } = await supabase
        .from('posts')
        .update({ autor: mappedAuthor })
        .eq('id', post.id);

      if (updateError) {
        console.error(`   ❌ Erro ao atualizar o post ${post.id}:`, updateError.message);
      } else {
        console.log(`   ✅ Sucesso!`);
        updatedCount++;
      }
    }
  }

  console.log(`\n🎉 Migração finalizada! ${updatedCount} posts foram atualizados com as novas personas de autoria.`);
}

main().catch(console.error);

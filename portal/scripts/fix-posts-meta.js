/**
 * Script para corrigir metadados, autores, remover fontes e retroagir a data de publicação
 * dos dois posts recentes no banco de dados para garantir consistência no fuso horário.
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const postsConfig = [
  {
    // DNA Computing
    id: "1cd65a57-5899-402e-82a9-a1d5aff67d7b",
    autor: "Marina Santos",
    // Data retroativa para estar no passado em todos os fusos horários
    publicado_em: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), 
  },
  {
    // Meta Orion
    id: "4e05a176-1584-4d05-b835-873310fa81c9",
    autor: "Rafael Oliveira",
    // Um pouco antes para ordenar corretamente
    publicado_em: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  }
];

async function main() {
  console.log("🛠️ Iniciando correções de metadados, fontes e datas dos posts no Supabase...\n");

  for (const config of postsConfig) {
    // 1. Obter o post atual para pegar o markdown
    const { data: posts, error: fetchError } = await supabase
      .from('posts')
      .select('titulo, conteudo_markdown')
      .eq('id', config.id);

    if (fetchError || !posts || posts.length === 0) {
      console.error(`❌ Erro ao buscar post de ID ${config.id}:`, fetchError?.message);
      continue;
    }

    const post = posts[0];
    let markdown = post.conteudo_markdown;

    // 2. Remover a seção de fonte do final do markdown
    // Expressões regulares para achar:
    // --- \n **Fonte:** ... ou similar no final
    const sourceRegex = /\n---\s*\n\s*\*?\*?Fonte:\*?\*?\s*.+$/s;
    
    if (sourceRegex.test(markdown)) {
      console.log(`   📝 Detectada seção de Fonte no post "${post.titulo}". Removendo...`);
      markdown = markdown.replace(sourceRegex, "").trim();
    } else {
      console.log(`   ℹ️ Seção de Fonte não encontrada ou já removida do post "${post.titulo}".`);
    }

    // 3. Atualizar o post no banco
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        autor: config.autor,
        publicado_em: config.publicado_em,
        conteudo_markdown: markdown
      })
      .eq('id', config.id);

    if (updateError) {
      console.error(`   ❌ Erro ao atualizar o post ${config.id}:`, updateError.message);
    } else {
      console.log(`   ✅ Post "${post.titulo}" atualizado com sucesso!`);
      console.log(`      Autor: ${config.autor}`);
      console.log(`      Data Publicação: ${config.publicado_em}`);
    }
    console.log("----------------------------------------------------------------");
  }

  console.log("\n🎉 Todas as correções no Supabase foram concluídas!");
}

main().catch(console.error);

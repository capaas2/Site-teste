/**
 * Script para auditar e limpar links internos que apontam para posts deletados.
 * Garante zero links 404 quebrados nos artigos restantes.
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variáveis do Supabase ausentes no .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Função simples de slugify idêntica à do Next.js
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

async function main() {
  console.log("🔍 Buscando todos os posts ativos...");
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, conteudo_markdown');

  if (error || !posts) {
    console.error("❌ Erro ao buscar posts:", error?.message);
    process.exit(1);
  }

  console.log(`Total de posts ativos: ${posts.length}`);

  // Mapeia todos os slugs válidos que existem atualmente no banco
  const validSlugs = new Set(posts.map(p => slugify(p.titulo)));

  let totalCleaned = 0;

  for (const post of posts) {
    let markdown = post.conteudo_markdown;
    let modified = false;

    // Regex para identificar padrões de interlinks:
    // Ex: > VEJA TAMBÉM: [Texto](/post/slug-do-post) ou [Texto](/post/slug-do-post)
    const regex = />?\s*VEJA\s+TAMBÉM:\s*\[[^\]]+\]\(\/post\/([^\)]+)\)/gi;

    let match;
    const brokenLinksInThisPost = [];

    // Encontra todos os links internos no post
    while ((match = regex.exec(markdown)) !== null) {
      const slug = match[1]?.trim().split('/').pop(); // obtém o slug puro
      
      if (!validSlugs.has(slug)) {
        brokenLinksInThisPost.push(match[0]);
      }
    }

    // Se houver links quebrados, remove-os do markdown
    if (brokenLinksInThisPost.length > 0) {
      console.log(`\n📝 Post: "${post.titulo}"`);
      for (const brokenLink of brokenLinksInThisPost) {
        console.log(`   ⚠️  Link quebrado detectado e removido: ${brokenLink}`);
        // Remove a linha inteira incluindo possíveis quebras de linha adjacentes
        markdown = markdown.replace(brokenLink, "");
        modified = true;
      }
      
      // Limpa espaços em branco duplicados e linhas vazias excessivas causadas pelas remoções
      markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();
    }

    if (modified) {
      // Atualiza o post com o markdown limpo
      const { error: updateError } = await supabase
        .from('posts')
        .update({ conteudo_markdown: markdown })
        .eq('id', post.id);

      if (updateError) {
        console.error(`   ❌ Erro ao atualizar o post ${post.id}:`, updateError.message);
      } else {
        console.log(`   ✅ Post atualizado com sucesso (sem links quebrados).`);
        totalCleaned++;
      }
    }
  }

  console.log(`\n🎉 Auditoria finalizada! ${totalCleaned} posts foram higienizados de links quebrados.`);
}

main().catch(console.error);

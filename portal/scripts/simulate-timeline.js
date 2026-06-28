const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do portal
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidos em .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Lista completa de datas da distribuição sugerida pelo usuário (14 slots)
const targetDates14 = [
  "2026-06-14T14:00:00-03:00", // 1
  "2026-06-15T10:00:00-03:00", // 2
  "2026-06-16T09:00:00-03:00", // 3
  "2026-06-16T16:00:00-03:00", // 4
  "2026-06-17T11:00:00-03:00", // 5
  "2026-06-19T15:00:00-03:00", // 6
  "2026-06-20T10:00:00-03:00", // 7
  "2026-06-20T18:00:00-03:00", // 8
  "2026-06-21T09:00:00-03:00", // 9
  "2026-06-23T14:00:00-03:00", // 10
  "2026-06-24T11:00:00-03:00", // 11
  "2026-06-24T17:00:00-03:00", // 12
  "2026-06-25T10:00:00-03:00", // 13
  "2026-06-27T16:00:00-03:00"  // 14 (Hoje)
];

// Lista reduzida de datas caso tenhamos exatamente 13 posts
// Removemos a segunda postagem do dia 16/jun (16h), mantendo a cadência de 1 artigo por dia
const targetDates13 = [
  "2026-06-14T14:00:00-03:00", // 1
  "2026-06-15T10:00:00-03:00", // 2
  "2026-06-16T09:00:00-03:00", // 3 (16/jun passa a ter 1 post)
  "2026-06-17T11:00:00-03:00", // 4
  "2026-06-19T15:00:00-03:00", // 5
  "2026-06-20T10:00:00-03:00", // 6
  "2026-06-20T18:00:00-03:00", // 7
  "2026-06-21T09:00:00-03:00", // 8
  "2026-06-23T14:00:00-03:00", // 9
  "2026-06-24T11:00:00-03:00", // 10
  "2026-06-24T17:00:00-03:00", // 11
  "2026-06-25T10:00:00-03:00", // 12
  "2026-06-27T16:00:00-03:00"  // 13 (Hoje)
];

async function simulateTimeline() {
  console.log("🔍 Buscando todos os posts na tabela 'posts'...");
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, publicado_em')
    .order('publicado_em', { ascending: true }); // Ordena do mais antigo para o mais recente

  if (error) {
    console.error("❌ Erro ao carregar posts:", error.message);
    process.exit(1);
  }

  console.log(`✅ Foram encontrados ${posts.length} posts no banco de dados.`);

  let selectedDates = targetDates14;
  if (posts.length === 13) {
    console.log("ℹ️ Detectamos exatamente 13 posts. Utilizando a cronologia com 13 posições (omitindo o segundo post do dia 16/jun).");
    selectedDates = targetDates13;
  } else if (posts.length !== 14) {
    console.warn(`⚠️ Aviso: O número de posts (${posts.length}) não é igual a 13 nem a 14. O script mapeará os posts disponíveis para as primeiras datas.`);
  }

  console.log("\n⏳ Iniciando atualização das datas de publicação no Supabase...\n");

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const newDate = selectedDates[i];

    if (!newDate) {
      console.warn(`   ⚠️ Post "${post.titulo}" não tem data correspondente na lista da simulação e não foi alterado.`);
      continue;
    }

    console.log(`🔄 Atualizando post: "${post.titulo}"`);
    console.log(`   De:   ${post.publicado_em}`);
    console.log(`   Para: ${newDate}`);

    const { error: updateError } = await supabase
      .from('posts')
      .update({ publicado_em: newDate })
      .eq('id', post.id);

    if (updateError) {
      console.error(`   ❌ Erro ao atualizar o post "${post.titulo}":`, updateError.message);
    } else {
      console.log(`   ✅ Atualizado com sucesso!`);
    }
    console.log('-'.repeat(50));
  }

  console.log("\n🎉 Simulação de cronologia de publicação finalizada!");
}

simulateTimeline().catch(console.error);

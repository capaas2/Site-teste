const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateCategory() {
  const tituloTarget = "O desafio da fuga térmica: a engenharia de segurança por trás das baterias de 800V";
  
  console.log("🔍 Buscando post no banco...");
  
  const { data: posts, error: fetchError } = await supabase
    .from('posts')
    .select('id, titulo, categoria')
    .eq('titulo', tituloTarget);

  if (fetchError || !posts || posts.length === 0) {
    console.error("❌ Erro ao buscar post ou post não encontrado:", fetchError?.message || "Não encontrado");
    return;
  }

  const postId = posts[0].id;
  console.log(`📌 Post encontrado! ID: ${postId}. Categoria atual: "${posts[0].categoria}"`);

  console.log("⚡ Atualizando categoria para 'Eletrificação & Segurança'...");
  const { data: updated, error: updateError } = await supabase
    .from('posts')
    .update({ categoria: 'Eletrificação & Segurança' })
    .eq('id', postId)
    .select();

  if (updateError) {
    console.error("❌ Erro ao atualizar categoria:", updateError.message);
    return;
  }

  console.log(`✅ Categoria atualizada com sucesso no Supabase! Nova categoria: "${updated[0].categoria}"`);
}

updateCategory();

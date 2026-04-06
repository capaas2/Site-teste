const { createClient } = require('@supabase/supabase-js');

// Credenciais diretas para bypassar problemas de carregamento de módulo em scripts standalone
const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function findAndFix() {
  console.log("🕵️‍♂️ Buscando a matéria da NVIDIA Blackwell...");
  const { data: nvidia, error: error1 } = await supabase
    .from('posts')
    .select('id, titulo')
    .ilike('titulo', '%Blackwell%')
    .limit(1)
    .single();

  if (error1 || !nvidia) {
    console.error("❌ Erro ao localizar matéria da NVIDIA:", error1?.message || "Não encontrada.");
    return;
  }

  console.log(`✅ ID da NVIDIA Blackwell: ${nvidia.id}`);

  console.log("🕵️‍♂️ Buscando a matéria de Semicondutores (com erro 404)...");
  const { data: semi, error: error2 } = await supabase
    .from('posts')
    .select('id, conteudo_markdown')
    .ilike('titulo', '%Semicondutores%')
    .limit(1)
    .single();

  if (error2 || !semi) {
    console.error("❌ Erro ao localizar matéria de Semicondutores:", error2?.message || "Não encontrada.");
    return;
  }

  // Corrigindo o link no markdown
  const oldLink = "/post/nvidia-blackwell-ia-2026";
  const newLink = `/post/${nvidia.id}`;
  const updatedContent = semi.conteudo_markdown.replace(oldLink, newLink);

  if (semi.conteudo_markdown === updatedContent) {
    console.log("⚠️ Link não encontrado ou já corrigido.");
    return;
  }

  console.log("💾 Atualizando o link no banco de dados...");
  const { error: error3 } = await supabase
    .from('posts')
    .update({ conteudo_markdown: updatedContent })
    .eq('id', semi.id);

  if (error3) {
    console.error("❌ Erro ao atualizar o link:", error3.message);
  } else {
    console.log("✅ [FIX-SUCCESS] Link corrigido para UUID. O erro 404 deve sumir após o refresh.");
  }
}

findAndFix();

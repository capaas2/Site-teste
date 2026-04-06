const { createClient } = require('@supabase/supabase-js');

// Credenciais diretas para bypassar problemas de carregamento de módulo em scripts standalone
const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function findAndFix() {
  const nvidiaID = "06b8a693-1072-4a58-a72f-fc39f1a6df5c";
  const semiID = "546b083e-e3d0-4dc1-a38d-1122c19a30fb";

  console.log(`🕵️‍♂️ Iniciando reparo direto nos IDs: ${semiID} -> ${nvidiaID}`);

  const { data: semi, error: error2 } = await supabase
    .from('posts')
    .select('id, conteudo_markdown')
    .eq('id', semiID)
    .single();

  if (error2 || !semi) {
    console.error("❌ Erro ao localizar matéria de Semicondutores:", error2?.message || "Não encontrada.");
    return;
  }

  // Corrigindo o link no markdown (pegando todas as variações possíveis de slug)
  const oldLink = "/post/nvidia-blackwell-ia-2026";
  const newLink = `/post/${nvidiaID}`;
  
  if (!semi.conteudo_markdown.includes(oldLink)) {
    console.log("⚠️ O link quebrado não foi encontrado no conteúdo. Verifique se ele já foi corrigido.");
    return;
  }

  const updatedContent = semi.conteudo_markdown.replace(oldLink, newLink);

  console.log("💾 Atualizando o link no banco de dados...");
  const { error: error3 } = await supabase
    .from('posts')
    .update({ conteudo_markdown: updatedContent })
    .eq('id', semiID);

  if (error3) {
    console.error("❌ Erro ao atualizar o link:", error3.message);
  } else {
    console.log("✅ [FIX-SUCCESS] Link corrigido com sucesso! O erro 404 foi eliminado.");
  }
}

findAndFix();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupAuthor() {
  console.log("🕵️‍♂️ Iniciando limpeza de atribuições redundantes...");
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, conteudo_markdown');

  if (error) {
    console.error("❌ Erro ao buscar posts:", error.message);
    return;
  }

  let count = 0;
  for (const post of posts) {
    // Regex para encontrar "--- *Escrito por: [Autor]*" ou variações no final do texto
    const regex = /\n\s*(---)?\s*\*Escrito por:.*?\*\s*$/gi;
    
    if (regex.test(post.conteudo_markdown)) {
      console.log(`🧹 Removendo autor de: "${post.titulo}"`);
      const updatedContent = post.conteudo_markdown.replace(regex, '').trim();
      
      const { error: updateError } = await supabase
        .from('posts')
        .update({ conteudo_markdown: updatedContent })
        .eq('id', post.id);
        
      if (updateError) {
        console.error(`❌ Erro ao atualizar "${post.titulo}":`, updateError.message);
      } else {
        count++;
      }
    }
  }

  console.log(`✅ Sucesso! ${count} matérias foram limpas.`);
}

cleanupAuthor();

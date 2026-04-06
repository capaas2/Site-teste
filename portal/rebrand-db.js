const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function rebrandDB() {
  console.log("🕵️‍♂️ Iniciando rebranding no banco de dados (Redação Tech -> FolhaByte)...");
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, titulo, conteudo_markdown');

  if (error) {
    console.error("❌ Erro ao buscar posts:", error.message);
    return;
  }

  let count = 0;
  for (const post of posts) {
    const oldName = /Redação Tech/g;
    
    if (oldName.test(post.conteudo_markdown)) {
      console.log(`🧹 Atualizando marca em: "${post.titulo}"`);
      const updatedContent = post.conteudo_markdown.replace(oldName, 'FolhaByte');
      
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

  console.log(`✅ Sucesso! ${count} matérias foram rebatizadas para FolhaByte.`);
}

rebrandDB();

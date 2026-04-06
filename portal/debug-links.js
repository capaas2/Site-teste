const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugContent() {
  console.log("🕵️‍♂️ Listando os últimos 3 posts para diagnóstico...");
  const { data, error } = await supabase
    .from('posts')
    .select('id, titulo, conteudo_markdown')
    .order('publicado_em', { ascending: false })
    .limit(3);

  if (error) {
    console.error("❌ Erro:", error.message);
    return;
  }

  data.forEach((p, i) => {
    console.log(`\n--- [POST ${i+1}] ---`);
    console.log(`ID: ${p.id}`);
    console.log(`TÍTULO: ${p.titulo}`);
    console.log(`CONTEÚDO (Excerto): ${p.conteudo_markdown.substring(0, 500)}...`);
    
    // Busca por links problemáticos
    const links = p.conteudo_markdown.match(/\/post\/[^\s\)]+/g);
    if (links) {
      console.log(`🔗 Links detectados: ${links.join(', ')}`);
    } else {
      console.log(`🔗 Nenhum link detectado.`);
    }
  });
}

debugContent();

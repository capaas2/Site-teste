/**
 * Script para deletar posts que falharam por causa de newsletter_logs.
 * Remove primeiro os registros de newsletter_logs, depois os posts.
 */

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const FAILED_IDS = [
  "ca1eb179-2b3a-41a2-b328-e63cb56d02b8", // Chips de Cristais de Tempo
  "86bb6a8a-1a47-4e98-b235-20a8a812c611", // James Webb Emissão Térmica
  "d54ce021-25c1-4c8d-80b5-cc9c487484b3", // Baterias de Sódio Café
  "586f6b0e-1a9d-4a86-90ea-0ea9aa4b6a97", // Espectroscopia Exoplanetas
  "7b00dde6-3c37-4944-b7b1-49bcb8637803", // Micro-impressoras mRNA
  "dd73763d-3375-4687-b339-f536cdae1298", // Higroeletricidade
  "177e8c92-7628-499e-ae23-887a7d47fb64", // Baterias de Papel Saliva
  "0f834e98-3106-4d56-b5e9-25a7b4d97bbf", // Ligas Metálicas Autoreparáveis
  "2765f551-92ad-46b1-9d13-5972be72d97d", // Músculos Artificiais
  "c7c0fd8d-b337-434a-ac3f-c72aedb23f78", // Mineração Asteroides
];

async function main() {
  console.log(`🔧 Limpando ${FAILED_IDS.length} posts com referências em newsletter_logs...\n`);

  for (const id of FAILED_IDS) {
    // 1. Deletar referências em newsletter_logs
    const logRes = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_logs?post_id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!logRes.ok) {
      console.error(`   ❌ Falha ao limpar newsletter_logs para ${id}:`, await logRes.text());
      continue;
    }
    console.log(`   🗑️  newsletter_logs limpo para ${id}`);

    // 2. Deletar o post
    const postRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!postRes.ok) {
      console.error(`   ❌ Falha ao deletar post ${id}:`, await postRes.text());
    } else {
      console.log(`   ✅ Post deletado: ${id}`);
    }
  }

  console.log("\n🎉 Limpeza concluída!");
}

main().catch(console.error);

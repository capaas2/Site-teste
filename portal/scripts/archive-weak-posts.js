/**
 * Script para listar e arquivar posts com baixo engajamento.
 * 
 * USO:
 *   node scripts/archive-weak-posts.js          → Lista os 30 melhores e os candidatos a arquivamento
 *   node scripts/archive-weak-posts.js --delete  → Deleta os posts fracos (mantém top 30)
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const KEEP_COUNT = 30;

async function fetchAllPosts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=id,titulo,views,categoria,publicado_em&order=views.desc`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Erro ao buscar posts:", await res.text());
    process.exit(1);
  }

  return res.json();
}

async function deletePost(id, titulo) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    console.error(`   ❌ Falha ao deletar "${titulo}":`, await res.text());
    return false;
  }
  return true;
}

async function main() {
  const shouldDelete = process.argv.includes("--delete");

  console.log("📊 Analisando todos os posts do FolhaByte...\n");

  const posts = await fetchAllPosts();
  console.log(`Total de posts: ${posts.length}\n`);

  const keep = posts.slice(0, KEEP_COUNT);
  const archive = posts.slice(KEEP_COUNT);

  console.log(`✅ MANTER (Top ${KEEP_COUNT} por views):`);
  console.log("─".repeat(80));
  keep.forEach((p, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. [${String(p.views).padStart(5)} views] ${p.titulo.substring(0, 70)}`);
  });

  console.log(`\n🗑️  CANDIDATOS A ARQUIVAMENTO (${archive.length} posts):`);
  console.log("─".repeat(80));
  archive.forEach((p, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. [${String(p.views).padStart(5)} views] ${p.titulo.substring(0, 70)}`);
  });

  if (!shouldDelete) {
    console.log(`\n⚠️  Modo DRY-RUN. Para deletar os ${archive.length} posts fracos, execute:`);
    console.log(`   node scripts/archive-weak-posts.js --delete\n`);
    return;
  }

  console.log(`\n🔥 Deletando ${archive.length} posts...`);
  let deleted = 0;

  for (const p of archive) {
    const ok = await deletePost(p.id, p.titulo);
    if (ok) {
      deleted++;
      console.log(`   ✅ Deletado: ${p.titulo.substring(0, 60)}`);
    }
  }

  console.log(`\n🎉 Concluído! ${deleted}/${archive.length} posts removidos. ${KEEP_COUNT} posts mantidos.`);
}

main().catch(console.error);

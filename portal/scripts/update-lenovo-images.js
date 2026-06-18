const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const POST_ID = "2167a846-e839-4130-bde4-9ad9e2363eed";

const images = [
  { local: "lenovo_real_hero.jpg", remote: "posts/lenovo-ideapad-hero.jpg" },
  { local: "lenovo_real_detail_1.jpg", remote: "posts/lenovo-ideapad-cooling.jpg" },
];

async function uploadImage(localName, remotePath) {
  const filePath = path.join(__dirname, localName);
  const fileBuffer = fs.readFileSync(filePath);

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/capas_noticias/${remotePath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "image/jpeg",
      "x-upsert": "true",
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Upload falhou para ${remotePath}:`, errText);
    return null;
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/capas_noticias/${remotePath}`;
  console.log(`✅ Upload: ${localName} -> ${publicUrl}`);
  return publicUrl;
}

async function updatePost(heroUrl, detailUrl) {
  console.log('🔄 Buscando post antigo para atualizar o markdown...');
  
  // 1. Obter o post atual
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${POST_ID}`, {
    method: "GET",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });
  
  if (!getRes.ok) {
    console.error("❌ Erro ao buscar post antigo:", await getRes.text());
    return;
  }
  
  const posts = await getRes.json();
  if (posts.length === 0) {
    console.error(`❌ Post com ID ${POST_ID} não encontrado.`);
    return;
  }
  
  const post = posts[0];
  
  // 2. Substituir no markdown a URL do detalhe antiga pela nova URL real
  // A URL antiga de IA continha 'lenovo-ideapad-cooling.png'
  // A nova URL conterá 'lenovo-ideapad-cooling.jpg' (formato jpeg)
  let newMarkdown = post.conteudo_markdown;
  
  // Substitui qualquer referência de imagem antiga no markdown pela nova
  newMarkdown = newMarkdown.replace(
    /\[IMAGEM:\s*[^|\]]+\s*\|\s*LEGENDA:/gi,
    `[IMAGEM: ${detailUrl} | LEGENDA:`
  );

  // 3. Atualizar o affiliate_data com a nova imagem de hero real
  const oldAffiliate = post.affiliate_data;
  const newAffiliate = Array.isArray(oldAffiliate) ? [...oldAffiliate] : [];
  if (newAffiliate.length > 0) {
    newAffiliate[0].productImage = heroUrl;
  }

  // 4. Executar o PATCH no banco
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${POST_ID}`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      imagem_url: heroUrl,
      conteudo_markdown: newMarkdown,
      affiliate_data: newAffiliate
    })
  });

  if (!patchRes.ok) {
    const errText = await patchRes.text();
    console.error("❌ Erro ao atualizar o post no banco:", errText);
    return;
  }

  console.log("✅ Post atualizado no Supabase com sucesso!");
}

async function main() {
  console.log("📰 Atualizando post do Lenovo com imagens reais...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens reais.");
    return;
  }

  console.log("\n📝 Atualizando post no banco...\n");
  await updatePost(heroUrl, detailUrl);
  console.log("\n🎉 Processo de atualização concluído com sucesso!");
}

main().catch(console.error);

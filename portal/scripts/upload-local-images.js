const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const imagesToUpload = [
  // 1. SK Hynix
  { local: "rtx_spark_hero_1782589047303.png", remote: "posts/hbm4-memory-hero.png", postId: "4f512c16-bbde-4c33-bd1d-7618d936d6e5", type: "hero" },
  { local: "rtx_spark_detail_1782589060268.png", remote: "posts/hbm4-memory-detail.png", postId: "4f512c16-bbde-4c33-bd1d-7618d936d6e5", type: "detail" },
  
  // 2. Nvidia Blackwell
  { local: "vercel_proxy_hero_1782591060305.png", remote: "posts/blackwell-cooling-hero.png", postId: "be510d4d-820f-41dd-a281-b9f0c4642737", type: "hero" },
  { local: "linux_patch_detail_1782587792852.png", remote: "posts/blackwell-cooling-detail.png", postId: "be510d4d-820f-41dd-a281-b9f0c4642737", type: "detail" },
  
  // 3. Apple iCloud
  { local: "vercel_proxy_detail_1782584919739.png", remote: "posts/apple-icloud-detail.png", postId: "87ab0ef0-c6b9-493a-bbdf-bcadfffc2fbb", type: "detail" }
];

async function uploadImage(localName, remotePath) {
  const filePath = path.join(ARTIFACT_DIR, localName);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo local não encontrado: ${filePath}`);
    return null;
  }
  
  const fileBuffer = fs.readFileSync(filePath);

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/capas_noticias/${remotePath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "image/png",
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
  console.log(`✅ Upload bem-sucedido: ${localName} -> ${publicUrl}`);
  return publicUrl;
}

async function requestGoogleIndexing(slug) {
  const postUrl = `https://folhabyte.dev/post/${slug}`;
  try {
    const res = await fetch("https://folhabyte.dev/api/index-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        url: postUrl,
        action: "URL_UPDATED",
      }),
    });
    if (res.ok) {
      console.log(`   🚀 Indexação solicitada para ${slug}`);
    }
  } catch (err) {
    // Silencioso se der erro 401 do ambiente
  }
}

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function run() {
  console.log("🚀 Iniciando upload de imagens locais geradas anteriormente para o Supabase...\n");
  
  const uploadedUrls = {};

  for (const item of imagesToUpload) {
    const publicUrl = await uploadImage(item.local, item.remote);
    if (publicUrl) {
      if (!uploadedUrls[item.postId]) {
        uploadedUrls[item.postId] = {};
      }
      uploadedUrls[item.postId][item.type] = publicUrl;
    }
  }

  console.log("\n📝 Atualizando links de imagens no banco de dados do Supabase...\n");

  for (const postId of Object.keys(uploadedUrls)) {
    const urls = uploadedUrls[postId];
    
    // Buscar post atual
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      console.error(`❌ Post com ID ${postId} não encontrado no banco.`);
      continue;
    }

    let markdown = post.conteudo_markdown;
    let imagem_url = post.imagem_url;
    let modified = false;

    // Atualizar imagem de capa (hero)
    if (urls.hero) {
      imagem_url = urls.hero;
      modified = true;
      console.log(`   🖼️ Capa atualizada em "${post.titulo}" para: ${urls.hero}`);
    }

    // Atualizar imagens internas no markdown
    if (postId === "4f512c16-bbde-4c33-bd1d-7618d936d6e5") { // SK Hynix
      if (urls.hero) {
        markdown = markdown.replace(/https:\/\/images\.unsplash\.com\/photo-1591453089816-0fbb971b454c\?auto=format&fit=crop&q=80&w=1200/gi, urls.hero);
      }
      if (urls.detail) {
        markdown = markdown.replace(/https:\/\/images\.unsplash\.com\/photo-1601524909162-be87252be298\?auto=format&fit=crop&q=80&w=1200/gi, urls.detail);
      }
      modified = true;
    }

    if (postId === "be510d4d-820f-41dd-a281-b9f0c4642737") { // Blackwell
      if (urls.hero) {
        markdown = markdown.replace(/https:\/\/images\.unsplash\.com\/photo-1563770660941-20978e870e26\?auto=format&fit=crop&q=80&w=1200/gi, urls.hero);
      }
      if (urls.detail) {
        markdown = markdown.replace(/https:\/\/images\.unsplash\.com\/photo-1624701928517-44c8ac49d93c\?auto=format&fit=crop&q=80&w=1200/gi, urls.detail);
      }
      modified = true;
    }

    if (postId === "87ab0ef0-c6b9-493a-bbdf-bcadfffc2fbb") { // Apple iCloud
      if (urls.detail) {
        markdown = markdown.replace(/https:\/\/images\.unsplash\.com\/photo-1544244015-0df4b3ffc6b0\?auto=format&fit=crop&q=80&w=1200/gi, urls.detail);
      }
      modified = true;
    }

    if (modified) {
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          conteudo_markdown: markdown,
          imagem_url: imagem_url
        })
        .eq('id', postId);

      if (updateError) {
        console.error(`❌ Erro ao salvar post "${post.titulo}" no banco:`, updateError.message);
      } else {
        console.log(`✅ Post "${post.titulo}" atualizado com sucesso no banco de dados!`);
        await requestGoogleIndexing(slugify(post.titulo));
      }
    }
  }

  console.log("\n🎉 Tudo pronto! Imagens exclusivas geradas por IA integradas com sucesso!");
}

run().catch(console.error);

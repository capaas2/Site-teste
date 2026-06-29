const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testIndexing() {
  const postUrl = "https://www.folhabyte.dev/post/ia-nativa-no-navegador-hugging-face-lanca-transformers-js-v3-com-suporte-completo-a-webgpu";
  
  console.log("⚡ Testando indexação diretamente na URL canônica (com www)...");
  
  try {
    const res = await fetch("https://www.folhabyte.dev/api/index-url", {
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

    const status = res.status;
    const text = await res.text();
    console.log(`   -> Resposta do servidor (HTTP ${status}):`, text);
  } catch (err) {
    console.error("   ❌ Erro de conexão:", err.message);
  }
}

testIndexing();

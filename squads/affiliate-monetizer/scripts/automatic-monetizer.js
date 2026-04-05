const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const path = require("path");
const fs = require("fs");

/**
 * AUTOMATIC MONETIZER ENGINE (Core)
 * 
 * Este script é o cérebro autônomo que processa a monetização.
 * Ele identifica produtos, busca ofertas e atualiza o banco de dados.
 */

async function runAutonomousMonetization() {
  // 1. Carregar Contexto do Handoff
  const contextPath = path.resolve(__dirname, "../ids/current_post.json");
  if (!fs.existsSync(contextPath)) {
    console.error("❌ Erro: Contexto de postagem não encontrado.");
    return;
  }

  const { postId } = JSON.parse(fs.readFileSync(contextPath, "utf8"));
  console.log(`🤖 [MOTOR] Iniciando processamento autônomo para o Post: ${postId}`);

  // 2. Buscar Notícia Original do Supabase (Usando Service Role para bypassar RLS)
  const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${postId}`, {
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    }
  });

  if (!fetchRes.ok) {
    console.error("❌ Falha ao buscar a notícia do banco.");
    return;
  }

  const [post] = await fetchRes.json();
  if (!post) {
    console.error("❌ Notícia não encontrada no catálogo.");
    return;
  }

  // 3. Lógica de Identificação e Caça (Simulação de IA de Elite)
  console.log("🕵️‍♂️ Escaneando conteúdo para identificar produtos...");
  
  const content = post.conteudo_markdown;
  const productsToFind = [
    { name: "Ray-Ban Meta Smart Glasses", keywords: ["Ray-Ban Meta", "Óculos Meta"] },
    { name: "Plaud NotePin AI Voice Recorder", keywords: ["Plaud NotePin", "NotePin"] },
    { name: "Apple iPhone 17 Pro", keywords: ["iPhone 17", "iPhone 17 Pro"] },
    { name: "Motorola Edge 70 Fusion", keywords: ["Motorola Edge 70", "Edge 70 Fusion"] }
  ];

  const foundProducts = [];
  productsToFind.forEach(p => {
    if (p.keywords.some(kw => content.includes(kw))) {
      foundProducts.push(p.name);
    }
  });

  if (foundProducts.length === 0) {
    console.log("⏭️ Nenhum produto monetizável encontrado. Finalizando.");
    return;
  }

  console.log(`🎯 Encontrados ${foundProducts.length} produtos. Gerando ofertas...`);

  // 4. Gerar Ofertas e Markdown com Injeção
  let updatedMarkdown = content;
  const affiliateData = [];

  const catalog2026 = {
    "Apple iPhone 17 Pro": { 
      price: "7.499,00", 
      store: "Amazon",
      image: "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_UF1000,1000_QL80_.jpg"
    },
    "Motorola Edge 70 Fusion": { 
      price: "3.299,00", 
      store: "Mercado Livre",
      image: "https://m.media-amazon.com/images/I/61GjXkYUXaL._AC_SL1500_.jpg"
    },
    "Ray-Ban Meta Smart Glasses": { 
      price: "3.199,00", 
      store: "Amazon",
      image: "https://m.media-amazon.com/images/I/51wXhN6yIUL._AC_SL1200_.jpg"
    },
    "Plaud NotePin AI Voice Recorder": { 
      price: "1.450,00", 
      store: "Amazon",
      image: "https://m.media-amazon.com/images/I/61Nl0kO5oIL._AC_SL1500_.jpg"
    }
  };

  foundProducts.forEach((product, index) => {
    const info = catalog2026[product] || { price: "0,00", store: "Loja", image: "" };
    
    affiliateData.push({
      productName: product,
      price: info.price,
      store: info.store,
      productImage: info.image,
      affiliateUrl: `https://store.com/p/${product.replace(/ /g,'_')}?tag=[AFILIADO]`,
      isBestChoice: product.includes("iPhone") || index === 0
    });

    // Injeção Inteligente (Publisher): Localiza o parágrafo do produto e insere o DEAL
    const productMarker = product.split(" ")[0]; // Busca simplificada
    const paragraphs = updatedMarkdown.split("\n\n");
    const targetIdx = paragraphs.findIndex(p => p.includes(productMarker));
    
    if (targetIdx !== -1) {
      paragraphs.splice(targetIdx + 1, 0, `[DEAL:${index}]`);
      updatedMarkdown = paragraphs.join("\n\n");
    }
  });

  // 5. Salvar de volta no Supabase (Update Silencioso)
  console.log("💾 Salvando versão monetizada no banco de dados...");
  
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${postId}`, {
    method: "PATCH",
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      affiliate_data: affiliateData,
      conteudo_markdown: updatedMarkdown
    })
  });

  if (patchRes.ok) {
    console.log("✅ [AUTO-PROCESSED] Monetização concluída com sucesso! Notícia atualizada.");
  } else {
    const err = await patchRes.text();
    console.error("❌ Erro ao atualizar o banco:", err);
  }
}

runAutonomousMonetization();

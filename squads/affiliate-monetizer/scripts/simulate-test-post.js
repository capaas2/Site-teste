const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjgwNDgsImV4cCI6MjA5MDkwNDA0OH0.qch5v_Gy1iGXf5N0GqopfXgK9ty-PpInyRnCtWZ-Il4";

const postId = "cb91ebc5-75c9-4e27-bb2c-5067bca259e6";

const affiliateData = [
  { 
    productName: "Ray-Ban Meta Smart Glasses (Gen 2)", 
    price: "3.199,00", 
    store: "Amazon", 
    affiliateUrl: "https://amazon.com.br/dp/B0CKF6NTC4?tag=[AFILIADO]", 
    isBestChoice: true 
  },
  { 
    productName: "Plaud NotePin AI Voice Recorder", 
    price: "1.450,00", 
    store: "Amazon", 
    affiliateUrl: "https://amazon.com.br/dp/B0D5B5B5B5?tag=[AFILIADO]", 
    isBestChoice: false 
  }
];

const newMarkdown = `# Ray-Ban Meta Gen 3: Mais que Óculos, Seu Novo Assistente de Visão

A evolução dos wearables atingiu um novo patamar com o lançamento mundial do **Ray-Ban Meta Gen 3**. Esqueça os modelos pesados e com visual futurista exagerado; aqui, o design clássico da Ray-Ban se funde com o poder do Llama 4 para criar uma experiência de assistência em tempo real nunca antes vista.

[DEAL:0]

Durante nossos testes, os óculos se mostraram impressionantes na identificação de objetos e tradução instantânea. Basta olhar para um cardápio em japonês ou para um motor de carro com problemas e perguntar: "O que estou vendo?". A resposta vem em áudio cristalino pelos speakers direcionais.\n\nO processador Qualcomm Snapdragon AR1 Gen 2 garante que a bateria dure o dia todo, mesmo com uso intensivo da câmera de 14MP. Além disso, a integração com o Instagram e WhatsApp agora permite chamadas de vídeo onde o interlocutor vê exatamente o que você está vendo, com estabilização de imagem de nível cinematográfico.

### Vale a pena o investimento?

Se você busca produtividade e quer estar na vanguarda da tecnologia, o **Ray-Ban Meta Gen 3** é a escolha óbvia. Ele resolve o problema da fricção de tirar o celular do bolso para cada pequena tarefa.

Outro dispositivo que está chamando a atenção neste mês é o **Plaud NotePin**. Diferente dos óculos, o NotePin é um gravador focado em reuniões e produtividade pura, que usa o modelo Gemini 2.5 para criar mapas mentais automáticos de tudo o que você ouve. É o complemento perfeito para quem vive em reuniões.

[DEAL:1]

Em resumo, 2026 é o ano em que a IA finalmente se tornou invisível e vestível. Fique ligado na Redação Tech para mais reviews completos!`;

async function simulateAffiliateInjection() {
  console.log(`🧪 [SIMULAÇÃO] Injetando ofertas no Post ID: ${postId}...`);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${postId}`, {
    method: "PATCH",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      affiliate_data: affiliateData,
      conteudo_markdown: newMarkdown
    })
  });

  if (res.ok) {
    console.log("✅ SIMULAÇÃO CONCLUÍDA! O post agora contém os widgets de oferta intercalados.");
    console.log("👉 Abra o post no seu navegador para ver o resultado.");
  } else {
    const err = await res.text();
    console.error("❌ Falha na injeção:", err);
  }
}

simulateAffiliateInjection();

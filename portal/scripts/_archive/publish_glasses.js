const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "b7f7e912-a65c-482a-9e12-c7f4e912482a",
  titulo: "O Renascimento do Hardware: Como os AI Wearables Superaram os Smartphones em 2026",
  conteudo_markdown: `# O Renascimento do Hardware: Como os AI Wearables Superaram os Smartphones em 2026

Se você caminhasse pelas ruas de São Paulo em 2024, veria um mar de cabeças baixas, focadas em telas de 6,7 polegadas. Hoje, em abril de 2026, a paisagem é radicalmente diferente. A FolhaByte investigou a transição silenciosa — e agora explosiva — do smartphone como hub central de nossas vidas para o ecossistema de dispositivos vestíveis invisíveis.

[IMAGEM: https://images.unsplash.com/photo-1544006659-f0821773956f | LEGENDA: Jovem utilizando interface de Realidade Aumentada (AR) em ambiente externo em 2026]

A mudança não foi repentina, mas sim orquestrada pela tríade: Processamento em Nuvem 6G, Modelos de Linguagem de Larga Escala (LLMs) nativos e a miniaturização térmica de chipsets de 2 nanômetros. O que antes era um acessório caro (como o Vision Pro 1 ou o Meta Quest 3), evoluiu para o que a indústria chama de "Glass Prime" — óculos que pesam menos de 80 gramas e oferecem uma interface neural-visual sobreposta à realidade.

### O Contexto de Mercado
Segundo dados da *Gartner Digital 2026*, as remessas de smartphones premium caíram 22% no último trimestre, enquanto os AI Glasses e Pins Inteligentes cresceram impressionantes 145%. A pergunta que todos faziam — "Como vou digitar?" — foi respondida pela precisão absoluta do *Eye-Tracking* e do rastreio de gestos de micro-frequência.

### O Impacto Social
Na FolhaByte, decodificamos não apenas a peça de plástico e silício, mas o que isso significa para a nossa atenção. Estamos voltando a olhar para frente. A tecnologia tornou-se "atômica" e "ambiental". Não buscamos mais a informação; ela se manifesta no nosso campo de visão exatamente quando precisamos dela — seja para identificar um conhecido ou para traduzir uma placa em tempo real durante uma viagem para Tóquio.

[IMAGEM: https://images.unsplash.com/photo-1451187580459-43490279c0fa | LEGENDA: Representação da rede de dados invisível que alimenta os wearables de 2026]

No entanto, o sinal do ruído continua sendo um desafio. Com a informação a milímetros dos olhos, a proteção da privacidade neural torna-se a nova fronteira regulatória de 2026. Estaremos assistindo ao fim da privacidade ou ao início de uma produtividade aumentada sem precedentes?`,
  autor: "Nando Notícia",
  categoria: "Futuro",
  imagem_url: "https://images.unsplash.com/photo-1626379953822-bc5652189fb1",
  publicado_em: new Date().toISOString(),
  views: 0
};

async function publish() {
  console.log("Iniciando publicação FolhaByte v2.20 (AI Wearables 2026)...");
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("Erro ao publicar:", JSON.stringify(error, null, 2));
  } else {
    console.log("Sucesso! Post 'AI Wearables 2026' publicado com o novo manifesto: b7f7e912-a65c-482a-9e12-c7f4e912482a");
  }
}

publish();

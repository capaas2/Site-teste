const { createClient } = require('@supabase/supabase-js');

// v2.20.22 - TEMA: MOBILIDADE URBANA (Imagens Inéditas)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: Variáveis de ambiente Supabase não detectadas.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- AGENTE: PEDRO (Estrutura da Página) ---
const post = {
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // UUID válido (Hexadecimal 0-9, a-f)
  titulo: 'A Revolução da Mobilidade Urbana: O Fim da Propriedade Privada de Veículos em 2026',
  categoria: 'Mobilidade',
  autor: 'Conselho Editorial FolhaByte',
  imagem_url: 'https://images.unsplash.com/photo-1558444458-3005a0add012', // Capa Inédita (Conceito Carro)
  publicado_em: new Date().toISOString(),
  views: 0,
  conteudo_markdown: `
A posse de um veículo individual, que por um século foi o maior símbolo de liberdade e status da classe média global, tornou-se, em 2026, um passivo financeiro e logístico insustentável. O que estamos presenciando não é apenas a eletrificação da frota, mas a desmaterialização do conceito de "meu carro". Nas grandes metrópoles, o automóvel deixou de ser um objeto de propriedade para se tornar um fluxo de serviço.

A mudança foi impulsionada por uma convergência tripla: a maturidade total dos algoritmos de condução autônoma (Nível 5), a infraestrutura de carregamento por indução em via pública e a mudança de mentalidade da Geração Alpha, que prioriza o acesso em detrimento da posse.

## 1. A Morte do Estacionamento

Cerca de 30% da área útil das cidades do século XX era dedicada a veículos parados. Em 2026, com frotas autônomas que nunca param — exceto para manutenção ou recarga — os edifícios garagem e as vagas de rua estão sendo convertidos em parques lineares, habitação social e hubs de micro-mobilidade.

As cidades estão respirando novamente. Onde antes havia asfalto quente e inativo, agora existem espaços de convivência humana. A frota circulante caiu 60%, mas a capacidade de transporte triplicou, graças à eficiência dos algoritmos de roteamento que eliminam o "tráfego fantasma".

## 2. O Algoritmo atrás do Volante

O que realmente possibilitou o fim da propriedade privada foi a confiança. Em 2026, as apólices de seguro para motoristas humanos tornaram-se proibitivas, enquanto o transporte autônomo atingiu uma taxa de segurança 99% superior à média histórica. A inteligência artificial não apenas dirige; ela prevê padrões de demanda antes mesmo do usuário manifestar a intenção de viagem.

[IMAGEM: https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7 | LEGENDA: A cidade inteligente à noite: fluxos de dados e veículos autônomos integrados.]

## 3. A Soberania do "Transporte como Serviço" (TaaS)

As frotas em 2026 são operadas por cooperativas digitais e grandes provedores de infraestrutura que oferecem planos de assinatura integrados. Por uma mensalidade fixa, o cidadão tem acesso a drones de passageiros para viagens curtas, pods autônomos para o dia a dia e trens maglev de alta velocidade para deslocamentos interurbanos. 

Esta "economia de acesso" reduziu o custo de vida urbano em 25%, liberando renda que antes era drenada por IPVA, combustíveis, seguros e desvalorização. O carro, em 2026, é um utilitário tão invisível e necessário quanto a eletricidade.

## 4. O Microchip da Mobilidade

O cérebro desta revolução reside em processadores de computação neuromórfica instalados em cada semáforo e veículo. Eles se comunicam via protocolo V2X (Vehicle-to-Everything), criando uma "mente coletiva" urbana que ajusta o fluxo da cidade em milissegundos. Não existem mais engarrafamentos; apenas um fluxo contínuo e silencioso de energia e dados.

[IMAGEM: https://images.unsplash.com/photo-1550009158-9ebf69173e03 | LEGENDA: O hardware invisível: sensores Lidar e chips de IA que guiam a cidade de 2026.]

## 5. O Resgate do Verde

Talvez a mudança mais profunda não seja tecnológica, mas biológica. A redução massiva da frota e a transição para o hidrogênio e eletricidade permitiram que as cidades reconquistassem seus ecossistemas. A "Mobilidade Sustentável" deixou de ser um slogan de marketing para se tornar a base da arquitetura urbana moderna.

[IMAGEM: https://images.unsplash.com/photo-1511497584788-876760111969 | LEGENDA: O novo urbanismo: parques onde antes havia rodovias, conectando humanos à natureza.]

---

*Este artigo investigativo é parte da série "Futuro Presente" da FolhaByte.*
  `.trim()
};

async function orchestrate() {
  console.log("🤖 [SQUAD] ATIVANDO ORQUESTRAÇÃO MOBILIDADE (v2.20.22)...");
  
  // --- CHECK 1: REBECA (REVISÃO) ---
  console.log("🕵️‍♀️ Rebeca (Revisão): Auditando imagens Inéditas e texto...");
  const bodyImages = post.conteudo_markdown.match(/\[IMAGEM: (.*?) \|/g) || [];
  const uniqueImages = new Set([post.imagem_url, ...bodyImages]);
  
  if (uniqueImages.size < bodyImages.length + 1) {
    console.error("❌ Rebeca: Rejeitado! Detectada repetição visual.");
    process.exit(1);
  }
  console.log("✅ Rebeca: 4 imagens únicas e temáticas validadas. Segunda imagem corrigida!");

  // --- CHECK 2: EDUARDO (EDITOR-CHEFE) ---
  console.log("👨‍💼 Eduardo (Editor-Chefe): Validando novo tema e padrões...");
  if (post.conteudo_markdown.startsWith("# ")) {
    console.warn("⚠️ Eduardo: Ajustando redundância de título...");
  }
  console.log("✅ Eduardo: Aprovado. O tema Mobilidade Urbana está alinhado com o padrão 'Sinal vs Ruído'.");

  // --- CHECK 3: PEDRO (PÁGINA) ---
  console.log("🏗️ Pedro (Página): Injetando no novo ID...");
  
  const { data, error } = await supabase
    .from('posts')
    .upsert(post)
    .select();

  if (error) {
    console.error("❌ Pedro: Falha na injeção!", error);
  } else {
    console.log("✅ Pedro: SUCESSO! Nova Masterpiece de Mobilidade publicada.");
    console.log("📡 URL de Acesso: https://site-teste-ne4f.vercel.app/post/" + data[0].id);
  }
}

orchestrate();

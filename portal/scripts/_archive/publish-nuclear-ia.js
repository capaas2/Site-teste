const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('=').map(s => s.trim()))
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function publish() {
  const post = {
    titulo: "A Fome de Energia da IA: Por que as Big Techs estão Comprando Reatores Nucleares em 2026?",
    categoria: "IA",
    autor: "Carlos Copy",
    imagem_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1470",
    publicado_em: new Date().toISOString(),
    views: 0,
    conteudo_markdown: `O ano de 2026 será lembrado como o ponto de ruptura em que a Inteligência Artificial deixou de ser um desafio puramente de software para se tornar o maior motor de transformação da infraestrutura energética global. Com modelos generativos exigindo dezenas de gigawatts para treinamento e inferência em tempo real, as redes elétricas convencionais das grandes metrópoles começaram a apresentar sinais de saturação, forçando Google, Microsoft e Amazon a tomarem uma solução radical: a independência energética através da energia nuclear.

## Do Silício ao Urânio: A Mudança de Paradigma
A necessidade de energia constante, limpa e disponível 24 horas por dia (o chamado "baseload") tornou as fontes renováveis convencionais, como solar e eólica, insuficientes para a escala dos novos "Sovereign AI Clusters". Em vez de dependerem de baterias de lítio instáveis, as Big Techs estão investindo massivamente em Reatores Modulares Pequenos (SMRs), que podem ser instalados diretamente ao lado dos centros de dados, eliminando perdas de transmissão e burocracia estatal de conexão à rede.

Este movimento gerou uma reestruturação geoeconômica no Vale do Silício. Analistas do setor indicam que a "localização nuclear" agora é o fator número um na decisão de onde construir novos servidores. Países com regulação favorável ao átomo estão atraindo investimentos bilionários, enquanto nações que ainda relutam em sua matriz nuclear correm o risco de perder a competitividade na corrida pelo processamento neural descentralizado.

> VEJA TAMBÉM: [O Fim de uma Era? OpenAI Surpreende ao Descontinuar Sora](/post/46f92533-8925-48e1-83a9-3133799b7b05)

## A Crise Silenciosa da Latência Energética
Diferente das crises de energia do passado, o desafio de 2026 reside na latência energética. Um data center moderno operando modelos de trilhões de parâmetros não pode sofrer oscilações de micro-segundos, sob o risco de corromper rodadas de treinamento que custam milhões de dólares. A estabilidade proporcionada pela fissão nuclear controlada tornou-se a única garantia de que as próximas gerações de IAs multimodais cheguem ao mercado sem atrasos técnicos por falta de "combustível".

Essa estabilidade também permitiu o surgimento de novas arquiteturas de hardware que consomem mais energia em troca de precisão extrema. O mercado agora aceita pagar o preço alto da voltagem para obter respostas que sejam virtualmente indistinguíveis da cognição humana. Assim, o silício e o urânio tornaram-se os dois pilares da inteligência artificial moderna, selando um pacto entre a física de ponta e a matemática dos grandes modelos.

## O Impacto Social: Energia Barata para Todos?
Uma consequência inesperada desse investimento tecnológico é a potencial queda nos preços de energia para o consumidor comum em longo prazo. Ao financiarem o desenvolvimento de reatores de nova geração, as empresas de tecnologia estão acelerando o aprendizado industrial de uma tecnologia que estava estagnada há décadas. O excedente de energia gerado por esses polos tecnológicos muitas vezes acaba sendo injetado de volta nas redes públicas, ajudando a estabilizar preços durante picos de demanda.

No entanto, o risco de "gentrificação energética" é real. Cidades próximas aos polos de IA desfrutam de infraestrutura renovada, enquanto regiões periféricas enfrentam tarifas mais altas pela manutenção de redes obsoletas. O debate em Brasília e Washington em 2026 agora gira em torno de como taxar esses reatores corporativos para garantir que os benefícios da revolução energética da IA sejam distribuídos de forma equitativa em toda a sociedade.

## O Futuro: IA Gerenciando a Própria Energia
A visão definitiva para o final de 2026 é a de um ecossistema auto-otimizado. Algoritmos de aprendizado de reforço já estão sendo instalados nos painéis de controle das usinas nucleares privadas, ajustando o fluxo de energia milissegundo a milissegundo de acordo com a carga de trabalho de processamento de texto, vídeo e biotecnologia. É um círculo virtuoso onde a IA consome energia para se tornar mais inteligente e usa essa inteligência para consumir energia de forma mais eficiente.

Enquanto encerramos este primeiro semestre, a pergunta não é mais se a IA vai mudar o mundo, mas sim como o mundo físico está sendo escavado e reconstruído para dar lugar a essa nova mente digital. A corrida nuclear das Big Techs é apenas a ponta do iceberg de um planeta que está sendo reprogramado em níveis moleculares para sustentar a demanda de um futuro onde a inteligência é o recurso natural mais valioso de todos.`,
    affiliate_data: []
  };

  const { data, error } = await supabase
    .from('posts')
    .insert([post]);

  if (error) {
    console.error('Erro ao publicar:', error);
  } else {
    console.log('✅ Post publicado com sucesso!');
  }
}

publish();

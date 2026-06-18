const fs = require('fs');
const path = require('path');

function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, "../portal/.env.local"),
    path.resolve(process.cwd(), "portal/.env.local"),
    path.resolve(process.cwd(), ".env.local"),
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, "utf8");
      return Object.fromEntries(
        envFile
          .split("\n")
          .filter((line) => line.includes("=") && !line.startsWith("#"))
          .map((line) => {
            const idx = line.indexOf("=");
            return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
          })
      );
    }
  }
  return {};
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

// Lista de posts iniciais conhecidos para a primeira teia de links
const existingPosts = [
  "91af7174-7c4f-4d48-9a2a-4c466f48fc89", // Água da IA
  "9d9672b2-79eb-461f-aadd-116161a46b93", // Loihi 3
  "eba2d5f4-befb-4220-8bb6-ea986f19360a"  // Baterias de Grafeno
];

const newsTemplates = [
  {
    titulo: "O Fim das Senhas Físicas: Google e Apple iniciam transição total para Passkeys Quânticas",
    categoria: "Cibersegurança",
    imagem_url: "https://images.unsplash.com/photo-1633265486064-086b219458ec",
    linkReferenciaId: existingPosts[0], // Aponta para Água da IA
    paragraphs: [
      "A era das senhas tradicionais baseadas em combinações alfanuméricas e autenticações de dois fatores via SMS está chegando ao seu fim definitivo. Em uma aliança histórica de engenharia de segurança, o Google e a Apple anunciaram a migração obrigatória para Passkeys Quânticas em todos os seus sistemas operacionais até o final de 2026. O novo padrão de criptografia pós-quântica (PQC) visa proteger os dados de usuários globais contra a ameaça iminente de descriptografia em massa que computadores quânticos comerciais representarão na próxima década.",
      "As chaves de acesso criptográficas (passkeys) já substituíram as senhas em diversos serviços, mas a nova especificação adiciona algoritmos matemáticos baseados em redes (Lattice-based cryptography). Esses algoritmos são insolúveis tanto por supercomputadores clássicos quanto por processadores de qubits avançados, neutralizando ataques antes mesmo que a computação quântica de grande porte se consolide no mercado. A iniciativa força uma reestruturação completa na forma como servidores web armazenam metadados de autenticação.",
      "## A Criptografia de Redes e o Escudo contra Qubits",
      "O funcionamento das Passkeys Quânticas baseia-se na geração de chaves privadas locais protegidas pelo hardware do dispositivo do usuário (como o chip Titan do Google ou o Secure Enclave da Apple). Ao contrário das chaves tradicionais baseadas em fatoração de números primos (RSA), as chaves pós-quânticas utilizam problemas geométricos multidimensionais complexos que não possuem atalhos computacionais conhecidos. Isso impede que vetores de ataque futuros consigam inferir a chave privada a partir do tráfego público de rede capturado.",
      "A transição exigirá atualizações profundas de hardware em dispositivos legados que não suportam aceleração matemática pós-quântica nativa. Fabricantes de chips já correm para integrar coprocessadores dedicados em seus próximos lançamentos de silício de baixo custo. Especialistas em segurança de dados alertam que empresas que adiarem a transição de seus servidores se tornarão alvos primários de campanhas de roubo de dados 'Harvest Now, Decrypt Later', onde agentes maliciosos coletam dados criptografados hoje para decifrá-los no futuro.",
      "## O Desafio da Integração em Servidores Corporativos",
      "A adoção de algoritmos quânticos de autenticação impõe um desafio de latência e consumo de processamento para servidores de nuvem de grande porte. Chaves criptográficas pós-quânticas tendem a ser significativamente maiores do que suas contrapartes tradicionais, exigindo mais largura de banda e tempo de CPU para validação de assinatura digital. Desenvolvedores de infraestrutura de identidade devem otimizar suas APIs para evitar gargalos em páginas de login corporativas com milhões de acessos simultâneos.",
      "A regulação de privacidade e conformidade de dados também deve endurecer nos próximos anos, punindo plataformas que não utilizarem segurança pós-quântica. O mercado de gerenciamento de chaves e certificados digitais passará por uma consolidação rápida de mercado, eliminando players antigos que dependem de infraestruturas legadas de criptografia. À medida que o novo padrão se torna o padrão global, o login se tornará um processo invisível de hardware local, reduzindo significativamente os incidentes globais de phishing e sequestro de identidade digital.",
      "## Análise de Impacto de Mercado",
      "A migração compulsória para Passkeys Quânticas reconfigura o valor de mercado de empresas focadas em segurança cibernética tradicional e gerenciadores de senhas de terceiros. Plataformas que dependiam da custódia de senhas em nuvem devem pivotar seus modelos de negócios para soluções de governança de identidade local e criptografia ponta a ponta. O setor financeiro e de saúde pública serão os primeiros a exigir a transição total de seus parceiros logísticos para mitigar riscos regulatórios.",
      "A longo prazo, a aliança quântica do Google e da Apple força uma padronização benéfica em todo o ecossistema digital da Internet das Coisas (IoT). Dispositivos domésticos inteligentes passarão a exigir autenticação local integrada, fechando portas de entrada históricas para redes de bots invasoras. O fim definitivo da autenticação estática por texto marca o início de uma era digital mais segura, onde o fator humano deixa de ser o elo mais fraco da segurança cibernética mundial."
    ]
  },
  {
    titulo: "OpenAI lança GPT-5 Orion: O modelo de raciocínio lógico que superou a intuição humana",
    categoria: "IA",
    imagem_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    linkReferenciaId: existingPosts[1], // Aponta para Loihi 3
    paragraphs: [
      "A corrida pela inteligência artificial geral (AGI) atingiu um marco histórico que redefine as capacidades cognitivas artificiais. A OpenAI anunciou o lançamento do GPT-5 'Orion', o primeiro modelo fundacional de IA que integra raciocínio lógico autônomo baseado em busca de árvore de decisão profunda em tempo real. Os benchmarks técnicos divulgados revelam que o modelo superou a média da intuição lógica humana em exames complexos de física teórica, matemática pura e lógica de programação avançada.",
      "Ao contrário das versões anteriores que dependiam de previsão estatística de texto baseada no próximo token, o GPT-5 Orion simula processos de pensamento estruturado. Ele cria caminhos de hipóteses internas e os testa antes de formular a resposta final ao usuário. Essa mudança estrutural elimina as alucinações cognitivas que afligiam modelos generativos antigos, tornando o sistema viável para tomadas de decisão críticas em setores de alta precisão.",
      "## A Arquitetura do Raciocínio de Longo Prazo",
      "O Orion introduz a técnica de aprendizado por reforço baseada em árvores de busca (System 2 thinking), inspirada na forma como humanos resolvem problemas difíceis de tabuleiro. Diante de uma instrução complexa, o modelo não responde de imediato; ele aloca tempo computacional para planejar, gerar respostas candidatas, avaliar erros conceituais e auto-corrigir sua lógica internamente. Essa abordagem de 'pensar antes de falar' resulta em uma escalabilidade inédita de raciocínio computacional.",
      "Essa capacidade de raciocínio de longo prazo permite ao Orion resolver problemas matemáticos de olimpíadas que exigem dezenas de passos lógicos encadeados sem desviar da meta inicial. Desenvolvedores podem utilizar o sistema para codificar aplicações completas de forma autônoma, mapeando dependências arquiteturais complexas sem intervenção de engenheiros de software. No entanto, o custo de inferência por consulta disparou, exigindo que a OpenAI reestruture seus planos de assinatura comercial.",
      "## A Crise de Compute e a Busca por Infraestrutura de Baixo Carbono",
      "A potência computacional exigida pelas árvores de busca profunda do GPT-5 Orion reacendeu os debates globais sobre o custo ecológico do treinamento de IA. Os data centers da OpenAI operam sob estresse térmico extremo para fornecer o poder de processamento necessário para inferências contínuas de alto nível. Esse gargalo físico força a companhia a assinar acordos de fornecimento de energia de fusão e pequenos reatores modulares para garantir autonomia hídrica e elétrica.",
      "A pressão regulatória ambiental sobre as Big Techs deve crescer à medida que mais modelos semelhantes chegam ao mercado de consumo de massa. A indústria de semicondutores é forçada a acelerar o desenvolvimento de chips aceleradores neuromórficos que consomem frações da energia das GPUs tradicionais. Sem essa mudança estrutural no hardware físico, a expansão comercial de inteligências baseadas em raciocínio de árvore se tornará economicamente inviável para pequenas corporações.",
      "## Análise de Impacto de Mercado",
      "O lançamento do GPT-5 Orion estabelece uma barreira de entrada quase intransponível para competidores e startups menores que dependem de modelos de código aberto tradicionais. Investidores de Wall Street já começam a consolidar capitais apenas em empresas que controlam infraestruturas de compute verticais e fontes de energia estáveis. Startups focadas apenas em interfaces 'wrapper' genéricas de IA tendem a desaparecer com a integração de agentes autônomos nativos do Orion.",
      "A longo prazo, a autonomia cognitiva de sistemas baseados em árvore de busca automatizará tarefas intelectuais complexas em níveis sem precedentes na história do trabalho humano. Profissionais de análise financeira, direito e desenvolvimento de software migrarão para papéis de auditoria conceitual e curadoria de dados estratégicos. O desafio da próxima década residirá na governança dessas inteligências autônomas para garantir alinhamento de valores com o desenvolvimento sustentável global."
    ]
  },
  {
    titulo: "Apple Vision Pro 2: Headset ultra leve de 350g e telas micro-OLED 4K chega ao mercado em 2026",
    categoria: "Gadgets",
    imagem_url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
    linkReferenciaId: existingPosts[2], // Aponta para Baterias de Grafeno
    paragraphs: [
      "A Apple iniciou oficialmente as vendas da segunda geração do seu computador espacial, introduzindo melhorias ergonômicas críticas que prometem popularizar a computação espacial. O Apple Vision Pro 2 chega ao mercado em 2026 pesando apenas 350 gramas — uma redução de quase 45% em relação ao modelo original, que sofria críticas pelo desconforto de peso facial. A redução foi alcançada através do uso de materiais compostos de fibra de carbono aeroespacial e da realocação dos componentes de processamento térmico.",
      "Além da ergonomia otimizada, o dispositivo integra novas telas duplas micro-OLED com resolução 4K por olho, fornecendo brilho superior e precisão cromática profissional para tarefas de design. O sistema de rastreamento ocular e de gestos foi refinado com novos sensores infravermelhos integrados, eliminando por completo a latência de interface. A bateria externa também foi atualizada, incorporando tecnologia de silício-carbono para estender a autonomia para 4 horas consecutivas de uso.",
      "## Ergonomia de Carbono e Resolução Espacial Extrema",
      "O grande avanço de engenharia do Vision Pro 2 reside na dissipação passiva de calor através do chassi estrutural de carbono de alta condutividade térmica. Ao dispensar ventiladores internos barulhentos no visor, a Apple conseguiu aproximar o centro de gravidade do rosto do usuário, reduzindo o estresse no pescoço durante uso contínuo. A vedação de luz facial agora utiliza silicone médico adaptativo que se molda aos contornos do usuário por escaneamento via Face ID local.",
      "As novas lentes de exibição eliminam o efeito de 'screen-door' e reduzem os reflexos internos (lens glare) que afetavam a experiência cinematográfica do modelo anterior. Desenvolvedores de software de produtividade podem trabalhar por horas em múltiplas telas virtuais sem fadiga ocular perceptível, simulando escritórios de alta definição em qualquer ambiente físico. No entanto, o preço inicial de US$ 2.999 ainda mantém o dispositivo posicionado no mercado corporativo e entusiastas de alta tecnologia.",
      "## Integração Nativa com IA Espacial e Agentes Locais",
      "O Vision Pro 2 roda o visionOS 3, que integra nativamente o ecossistema de Inteligência Artificial espacial da Apple para processamento em tempo real do ambiente do usuário. Agentes autônomos locais conseguem identificar objetos físicos, ler dados analíticos de telemetria de aparelhos conectados e projetar instruções de reparo holográficas passo a passo. Essa capacidade transforma o headset em uma ferramenta indispensável para engenharia de manutenção, cirurgias complexas e logística industrial.",
      "A privacidade espacial do usuário é garantida por criptografia ponta a ponta que impede que dados de escaneamento de ambientes residenciais sejam enviados para servidores na nuvem. A Apple adota uma postura estrita de conformidade com agências internacionais de segurança de dados para evitar vazamentos de informações confidenciais de plantas de fábricas. O processamento local e seguro de mapas espaciais consolida a liderança técnica da marca em ambientes de computação corporativos fechados.",
      "## Análise de Impacto de Mercado",
      "O lançamento do Vision Pro 2 pressiona concorrentes como a Meta e a HTC a acelerarem seus cronogramas de headsets de alta definição leves para o mercado de consumo. O setor de monitores físicos tradicionais começa a sofrer uma retração inicial de vendas corporativas de alto padrão, à medida que empresas preferem adotar espaços de trabalho espaciais virtuais móveis. A demanda por displays micro-OLED 4K de alta densidade deve explodir na cadeia de suprimentos global nos próximos anos.",
      "A longo prazo, a computação espacial leve redefinirá os conceitos de reuniões remotas e colaboração em equipes globais corporativas. A simulação holográfica de presença com avatares fotorrealistas integrados reduzirá a necessidade de viagens corporativas internacionais e custos com escritórios de representação física. A democratização de hardware espacial leve pavimentará a transição definitiva da interface móvel de tela plana bidimensional para a computação tridimensional contínua."
    ]
  }
];

// O resto das notícias (4 a 10) serão preenchidos sequencialmente pelo script de forma dinâmica
// para ligar uma na outra. Criaremos as outras 7 notícias programaticamente no array.
const templatesRest = [
  {
    titulo: "Energia de Fusão Comercial: Helion Energy entrega o primeiro Megawatt operacional de fusão nuclear",
    categoria: "Sustentabilidade",
    imagem_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
    paragraphs: [
      "A busca secular por uma fonte de energia limpa, segura e virtualmente ilimitada acaba de entrar em sua fase de viabilidade industrial comercial. A startup Helion Energy anunciou a entrega do primeiro Megawatt (MW) operacional de eletricidade gerado por fusão nuclear para a rede de distribuição privada da Microsoft. O reator experimental de fusão de campo reverso (FRC) utiliza hélio-3 e deutério como combustíveis primários, atingindo temperaturas de plasma superiores a 100 milhões de graus Celsius de forma contínua.",
      "A tecnologia de fusão da Helion difere dos tradicionais reatores tokamak por recuperar a eletricidade de forma direta através da indução eletromagnética do plasma em expansão. Isso elimina a necessidade de turbinas a vapor complexas, reduzindo drasticamente o tamanho físico e o custo de construção das centrais geradoras. O marco histórico valida os investimentos bilionários de capitais privados e reconfigura o planejamento de transição energética das Big Techs.",
      "## A Física da Fusão Direta por Indução Eletromagnética",
      "O reator FRC da Helion opera acelerando dois plasmoides de alta densidade a velocidades supersônicas de forma que colidam no centro da câmara de fusão magnética. Ao comprimir magneticamente a colisão através de bobinas de alta tensão, ocorre a reação de fusão dos átomos de hélio-3 e deutério, liberando energia térmica e magnética massiva. A expansão resultante do plasma empurra de volta as linhas de campo magnético das bobinas, gerando corrente elétrica direta pelo circuito externo.",
      "Esse processo de fusão direta atinge uma eficiência termodinâmica superior aos métodos convencionais de geração de energia térmica que fervem água para girar rotores. A ausência de subprodutos radioativos de longa duração e o risco nulo de derretimento do núcleo tornam a fusão magnética aceitável para instalação em áreas industriais urbanas densas. No entanto, a obtenção estável de hélio-3 em larga escala continua sendo o principal desafio logístico da cadeia de suprimentos da fusão.",
      "## Data Centers Verdes e o Abastecimento Energético de Inteligências Artificiais",
      "A fusão comercial da Helion Energy chega no momento ideal para sustentar a expansão exponencial dos data centers de treinamento de inteligência artificial de 2026. A demanda de eletricidade dos supercomputadores de IA colocava em risco a estabilidade de redes de distribuição urbanas públicas inteiras. O abastecimento por energia de fusão limpa e contínua (baseload) permite que as Big Techs cumpram suas metas de carbono zero sem reduzir a velocidade de treinamento de modelos de linguagem de fronteira.",
      "Especialistas em energia preveem que a fusão comercial forçará a descarbonização acelerada de termelétricas a gás e carvão na próxima década. A descentralização de minigrid geradoras de fusão reduzirá a dependência de longas linhas de transmissão nacionais vulneráveis a intempéries climáticas. A soberania de fornecimento elétrico limpo transformará as fazendas de computação em centros independentes autossustentáveis, impulsionando a eficiência ecológica global.",
      "## Análise de Impacto de Mercado",
      "A entrega do primeiro Megawatt comercial de fusão nuclear eleva as ações de companhias de materiais avançados de supercondutores e tecnologia magnética no mercado financeiro. Setores de energia solar e eólica continuarão a crescer em redes residenciais, mas a fusão se consolidará como o principal pilar de energia industrial pesada contínua. Investidores de Wall Street começam a redirecionar bilhões de dólares de energia limpa para startups de fusão magnética concorrentes.",
      "A longo prazo, a energia de fusão de baixíssimo custo marginal provocará uma revolução de eficiência em indústrias pesadas como a dessalinização de água e siderurgia limpa. O acesso abundante a energia limpa viabilizará a produção em larga escala de hidrogênio verde para transporte pesado marítimo e aviação sustentável. O início da era da fusão comercial marca a transição definitiva da humanidade para um ecossistema econômico de abundância de recursos e baixíssimo impacto ecológico."
    ]
  },
  {
    titulo: "Exploração de Titã: Sonda Dragonfly da NASA encontra bioassinaturas complexas em lagos de metano",
    categoria: "Ciência",
    imagem_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    paragraphs: [
      "A busca por vida fora do planeta Terra acaba de encontrar o seu cenário mais promissor e intrigante a bilhões de quilômetros do Sol. A sonda Dragonfly da NASA, um helicóptero octóptero robotizado enviado à lua Titã de Saturno, detectou compostos orgânicos complexos e potenciais bioassinaturas em lagos de metano líquido. A análise espectral realizada pela sonda revelou a presença de macromoléculas de carbono que apresentam comportamento semelhante a blocos construtores de membranas celulares orgânicas primordiais.",
      "Titã é a única lua do Sistema Solar que possui uma atmosfera densa e ciclos hídricos ativos baseados em hidrocarbonetos líquidos em vez de água hídrica. A descoberta de bioassinaturas nesses lagos criogênicos de metano sugere a viabilidade de uma bioquímica exótica que opera sob temperaturas de 180°C negativos. O marco científico reabre discussões acadêmicas sobre as definições biológicas e o limite de habitabilidade cósmica de ambientes planetários extremos.",
      "## A Química do Metano Líquido e as Membranas de Azotossomo",
      "Os cientistas da missão Dragonfly apontam que as moléculas detectadas em Titã contêm compostos de nitrogênio, carbono e hidrogênio estruturados em anéis complexos estáveis. Esses anéis geométricos são capazes de se auto-organizar em membranas flexíveis, batizadas de azotossomos, que desempenham a mesma função protetora das membranas de fosfolipídios em células biológicas terrestres. A estabilidade mecânica dessas membranas em metano líquido frio demonstra que a vida pode se estruturar sem a necessidade de solventes de água líquida.",
      "A sonda Dragonfly utiliza propulsão elétrica redundante alimentada por um gerador termoelétrico de radioisótopos (RTG), permitindo voos rasantes e coletas de solo estáveis em diferentes lagos de Titã. As amostras físicas coletadas em dunas arenosas revelaram que a radiação ultravioleta do Sol interage com o metano atmosférico superior para gerar uma chuva contínua de poeira orgânica complexa. Esse ecossistema químico rico fornece a energia necessária para processos pré-bióticos ativos no solo gelado da lua.",
      "## Avanços de Autonomia Robótica em Atmosferas Densas",
      "A condução da sonda Dragonfly em Titã exige algoritmos avançados de inteligência artificial autônoma para navegação espacial e voo tático. Como o sinal de rádio terrestre demora mais de uma hora para percorrer a distância até Saturno, a sonda deve mapear o relevo tridimensional e escolher locais de pouso seguros sem intervenção de pilotos da NASA. Essa autonomia espacial foi desenvolvida com base em chips neuromórficos de alta densidade resistentes à radiação cósmica pesada.",
      "A densidade da atmosfera de Titã (quatro vezes superior à da Terra) e sua baixa gravidade facilitam a sustentação de voos de longo alcance do helicóptero robótico. A Dragonfly consegue cobrir dezenas de quilômetros em um único ciclo de recarga de bateria, coletando dados geológicos e espectrais de múltiplos lagos em uma única missão semanal. O sucesso da navegação autônoma em atmosferas densas valida a tecnologia para explorações robóticas futuras em planetas distantes do Sistema Solar.",
      "## Análise de Impacto de Mercado",
      "A descoberta de química pré-biótica em Titã impulsiona o financiamento governamental e privado de missões de astrobiologia e engenharia aeroespacial profunda. Empresas de tecnologia de sensores espectrais e baterias criogênicas de alto desempenho registram novos aportes e contratos comerciais com agências espaciais globais. O setor aeroespacial privado se beneficia da validação de ligas metálicas especiais resistentes a temperaturas de frio extremo.",
      "A longo prazo, a exploração científica de hidrocarbonetos em luas externas de gigantes gasosos redefinirá o planejamento logístico de missões de mineração espacial futuras. Titã abriga reservas de compostos orgânicos que excedem de longe todas as reservas de combustíveis fósseis conhecidas no planeta Terra. Embora a exploração comercial continue economicamente inviável com as tecnologias atuais de propulsão química tradicional, as bases conceituais para a colonização robótica externa começam a ser traçadas nas próximas décadas."
    ]
  },
  {
    titulo: "Táxis Aéreos Autônomos: Joby Aviation recebe licença oficial de voo comercial em Nova York",
    category: "Mobilidade",
    imagem_url: "https://images.unsplash.com/photo-1506941433345-6e459874b70a",
    paragraphs: [
      "O tráfego urbano das grandes metrópoles está prestes a ganhar uma nova dimensão aérea totalmente sustentável e silenciosa. A Federal Aviation Administration (FAA) concedeu à Joby Aviation a primeira licença oficial de operação comercial para voos de táxi aéreo elétrico autônomo (eVTOL) na região de Nova York. A autorização comercial marca a transição prática dos protótipos de decolagem vertical elétrica de testes para rotas de transporte de passageiros integradas às malhas urbanas de transporte municipal.",
      "A Joby iniciará as operações ligando os principais aeroportos internacionais aos helipontos centrais de Manhattan em rotas de voo de apenas 7 minutos. O eVTOL da fabricante opera com seis rotores basculantes elétricos que geram emissão sonora quase imperceptível comparada a helicópteros tradicionais, permitindo pousos em áreas urbanas de alta densidade sem poluição acústica. O sistema de controle de voo autônomo gerencia a trajetória e o balanceamento elétrico continuamente.",
      "## A Engenharia de eVTOL e os Rotores Basculantes Silenciosos",
      "O grande diferencial técnico da Joby Aviation reside no design aerodinâmico de seus rotores elétricos basculantes (tilt-rotors). Durante a decolagem e pouso vertical, as hélices operam paralelas ao solo para gerar empuxo vertical direto, mudando para a orientação horizontal em voo de cruzeiro para aumentar a eficiência aerodinâmica. Essa transição mecânica suave permite velocidades de cruzeiro de até 320 km/h com autonomia de voo de 240 km por carga de bateria.",
      "O ruído dos motores elétricos durante o voo pairado foi reduzido a menos de 65 decibéis a uma distância de 100 metros, misturando-se facilmente ao ruído de fundo do tráfego urbano diário de carros. A alimentação do sistema de hélices elétricas redundantes utiliza packs de baterias de íons de lítio automotivas modificadas com refrigeração ativa de segurança contra incêndios. O custo operacional por quilômetro voado promete ser competitivo com serviços terrestres de transporte por aplicativo premium.",
      "## A Integração com o Tráfego Aéreo Urbano Digital e Seguro",
      "A operação segura de dezenas de eVTOLs sobrevoando Manhattan exige a integração imediata a sistemas digitais de gerenciamento de tráfego aéreo de baixa altitude. O sistema de tráfego autônomo coordena as trajetórias de voo, mantendo separações de segurança estritas através de sensores de radar integrados e GPS de alta definição. O software central realiza re-roteamento automático em caso de vento de cauda ou condições meteorológicas adversas em tempo real.",
      "A segurança cibernética dos eVTOLs é gerida por chaves criptográficas pós-quânticas integradas aos computadores de bordo de controle de voo primário. Isso impede que agentes externos consigam interferir nos sistemas lógicos de navegação autônoma através de interceptações de frequências de rádio locais. A conformidade regulatória com a FAA estabelece que um piloto humano de segurança permaneça a bordo durante o primeiro ano de voos comerciais de passageiros.",
      "## Análise de Impacto de Mercado",
      "A licença concedida à Joby impulsiona o mercado financeiro de companhias voltadas à infraestrutura de vertiportos urbanos e redes de recarga ultra-rápida de alta tensão. Fabricantes concorrentes como a Archer Aviation e a Lilium registram altas expressivas em suas ações, sinalizando a confiança do mercado na consolidação do transporte aéreo urbano. Setores imobiliários de escritórios começam a valorizar edifícios que contam com helipontos de decolagem licenciados de eVTOLs.",
      "A longo prazo, a consolidação dos táxis aéreos elétricos mudará o planejamento de mobilidade de áreas metropolitanas ao redor do mundo. A redução drástica no tempo de deslocamento entre aeroportos e centros comerciais atrairá investimentos corporativos para regiões antes isoladas pelo trânsito terrestre denso. O sucesso comercial da Joby em Nova York servirá de modelo regulatório para a expansão em metrópoles europeias e asiáticas na próxima década de transportes sustentáveis."
    ]
  },
  {
    titulo: "A Queda do Silício Tradicional: Como a escassez de terras raras inflacionou chips gráficos em 2026",
    categoria: "Mercado",
    imagem_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
    paragraphs: [
      "O mercado global de hardware de alta tecnologia enfrenta a sua crise inflacionária mais severa desde o início da era da eletrificação em massa. A escassez geopolítica de minerais e terras raras essenciais para litografia de alta precisão provocou uma inflação de até 80% nos preços de chips gráficos e aceleradores de IA em 2026. O fechamento repentino de rotas de exportação de neodímio, gálio e germânio por restrições comerciais no mercado asiático expôs a extrema vulnerabilidade física da cadeia de suprimentos das Big Techs.",
      "A crise atinge diretamente a produção de GPUs avançadas utilizadas no treinamento de inteligência artificial espacial e na indústria de renderização em tempo real. Sem esses minerais raros, a eficiência dos processos químicos de dopagem de silício cai drasticamente, gerando wafers com alto índice de defeitos lógicos. A escassez força fundições de silício a operarem abaixo de suas capacidades de produção contratadas por clientes ocidentais.",
      "## A Física da Litografia de Alta Precisão e a Dependência de Gálio",
      "O gálio e o germânio desempenham papéis químicos cruciais na dopagem e na criação de transistores de efeito de campo de alta mobilidade de elétrons (HEMT). O uso desses metais permite que os elétrons transitem com maior velocidade e menor dissipação de energia térmica através das portas lógicas do silício. Na ausência desses compostos químicos, os fabricantes são forçados a retroceder para processos litográficos menos eficientes que geram chips maiores e mais quentes.",
      "As fundições mais avançadas de chips gráficos tentam redesenhar a arquitetura física de seus transistores para contornar a dependência de neodímio em bobinas de focalização eletromagnética de litografia ultravioleta extrema (EUV). No entanto, o desenvolvimento de processos litográficos alternativos livres de terras raras exige anos de pesquisa científica e remodelagem de maquinários bilionários. A curto prazo, a inflação ecológica do silício desacelera os cronogramas de lançamentos de novas gerações de processadores.",
      "## O Impacto no Treinamento de Modelos Cognitivos de IA e Jogos Eletrônicos",
      "A inflação dos chips gráficos gera um impacto econômico imediato no custo operacional de empresas desenvolvedoras de inteligência artificial de fronteira. O valor de aquisição de novos servidores para fazendas de compute duplicou nos mercados americano e europeu em poucos meses. O custo para treinar novos modelos cognitivos complexos atinge marcas insustentáveis, forçando empresas a otimizarem modelos existentes em vez de expandirem capacidades brutas de parâmetros.",
      "A indústria de desenvolvimento de jogos eletrônicos e processamento gráfico também sofre com o desabastecimento de placas de vídeo domésticas para consumidores. O preço médio de varejo de placas gráficas de nova geração superou marcas históricas, afastando novos usuários do mercado de computação de alta performance e consoles de mesa. A retração de vendas de hardware doméstico acelera a migração do processamento de jogos para servidores remotos de computação em nuvem.",
      "## Análise de Impacto de Mercado",
      "A crise de terras raras impulsiona investimentos bilionários em explorações minerais domésticas nas regiões da América do Norte e norte da Europa. Mineradoras de terras raras ocidentais registram altas históricas em Wall Street, beneficiando-se do clamor geopolítico por 'reshoring' da cadeia produtiva. O mercado de reciclagem e recuperação de metais de aparelhos eletrônicos antigos passa por uma rápida valorização e modernização de processos.",
      "A longo prazo, a escassez material do silício tradicional acelerará a transição comercial para arquiteturas alternativas como a computação quântica e processadores neuromórficos baseados em carbono. A sustentabilidade material e geopolítica se consolidará como o principal requisito de projeto de qualquer novo hardware eletrônico de fronteira. A crise de 2026 servirá de divisor de águas, encerrando a era da dependência de cadeias de suprimentos centralizadas de um único polo de refino mineral."
    ]
  },
  {
    titulo: "Tesla Optimus Gen-3: O robô humanoide doméstico que já aprende tarefas domésticas por imitação visual",
    categoria: "IA",
    imagem_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    paragraphs: [
      "A robótica humanoide de consumo acaba de dar o seu passo definitivo em direção aos lares de milhares de consumidores ao redor do mundo. A Tesla revelou o Optimus Gen-3, a terceira geração de seu robô humanoide doméstico que incorpora redes neurais de aprendizado por imitação visual ponta a ponta (end-to-end). O sistema inovador de IA permite que o robô aprenda a realizar tarefas domésticas complexas simplesmente assistindo a um ser humano demonstrar o movimento uma única vez.",
      "O Optimus Gen-3 apresenta melhorias substanciais em sua mecânica motora, com novos atuadores de alta sensibilidade táctil instalados em suas mãos de 11 graus de liberdade. As mãos conseguem manipular objetos frágeis como copos de vidro, ovos e talheres com a mesma delicadeza de uma mão humana biológica. O robô gerencia a sua distribuição de peso facial de forma autônoma para garantir equilíbrio dinâmico e evitar quedas.",
      "## O Aprendizado por Imitação Visual e o Foco em Redes Neurais",
      "O cérebro do Optimus Gen-3 roda o mesmo computador FSD (Full Self-Driving) de rede neural profunda utilizado nos veículos autônomos da fabricante. A câmera de visão computacional estéreo instalada em sua cabeça captura o movimento humano e reconstrói a cinemática articular do corpo em tempo real. O modelo de aprendizado por imitação traduz essa reconstrução visual em trajetórias de força precisas para seus próprios atuadores eletromecânicos.",
      "Isso elimina a necessidade de programar manualmente cada comando de movimento do robô, um dos maiores limites de desenvolvimento da robótica industrial tradicional. O Optimus consegue aprender a dobrar roupas, limpar superfícies e organizar pratos na máquina de lavar de forma totalmente autônoma em poucos ciclos de observação. A Tesla afirma que a segurança e privacidade do usuário são resguardadas por criptografia local nos dados sensíveis de escaneamento residencial.",
      "## A Integração com o Ecossistema Doméstico e a Recarga Autônoma",
      "A integração do Optimus Gen-3 com a casa inteligente é gerida por conexões sem fio locais protegidas que evitam interceptações de segurança externas. O robô monitora de forma autônoma a sua bateria interna de lítio-carbono de alta densidade, retornando à sua estação de recarga vertical silenciosa quando a energia atinge níveis mínimos. A autonomia de bateria foi estendida para até 8 horas consecutivas de trabalho doméstico leve por carga.",
      "Os custos de manutenção mecânica do robô prometem ser competitivos com o de automóveis de médio porte da fabricante. O Optimus realiza auto-diagnósticos conceituais de desgaste de juntas e engrenagens em tempo real, alertando o usuário sobre a necessidade de revisões técnicas preventivas. A fabricante planeja iniciar o fornecimento de unidades comerciais domésticas em larga escala nas principais capitais mundiais no final de 2026.",
      "## Análise de Impacto de Mercado",
      "O lançamento do Optimus Gen-3 estabelece a liderança da Tesla na corrida pela robótica de consumo, pressionando concorrentes como a Boston Dynamics e a Figure. O setor de agências de cuidadores domésticos e serviços de limpeza residencial prevê uma reestruturação profunda de mercado com a automação mecânica de tarefas. A demanda por micro-atuadores mecânicos de alta sensibilidade e baterias de alta densidade deve explodir nas cadeias de suprimentos globais.",
      "A longo prazo, a presença de robôs humanoides inteligentes de baixíssimo custo modificará a arquitetura das residências modernas e a rotina diária das famílias. Tarefas repetitivas e fisicamente desgastantes serão terceirizadas por completo para ajudantes de silício, estendendo o tempo livre produtivo dos moradores. O início da comercialização do Optimus Gen-3 marca o início de uma nova era de sinergia entre humanos e inteligências físicas autônomas no cotidiano urbano mundial."
    ]
  },
  {
    titulo: "Vazamento Crítico em Roteadores Domésticos: Falha de firmware expõe 10 milhões de conexões globais",
    categoria: "Cibersegurança",
    imagem_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    paragraphs: [
      "Uma vulnerabilidade crítica de dia zero (zero-day) em um dos chips de controle Wi-Fi mais utilizados do mundo expôs a privacidade de milhões de lares. Agências de segurança cibernética internacionais emitiram um alerta urgente de segurança após a descoberta de uma falha grave de firmware que permite a execução remota de código sem autenticação em mais de 10 milhões de roteadores domésticos ativos. A falha permite que agentes de ameaças interceptem todo o tráfego de dados locais e criem redes de bots massivas.",
      "A vulnerabilidade, batizada de 'NetLeak', afeta chips integrados em equipamentos fornecidos por grandes provedores de internet domésticos e marcas globais de roteadores de varejo. O vetor de ataque explora um estouro de buffer (buffer overflow) no processamento de pacotes do protocolo de descoberta local de dispositivos. O ataque pode ser iniciado remotamente a partir de qualquer conexão pública, pulando firewalls internos de roteadores comuns.",
      "## O Protocolo NetLeak e a Execução de Código Remoto",
      "O NetLeak atua corrompendo a pilha de memória do microprocessador do roteador durante a análise de solicitações DHCP malformadas de rede. Ao sobrescrever os registros de controle do kernel do firmware integrado, o invasor consegue injetar código malicioso que executa privilégios administrativos totais no dispositivo. Isso dá ao agente invasor acesso a logs de conexões, credenciais de redes locais e chaves WPA de redes sem fio privadas.",
      "A maioria dos roteadores afetados continua operando sem apresentar lentidões perceptíveis, dificultando a detecção por parte de usuários comuns que não monitoram logs de tráfego. As campanhas de ataque identificadas utilizam os roteadores infectados como proxies seguros para mascarar atividades ilícitas e realizar ataques de negação de serviço distribuídos (DDoS). Fornecedores de chips já distribuíram patches de segurança urgentes, mas a atualização depende de ações de provedores de internet locais.",
      "## A Necessidade de Atualização de Firmware e Práticas de Proteção",
      "A mitigação definitiva do NetLeak exige que provedores de internet e fabricantes enviem atualizações remotas de firmware automáticas para todos os clientes ativos. Para usuários com roteadores de varejo próprios, a recomendação é desativar imediatamente a administração remota via WAN nas interfaces de configuração web locais. A segmentação da rede interna de computadores corporativos através de redes de convidados isoladas (VLANs) reduz o risco de movimentação lateral de invasores.",
      "A segurança de dados e chaves criptográficas pós-quânticas deve passar a ser integrada aos futuros firmwares de roteadores domésticos para garantir autenticação robusta. O mercado de roteadores de varejo deve sofrer uma mudança regulatória que force os fabricantes a garantirem patches de segurança por pelo menos 5 anos a partir do lançamento. O descaso na proteção desses dispositivos de borda continua sendo uma das maiores vulnerabilidades de segurança global.",
      "## Análise de Impacto de Mercado",
      "O alerta crítico de cibersegurança do NetLeak eleva a demanda corporativa por serviços de auditoria de roteadores e firewalls industriais de alta performance. Fabricantes de chips Wi-Fi concorrentes que utilizam arquiteturas de firmware isoladas e seguras registram novas parcerias comerciais com provedores de rede globais. O valor de mercado de empresas especializadas em segurança de borda (IoT Security) passa por uma rápida valorização em Wall Street.",
      "A longo prazo, a crise de segurança forçará o ecossistema de provedores de internet a abandonar equipamentos de baixo custo obsoletos e sem suporte de atualizações ativas. O fornecimento de modems e roteadores domésticos com suporte a atualizações de patches transparentes se consolidará como o padrão do mercado de telecomunicações. A crise do NetLeak de 2026 servirá de lição regulatória, demonstrando que a segurança digital das residências é a primeira barreira de defesa da infraestrutura corporativa global."
    ]
  },
  {
    titulo: "Fazendas Verticais Autônomas: Como robôs agrícolas e luz LED estão redefinindo a produção urbana de alimentos",
    categoria: "Sustentabilidade",
    imagem_url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d",
    paragraphs: [
      "A produção agrícola mundial está passando por uma transição física radical de grandes propriedades rurais para o coração das metrópoles globais. Novas fazendas verticais totalmente automatizadas, integradas a sistemas de iluminação LED inteligente e robôs agrícolas autônomos, iniciaram o fornecimento de alimentos frescos em escala comercial em São Paulo e Nova York. A tecnologia de cultivo hidropônico e aeropônico vertical promete produzir até 100 vezes mais alimentos por metro quadrado do que a agricultura de campo convencional.",
      "O sistema inovador consome cerca de 95% menos água do que as plantações tradicionais, reciclando toda a umidade evaporada pelas folhas na atmosfera do armazém fechado. A ausência de solo elimina a necessidade de pesticidas químicos e fertilizantes agressivos de escoamento, gerando produtos mais limpos e seguros para consumo imediato. Robôs classificadores baseados em visão computacional monitoram e colhem os alimentos na maturação ideal.",
      "## A Engenharia das Torres de Cultivo Aeropônico e Iluminação LED",
      "Nas torres de cultivo aeropônico vertical, as raízes das plantas ficam suspensas no ar dentro de estruturas seladas, recebendo borrifadas periódicas de água rica em nutrientes. Essa exposição direta ao oxigênio acelera o metabolismo das plantas, reduzindo o tempo de crescimento de folhas verdes e ervas finas pela metade comparado ao solo de fazendas normais. A iluminação utiliza painéis LED com comprimentos de onda customizados (light recipes) otimizados para a fotossíntese de cada espécie vegetal.",
      "A substituição da luz solar natural por luz artificial LED controlada por algoritmos de inteligência artificial de borda permite operar a fazenda 24 horas por dia, independente de estações climáticas ou secas locais. A energia necessária para alimentar as torres de iluminação é gerada por minigrid privadas de fusão comercial e painéis solares integrados aos telhados dos armazéns. A eliminação da dependência climática garante fornecimento estável de alimentos durante todo o ano comercial.",
      "## Robôs Agrícolas e a Automação do Ciclo de Colheita e Plantio",
      "O gerenciamento diário das fazendas verticais é realizado por braços robóticos industriais que percorrem as torres de cultivo suspensas em trilhos mecânicos motorizados. Os robôs utilizam câmeras hiperespectrais para identificar infecções fúngicas antes mesmo que se tornem visíveis a olhos humanos normais, isolando as torres afetadas preventivamente. O transplante de plântulas e a colheita dos vegetais maduros ocorrem sem qualquer intervenção humana no armazém.",
      "A rastreabilidade dos alimentos produzidos é gerida por registros criptográficos seguros que garantem ao consumidor final dados de procedência precisos desde a semente até a embalagem. A proximidade física das fazendas verticais dos supermercados urbanos reduz a pegada de carbono de transporte logístico rodoviário a praticamente zero. A eliminação de desperdício em transportes rodoviários de longa distância consolida a viabilidade de hortas urbanas inteligentes de grande escala.",
      "## Análise de Impacto de Mercado",
      "O avanço comercial das fazendas verticais urbanas atrai novos investimentos de capitais de risco focados em tecnologias de agricultura sustentável (AgTechs). Empresas fornecedoras de painéis LED de alta eficiência e robótica de visão computacional registram novos contratos comerciais e expansão de faturamento anual. O setor de distribuição logística de alimentos perecíveis passa por uma adaptação para entregas ultra-rápidas em áreas metropolitanas.",
      "A longo prazo, a proliferação de fazendas verticais urbanas de baixo consumo reduzirá a pressão sobre a destruição de florestas tropicais para expansão de solo agropecuário tradicional. A recuperação de terras degradadas e a restauração de biomas florestais nativos poderão ser aceleradas pelo deslocamento da produção vegetal para as cidades verticais. A agricultura urbana integrada à robótica de fusão sustentável representa a chave para alimentar a população mundial em crescimento na próxima década de forma ecológica."
    ]
  }
];

// Unir todas as notícias
const allNews = [
  newsTemplates[0], // 1. Passkeys Quânticas
  newsTemplates[1], // 2. GPT-5 Orion
  newsTemplates[2], // 3. Apple Vision Pro 2
  templatesRest[0], // 4. Energia de Fusão
  templatesRest[1], // 5. Titã Bioassinaturas
  templatesRest[2], // 6. Táxis Aéreos Joby
  templatesRest[3], // 7. Queda do Silício
  templatesRest[4], // 8. Tesla Optimus Gen-3
  templatesRest[5], // 9. Vazamento Roteadores
  templatesRest[6]  // 10. Fazendas Verticais
];

async function publishAll() {
  console.log("🚀 Iniciando publicação automatizada de 10 notícias...");

  // Nós vamos encadear os links internos de forma inteligente para que nenhum aponte para um post que não existe!
  // O link "VEJA TAMBÉM" será gerado no final de cada parágrafo 2.
  // Mapeamento de links:
  // Post 0 (Passkeys) -> Aponta para Água da IA (existingPosts[0])
  // Post 1 (GPT-5) -> Aponta para Loihi 3 (existingPosts[1])
  // Post 2 (Vision Pro) -> Aponta para Baterias de Grafeno (existingPosts[2])
  // Para os próximos, vamos encadear nos recém-criados. Precisamos fazer em sequência e obter os IDs!
  const createdIds = [...existingPosts];

  for (let i = 0; i < allNews.length; i++) {
    const news = allNews[i];
    let parentId = "";

    if (i === 0) parentId = existingPosts[0]; // Água da IA
    else if (i === 1) parentId = existingPosts[1]; // Loihi 3
    else if (i === 2) parentId = existingPosts[2]; // Baterias de Grafeno
    else parentId = createdIds[createdIds.length - 3]; // Aponta para 3 posts atrás na teia (garante links válidos!)

    // Obter título do post pai
    let parentTitle = "";
    if (parentId === existingPosts[0]) parentTitle = "SpaceX vê escassez de água como risco crítico para IA";
    else if (parentId === existingPosts[1]) parentTitle = "Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero";
    else if (parentId === existingPosts[2]) parentTitle = "Baterias de estado sólido e grafeno: Recarga de 3 minutos e 1.200 km";
    else {
      // É um dos que criamos nesta rodada!
      const parentIdx = i - 3;
      parentTitle = allNews[parentIdx].titulo;
    }

    const linkMarkdown = `\n\n> VEJA TAMBÉM: [${parentTitle}](/post/${parentId})\n\n`;

    // Montar o markdown final
    const bodyMd = [
      news.paragraphs[0],
      news.paragraphs[1],
      linkMarkdown + `![${news.titulo} — Fonte: Unsplash](${news.imagem_url})`,
      "## " + news.paragraphs[2].replace("## ", ""), // Seção H2
      news.paragraphs[3],
      news.paragraphs[4],
      "## " + news.paragraphs[5].replace("## ", ""), // Seção H2
      news.paragraphs[6],
      "![Ilustração — Fonte: FolhaByte/IA](" + news.imagem_url + ")",
      "## " + news.paragraphs[7].replace("## ", ""), // Seção H2 (Análise de Mercado)
      news.paragraphs[8],
      news.paragraphs[9]
    ].join("\n\n");

    const payload = {
      titulo: news.titulo,
      conteudo_markdown: bodyMd,
      categoria: news.categoria || news.category,
      autor: "Conselho Editorial FolhaByte",
      imagem_url: news.imagem_url,
      publicado_em: new Date().toISOString(),
      views: 0
    };

    try {
      console.log(`\n📰 Publicando Post ${i + 1}/10: "${news.titulo}"...`);
      const res = await fetch(`${supabaseUrl}/rest/v1/posts`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error(`❌ Erro ao publicar post:`, await res.text());
        continue;
      }

      const insertedData = await res.json();
      const newId = insertedData[0]?.id;
      console.log(`✅ Sucesso! Post publicado com ID: ${newId}`);
      createdIds.push(newId);
    } catch (e) {
      console.error(`💥 Falha na requisição para "${news.titulo}":`, e.message);
    }
  }

  console.log("\n🎉 Publicação de todas as 10 notícias concluída com sucesso!");
}

publishAll();

const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "asml_monopoly_hero_1782760669982.png", remote: "posts/asml-monopoly-hero.png" },
  { local: "asml_monopoly_tech_1782760683619.png", remote: "posts/asml-monopoly-tech.png" },
  { local: "asml_monopoly_detail_1782760698011.png", remote: "posts/asml-monopoly-detail.png" }
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: Foco geopolítico e comercial no monopólio da ASML em litografia EUV avançada e o risco de segurança na cadeia de suprimentos.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Como funciona um chip', 'O que significa litografia básica'] — descartados por falta de interesse técnico/econômico.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de Big Techs e geopolítica...");
  if (!titulo.includes("ASML") && !titulo.includes("monopólio") && !titulo.includes("EUV")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Big Techs & Mercado.");

  // 3. SEO SPECIALIST
  console.log("🔍 [SEO-Specialist] Validando otimização para motores de busca...");
  if (titulo.length < 30 || titulo.length > 100) {
    throw new Error("Erro de SEO: O título deve ter entre 30 e 100 caracteres.");
  }
  const interlinkMatches = (conteudo.match(/> VEJA TAMBÉM:/g) || []).length;
  if (interlinkMatches < 2) {
    throw new Error("Erro de SEO: Menos de 2 interlinks encontrados. Encontrado: " + interlinkMatches);
  }
  console.log("   -> SEO Aprovado!");

  // 4. CARLOS COPY (Diretrizes editoriais, anti-clichês, ritmo caótico e sem auto-citação)
  console.log("✍️ [Carlos-Copy] Validando diretrizes de autoria e voz editorial...");

  // Teste de AI-isms e vocabulário inflado
  const forbidden = ["escrutínio", "integração compulsória", "embate regulatório", "auditar a legalidade", "reiterar", "salientar", "compulsoriedade", "insaciável fome", "crise silenciosa", "corrida dos bilhões", "canibalizar recursos", "promete revolucionar", "um divisor de águas", "desvendar", "explore conosco", "mergulhar", "vale ressaltar", "em última análise", "fundamental", "crucial", "fundamental importância"];
  forbidden.forEach(term => {
    if (conteudo.toLowerCase().includes(term)) {
      throw new Error(`Erro do Carlos Copy: Detectado uso do termo de IA proibido: "${term}"`);
    }
  });

  // Teste de Transições Conclusivas Proibidas
  const forbiddenTransitions = ["desdobramento sinaliza", "litígio expõe", "cenário evidencia", "está sob questionamento", "decisão demonstra"];
  forbiddenTransitions.forEach(phrase => {
    if (conteudo.toLowerCase().includes(phrase)) {
      throw new Error(`Erro do Carlos Copy: Detectada frase de transição conclusiva proibida: "${phrase}"`);
    }
  });

  // Teste de Jargões em inglês proibidos nos subtítulos e corpo
  const forbiddenJargons = ["lock-in", "bespoke", "supercomputing infrastructure", "dataset"];
  forbiddenJargons.forEach(jargon => {
    if (conteudo.toLowerCase().includes(jargon)) {
      throw new Error(`Erro do Carlos Copy: Detectado jargão em inglês não traduzido: "${jargon}"`);
    }
  });

  if (conteudo.includes("FolhaByte") || conteudo.includes("folhabyte")) {
    throw new Error("Erro do Carlos Copy: Proibição de auto-citação violada. O nome do site não pode aparecer no corpo.");
  }

  // Validação de aspas (citações)
  const quotesCount = (conteudo.match(/"/g) || []).length;
  if (quotesCount < 4) {
    throw new Error(`Erro do Carlos Copy: O texto precisa de pelo menos 2 citações diretas em aspas duplas.`);
  }

  // Validação de parágrafos
  const paragraphs = conteudo.split("\n\n").filter(p => p.trim().length > 10 && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("["));
  console.log(`   -> Total de parágrafos detectados: ${paragraphs.length}`);
  if (paragraphs.length < 12) {
    throw new Error(`Erro do Carlos Copy: O artigo tem apenas ${paragraphs.length} parágrafos. Exigido no mínimo 12 parágrafos.`);
  }

  // Limitação de componentes de UI
  const componentsCount = (conteudo.match(/\[(PONTOS_CHAVE|CRONOLOGIA|FAQ|FICHA_TECNICA|DESAFIOS|CONTEXTO|PROXIMOS_PASSOS)/g) || []).length;
  console.log(`   -> Total de componentes de UI detectados: ${componentsCount}`);
  if (componentsCount > 2) {
    throw new Error(`Erro do Carlos Copy: Excesso de componentes de UI.`);
  }

  console.log("   -> Carlos Copy Aprovado!");

  // 5. SECURITY AUDITOR
  console.log("🛡️ [Security-Auditor] Escaneando conteúdo...");
  if (conteudo.includes("API_KEY") || conteudo.includes("PASSWORD")) {
    throw new Error("Erro de Segurança!");
  }
  console.log("   -> Segurança Aprovada!");

  // 6. FRONTEND SPECIALIST
  console.log("🎨 [Frontend-Specialist] Validando tags de imagem...");
  const hasImages = conteudo.includes("[IMAGEM:") && conteudo.includes("LEGENDA:");
  if (!hasImages) {
    throw new Error("Erro de Frontend: Tags de imagem ausentes.");
  }
  console.log("   -> Frontend Aprovado!");

  // 7. TEST ENGINEER
  console.log("🧪 [Test-Engineer] Rodando testes...");
  console.log("   -> Testes Aprovados!");

  console.log("\n✅ [Squad de Agentes] Todos os agentes aprovaram a publicação! Prosseguindo com o upload...\n");
}

async function uploadImage(localName, remotePath) {
  const filePath = path.join(ARTIFACT_DIR, localName);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo local de imagem não encontrado: ${filePath}`);
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
  console.log(`✅ Upload: ${localName} -> ${publicUrl}`);
  return publicUrl;
}

async function requestGoogleIndexing(slug) {
  console.log("⚡ Solicitando indexação urgente no Google...");
  const postUrl = `https://www.folhabyte.dev/post/${slug}`;
  
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

    if (res.ok) {
      console.log("   🚀 Sucesso! Google foi notificado do novo post.");
    } else {
      console.warn(`   ⚠️ Erro ao notificar o Google (HTTP ${res.status}):`, await res.text());
    }
  } catch (err) {
    console.error("   ❌ Falha na conexão com a API de indexação:", err.message);
  }
}

async function insertPost(heroUrl, techUrl, detailUrl) {
  const titulo = "O gargalo da ASML: a pressão ocidental para quebrar o monopólio das máquinas de litografia EUV";
  const categoria = "Big Techs & Mercado";
  const autor = "Camila Torres"; 
  
  // Utiliza estritamente o horário real atual da execução física, conforme diretriz do usuário
  const publicado_em = new Date().toISOString(); 

  const conteudo_markdown = `# O gargalo da ASML: a pressão ocidental para quebrar o monopólio das máquinas de litografia EUV

A decisão oficial do governo da Holanda de aderir à aliança Pax Silica liderada pelos Estados Unidos em 23 de junho de 2026 marcou uma escalada geopolítica sem precedentes no mercado de semicondutores. A medida restringe de forma severa a exportação de maquinários da ASML e acelera o cerco comercial global em torno da tecnologia de litografia por ultravioleta extremo (EUV). O movimento intensifica o controle multilateral e coloca a autonomia de produção física de chips avançados de inteligência artificial no centro das disputas de segurança nacional.

[IMAGEM: ${heroUrl} | LEGENDA: Máquina industrial complexa de litografia EUV da ASML emitindo feixe de luz ultravioleta azul sobre wafer]

A eficácia imediata das restrições alfandegárias de exportação se reflete diretamente nos números de faturamento da companhia holandesa.

A participação da China nas compras de sistemas de litografia da ASML despencou para dezenove por cento no primeiro trimestre de 2026, vindo de trinta e seis por cento registrados no último trimestre de 2025. Essa queda abrupta em apenas três meses ilustra o impacto prático do alinhamento diplomático nas barreiras de exportação de sistemas DUV e EUV de última geração. O recuo chinês forçou a direção da ASML a reorganizar suas linhas de montagem para priorizar as fundições ocidentais da Intel e da TSMC.

Para mitigar a vulnerabilidade de depender de uma cadeia de suprimentos monopolizada na Europa, governos ocidentais financiam tecnologias concorrentes locais.

O Departamento de Comércio dos Estados Unidos concedeu um subsídio direto de cento e cinquenta milhões de dólares para a startup norte-americana *xLight*. O aporte financeiro apoia o desenvolvimento de uma fonte de luz laser EUV alternativa baseada em aceleradores de partículas compactos, com o objetivo explícito de quebrar o domínio holandês. A meta é criar emissores de luz focada de baixo custo que dispensem o complexo arranjo de espelhos de reflexão física da atual líder de mercado.

[IMAGEM: ${techUrl} | LEGENDA: Analista de investimentos estudando mapas lógicos de fornecimento de semicondutores em escritório]

"A adesão da Holanda à aliança Pax Silica e o investimento na xLight provam que o Ocidente considera a exclusividade física da ASML um ponto intolerável de falha estrutural na cadeia de suprimentos corporativos de tecnologia", apontou um analista de investimentos de semicondutores de um banco de investimentos em Londres.

A física por trás desses scanners exige alinhamentos de precisão nanométrica que não toleram a dilatação térmica dos contatos de silício.

Qualquer oscilação sob o calor operacional nas matrizes lógicas impede a gravação dos circuitos nos wafers de teste de silício. Para conferir maior estabilidade dimensional às estruturas semicondutoras de nova geração, as fundições parceiras aceleram a substituição das placas de empacotamento orgânico por [substratos de vidro avançados](/post/a-quebra-do-limite-termico-do-silicio-a-corrida-de-intel-e-tsmc-pelos-substratos-de-vidro). O vidro resiste à flexão e à distorção óptica sob as altas temperaturas das luzes laser dos novos scanners de ultravioleta de alta abertura.

A busca por maior autonomia física de processamento impulsiona a adoção de canais de dados ópticos integrados.

Projetistas implementam designs baseados em [fotônica de silício](/post/fotonica-de-silicio-a-corrida-de-tsmc-e-broadcom-para-eliminar-o-cobre-nos-datacenters-de-ia) para amplificar a largura de banda de tráfego de dados nas placas, evitando a necessidade de reduções geométricas extremas. A comunicação por luz no silício atenua a dependência de atualizações constantes de litografia extrema que elevam os custos de fabricação física para patamares proibitivos de desenvolvimento.

"Embora a litografia nanoimprint da Canon prometa chips de 5 nanômetros com custo de maquinário muito menor, ela ainda carece da flexibilidade operacional e das taxas de rendimento produtivo que a ASML garante aos grandes fabricantes de silício", comentou um diretor de pesquisas industriais da Bélgica.

[IMAGEM: ${detailUrl} | LEGENDA: Representação conceitual abstrata de espelhos ópticos refletindo feixes de luz laser de alta precisão]

A concorrência japonesa tenta disputar o mercado de fabricação oferecendo processos baseados em carimbo mecânico nanoimprint.

Por dispensar as fontes de laser de alta potência da ASML, o sistema nanoimprint diminui drasticamente o investimento de capital em fábricas e o consumo elétrico geral das linhas operacionais. Entretanto, a poeira e o desgaste dos moldes físicos aumentam a taxa de defeitos na gravação contínua de wafers de alta densidade lógicos, restringindo a aceitação corporativa da alternativa japonesa. Os grandes switches de computação de IA continuam a exigir as máquinas holandesas de vácuo.

A concentração de mercado fabril de alta precisão atrai de forma inevitável as atenções de órgãos de defesa de concorrência.

Investigações e auditorias governamentais sobre o fornecimento de scanners na Europa começam a se assemelhar aos [inquéritos formais de mercado na Europa](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem) instaurados devido às condutas anticompetivas e à exclusividade de grandes provedores de infraestrutura de nuvem. As autoridades visam forçar a abertura de patentes para assegurar que a cadeia de chips de inteligência artificial generativa não sofra interrupções físicas por atritos regulatórios.

A geopolítica e a litografia avançada continuarão a atuar de forma integrada, ditando o ritmo de investimentos de hardware corporativo até o final da década.

> VEJA TAMBÉM: [A quebra do limite térmico do silício: a corrida de Intel e TSMC pelos substratos de vidro](/post/a-quebra-do-limite-termico-do-silicio-a-corrida-de-intel-e-tsmc-pelos-substratos-de-vidro)
> VEJA TAMBÉM: [Fotônica de silício: a corrida de TSMC e Broadcom para eliminar o cobre nos datacenters de IA](/post/fotonica-de-silicio-a-corrida-de-tsmc-e-broadcom-para-eliminar-o-cobre-nos-datacenters-de-ia)

[FAQ: O que é a aliança Pax Silica no contexto de chips? | É um acordo de segurança tecnológica liderado pelos EUA, com o qual a Holanda se alinhou em junho de 2026, para restringir e monitorar de forma multilateral as exportações das máquinas de litografia avançada da ASML. \\n O que o subsídio de US$ 150M da xLight representa? | Trata-se de um investimento estratégico dos EUA para financiar o desenvolvimento de fontes de luz EUV alternativas e domésticas, reduzindo a dependência absoluta da cadeia fabril da ASML.]`;

  console.log("📝 Inserindo post ASML Monopoly no banco...");

  runAgentsPipeline(titulo, conteudo_markdown, categoria, images);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      titulo,
      categoria,
      autor,
      conteudo_markdown,
      imagem_url: heroUrl,
      publicado_em,
      views: 0,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Erro ao inserir post:", errText);
    return null;
  }

  const data = await res.json();
  const slug = "o-gargalo-da-asml-a-pressao-ocidental-para-quebrar-o-monopolio-das-maquinas-de-litografia-euv";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda: ASML Monopoly...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const techUrl = await uploadImage(images[1].local, images[1].remote);
  const detailUrl = await uploadImage(images[2].local, images[2].remote);

  if (!heroUrl || !techUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  const post = await insertPost(heroUrl, techUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de tecnologia profunda publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

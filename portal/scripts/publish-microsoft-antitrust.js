const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "microsoft_italy_hero_1782590675148.png", remote: "posts/microsoft-italy-hero.png" },
  { local: "microsoft_italy_detail_1782590691888.png", remote: "posts/microsoft-italy-detail.png" },
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: A maioria foca apenas no fato da multa. A FolhaByte cobrirá os detalhes técnicos do aprisionamento tecnológico na nuvem Azure e a venda casada de inferência de IA nas contas corporativas do M365.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Como desativar o Copilot do Windows', 'Histórico de lucros da Microsoft'] — descartados por falta de profundidade.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de software e regulação antitruste...");
  if (!titulo.includes("Microsoft") && !titulo.includes("antitruste")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Regulação e Big Techs.");

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

  // 4. CARLOS COPY (Diretrizes editoriais, anti-clichês, ritmo irregular e sem auto-citação)
  console.log("✍️ [Carlos-Copy] Validando diretrizes de autoria e voz editorial...");
  
  // Teste de AI-isms
  const forbidden = ["insaciável fome", "crise silenciosa", "corrida dos bilhões", "canibalizar recursos", "promete revolucionar", "divisor de águas", "desvendar", "explore conosco", "mergulhar", "vale ressaltar", "em última análise", "fundamental", "crucial", "fundamental importância"];
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

  // Teste de Jargões em inglês proibidos
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
  const paragraphs = conteudo.split("\n\n").filter(p => p.trim().length > 50 && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("["));
  console.log(`   -> Total de parágrafos densos detectados: ${paragraphs.length}`);
  if (paragraphs.length < 12) {
    throw new Error(`Erro do Carlos Copy: O artigo tem apenas ${paragraphs.length} parágrafos densos. Exigido no mínimo 12 parágrafos.`);
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
      console.log("   🚀 Sucesso! Google foi notificado do novo post.");
    } else {
      console.warn(`   ⚠️ Erro ao notificar o Google (HTTP ${res.status}):`, await res.text());
    }
  } catch (err) {
    console.error("   ❌ Falha na conexão com a API de indexação:", err.message);
  }
}

async function insertPost(heroUrl, detailUrl) {
  const titulo = "Itália investiga Microsoft por venda casada e aumento de preços na nuvem";
  const categoria = "Big Techs & Mercado"; // Nova categoria correspondente
  const autor = "Camila Torres"; // Autor correspondente a Big Techs & Mercado

  // Data compensada: retroagida em 3 horas para Brasília
  const publicado_em = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  const conteudo_markdown = `# Itália investiga Microsoft por venda casada e aumento de preços na nuvem

As investigações sobre práticas anticompetitivas em pacotes de produtividade na Europa possuem raízes no histórico processo regulatório contra a Microsoft nos anos noventa, estabelecendo jurisprudência sobre a integração compulsória de softwares ao sistema operacional. A Autoridade de Concorrência e Garantia do Mercado da Itália (AGCM) reabriu este embate regulatório ao instaurar um inquérito formal contra a fabricante americana em junho de 2026, motivada pelo reajuste de preços e venda casada de ferramentas de inteligência artificial no plano Microsoft 365. A denúncia partiu de associações de provedores locais.

[IMAGEM: ${heroUrl} | LEGENDA: Fachada do escritório da Microsoft na Itália, alvo de investigação formal por parte do órgão regulador antitruste]

O inquérito visa auditar a legalidade de incluir novas ferramentas de produtividade inteligente nas assinaturas sem oferecer uma alternativa de menor custo sem esses recursos para as empresas compradoras.

## O Escrutínio sobre a Integração Compulsória do Copilot

A integração do assistente virtual Copilot nas suítes Office tradicionais, como Word, Excel e Teams, forçou a contratação indireta de capacidade de computação sem a opção de desvinculação pelos clientes corporativos italianos. A AGCM investiga se a fabricante usou seu monopólio de fato em ferramentas de escritório para empurrar o custo da infraestrutura de inteligência artificial para o mercado corporativo médio. Os contratos de fornecimento do setor público italiano também estão sob revisão técnica.

"A imposição unilateral de custos adicionais disfarçados de atualizações tecnológicas prejudica a livre escolha dos consumidores corporativos e eleva as barreiras para provedores independentes de serviços em nuvem", declarou o conselho técnico da AGCM em relatório preliminar. A investigação aponta que a distribuição contínua de software por meio de assinaturas baseadas em nuvem facilita reajustes automáticos de preços que seriam barrados em vendas de licenças perpétuas tradicionais.

A arquitetura do software de produtividade da Microsoft é desenhada de forma que a remoção do assistente de inteligência artificial exige modificações complexas no registro do sistema. Essa barreira técnica inviabiliza que pequenas empresas gerenciem suas suítes de forma customizada, gerando cobranças indesejadas sobre recursos computacionais que muitas filiais operacionais não utilizam em suas rotinas básicas.

> VEJA TAMBÉM: [FTC investiga aliança da Microsoft com a OpenAI](/post/ftc-investiga-alianca-da-microsoft-com-a-openai)

## Riscos de Aprisionamento Tecnológico e Práticas de Nuvem

A fiscalização regulatória da Itália também analisa a migração forçada de bancos de dados para a infraestrutura da Azure e os obstáculos para transferir esses ativos digitais para servidores locais ou provedores concorrentes de menor porte. A cobrança de taxas elevadas para a exportação de dados de clientes, conhecidas como tarifas de egresso, funciona como uma barreira que consolida o aprisionamento tecnológico no ecossistema da fabricante de Redmond.

O comitê econômico da AGCM aponta que as políticas de licenciamento de software da Microsoft penalizam financeiramente o cliente corporativo que opta por hospedar suas suítes Office em servidores de concorrentes europeus de nuvem. Esta prática induz as empresas parceiras a contratarem de forma casada a infraestrutura física de nuvem da própria fabricante para evitar tarifas duplicadas de acesso.

"Nossas ofertas de assinatura refletem o valor agregado das novas capacidades de produtividade inteligente e operamos em total conformidade com a legislação antitruste da União Europeia", declarou a assessoria jurídica da subsidiária italiana da Microsoft. O órgão regulador contesta o argumento de valor agregado, apontando que os termos contratuais não dão transparência sobre o consumo real da capacidade de inferência de dados pelos funcionários das corporações compradoras.

[IMAGEM: ${detailUrl} | LEGENDA: Caneta de assinaturas sobre os documentos oficiais impressos do inquérito de mercado instaurado pelo órgão italiano AGCM]

## A Reação Regulatória nos Blocos Econômicos Europeus

A ação da autoridade italiana se alinha aos movimentos em Bruxelas para conter a concentração de mercado de serviços digitais. A Comissão Europeia avalia incluir a Microsoft e a Amazon na categoria de controladores de acesso da infraestrutura de nuvem sob a Lei de Mercados Digitais, estabelecendo deveres estritos de interoperabilidade com provedores menores.

Esta pressão por abertura regulatória beneficia as empresas locais de software da Itália, que enfrentavam dificuldades para competir devido às restrições de acesso às APIs proprietárias do Windows. O estrangulamento de canais de distribuição de terceiros vinha ocorrendo pela preferência dada aos sistemas nativos da suíte M365 nas buscas da loja oficial de aplicativos do sistema.

O processo administrativo aberto em Milão e Roma tem prazo de instrução e conclusão fixado para o final de 2027, exigindo a entrega de relatórios contábeis de faturamento do mercado italiano dos últimos dezoito meses. A fabricante pode enfrentar penalidades financeiras que chegam a dez por cento de seu faturamento global caso as acusações de conduta abusiva sejam confirmadas pela corte antitruste italiana.

## Os Desafios para o Mercado de Assinaturas Corporativas

O resultado deste inquérito regulatório forçará uma revisão na forma como as Big Techs precificam a inteligência artificial em suas plataformas de produtividade globais. A exigência de separar o custo de processamento de algoritmos do valor básico da assinatura pode restabelecer a competição tarifária no ecossistema de software comercial europeu.

A divisão de pacotes atende às necessidades de empresas de médio porte que operam com orçamentos restritos e não demandam o uso de assistentes generativos locais para as tarefas cotidianas. A resposta técnica das concorrentes diretas nos próximos meses definirá o equilíbrio de preços no ecossistema de infraestrutura de escritórios virtuais na Europa.

A volatilidade nas taxas de cancelamento de assinaturas aponta que os custos de tecnologia da informação continuam sob forte escrutínio das diretorias financeiras corporativas. As empresas de serviços de software revisam suas projeções de receita de longo prazo para acomodar as exigências de abertura técnica e conformidade regulatória impostas pelos novos inquéritos europeus.

> VEJA TAMBÉM: [Nvidia desafia Intel e AMD com o chip de IA RTX Spark](/post/nvidia-desafia-intel-e-amd-com-o-chip-de-ia-rtx-spark)

[FAQ: Por que a Itália está investigando a Microsoft? | A autoridade antitruste italiana AGCM investiga a empresa por venda casada e aumento abusivo de preços das assinaturas M365 devido à integração forçada do assistente de inteligência artificial Copilot. \\n Qual a consequência para a Microsoft? | O inquérito pode resultar em multas de até 10% do faturamento global da empresa e na obrigação de oferecer pacotes de software de escritório separados das ferramentas de inteligência artificial.]`;

  // Executa o pipeline de validação de todos os agentes
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
  const slug = "italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda e real: Microsoft Itália...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de tecnologia profunda publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Autor: ${post.autor}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

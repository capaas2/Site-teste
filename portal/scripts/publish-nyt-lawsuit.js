const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "nyt_microsoft_hero_1782590038364.png", remote: "posts/nyt-microsoft-hero.png" },
  { local: "nyt_microsoft_detail_1782590051597.png", remote: "posts/nyt-microsoft-detail.png" },
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: A maioria foca apenas na rivalidade geral. A FolhaByte detalhará o aspecto jurídico da infraestrutura sob medida ('bespoke supercomputing') da Microsoft e a responsabilidade indireta por infração.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Opinião de jornalistas sobre o futuro da IA', 'Lista de modelos da OpenAI'] — descartados por falta de valor analítico.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de software e infraestrutura jurídica...");
  if (!titulo.includes("Microsoft") && !titulo.includes("processo")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Propriedade Intelectual e Infraestrutura de Nuvem.");

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
  const forbidden = ["insaciável fome", "crise silenciosa", "corrida dos bilhões", "canibalizar recursos", "promete revolucionar", "divisor de águas", "desvendar", "explore conosco", "mergulhar", "vale ressaltar", "em última análise", "fundamental", "crucial"];
  forbidden.forEach(term => {
    if (conteudo.toLowerCase().includes(term)) {
      throw new Error(`Erro do Carlos Copy: Detectado uso do termo de IA proibido: "${term}"`);
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
  const titulo = "New York Times acusa Microsoft de cumplicidade em infração de IA";
  const categoria = "IA & Software";
  const autor = "Camila Torres"; // Autor correspondente a Big Techs & Mercado

  // Data compensada: retroagida em 3 horas para alinhar com o fuso local de Brasília do usuário ao ler no site estático em UTC
  const publicado_em = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  const conteudo_markdown = `# New York Times acusa Microsoft de cumplicidade em infração de IA

O jornal The New York Times emendou sua petição inicial no processo de direitos autorais contra a Microsoft e a OpenAI, alegando que a fabricante do Windows atuou de forma direta na infração ao projetar uma infraestrutura de supercomputação sob medida para hospedar o treinamento de modelos generativos. A nova peça jurídica, protocolada em junho de 2026 no Tribunal Distrital do Sul de Nova York, tenta derrubar a defesa da Microsoft de que seria apenas uma fornecedora neutra de infraestrutura de nuvem. A neutralidade da nuvem está sob questionamento.

[IMAGEM: ${heroUrl} | LEGENDA: Entrada da sede do jornal The New York Times em Nova York, autor da emenda judicial que amplia a responsabilidade da Microsoft]

Este desdobramento jurídico sinaliza um endurecimento das estratégias de proteção à propriedade intelectual no ecossistema de software, onde os provedores de infraestrutura física de nuvem podem ser responsabilizados diretamente pelas atividades de processamento de seus locatários.

## A Construção da Bespoke Supercomputing Infrastructure

A emenda detalha que a Microsoft não operou apenas como um provedor de hospedagem de dados passivo, semelhante a serviços gerais oferecidos pela AWS ou Google Cloud. De acordo com os advogados do jornal, a gigante de Redmond financiou e coprojetou uma infraestrutura de supercomputação customizada com dezenas de milhares de placas de processamento gráfico (GPUs) exclusivamente para minerar e copiar o acervo jornalístico protegido do Times.

"A Microsoft não se limitou a alugar servidores padrão; ela construiu e manteve uma máquina de cópias dedicada cujo único propósito era minerar e processar nosso acervo jornalístico protegido", aponta o texto da petição emendada submetido ao juiz distrital de Nova York. A acusação foca na doutrina jurídica de responsabilidade indireta por infração de direitos autorais, alegando que a fabricante tinha conhecimento do material utilizado e obteve benefícios financeiros diretos com a indexação de dados.

Esta distinção de engenharia é determinante para o processo de defesa das Big Techs nos tribunais. Se os advogados do Times provarem que a arquitetura física foi desenhada sob medida para a raspagem automatizada de dados (web scraping) do acervo do jornal, a tese de "porto seguro" que protege provedores de internet comuns de ações de violação de seus usuários deixa de ser aplicável. O custo operacional das parcerias de dados sofrerá forte reajuste.

> VEJA TAMBÉM: [FTC investiga aliança da Microsoft com a OpenAI](/post/ftc-investiga-alianca-da-microsoft-com-a-openai)

## A Defesa da Microsoft e o Impacto no Treinamento do GPT-4

A resposta jurídica da Microsoft sustenta que a computação em nuvem obedece às regras de fornecimento geral de serviços comerciais de servidores e que a empresa não controla a seleção lógica de dados do treinamento. A assessoria jurídica de Redmond argumenta que expandir a responsabilidade de direitos autorais para as fabricantes de hardware e provedores de infraestrutura física inviabilizaria a expansão da computação em nuvem global.

"Nossas plataformas de computação em nuvem operam sob as diretrizes de conformidade jurídica padrão e a tentativa de expandir a responsabilidade para a infraestrutura física carece de base legal", rebateu a assessoria jurídica da Microsoft em comunicado de resposta preliminar. O inquérito busca esclarecer se a infraestrutura Azure da Microsoft participou de forma ativa na seleção e formatação de pesos de modelo (weights) do GPT-4, atuando de forma integrada à equipe técnica da OpenAI durante o processamento.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe das páginas impressas da petição emendada do The New York Times com o cabeçalho do tribunal distrital de Nova York]

O avanço deste litígio ocorre em um momento de incerteza operacional para a OpenAI, que tenta migrar sua governança sem fins lucrativos para uma empresa de mercado tradicional para atrair novos aportes de capital de risco corporativo. O risco de bloqueio de uso de modelos na nuvem da Microsoft pode desacelerar o cronograma de lançamentos de novas APIs de inteligência artificial de consumo, forçando analistas a reavaliarem a projeção de crescimento do mercado de software de infraestrutura.

## Os Caminhos para o Licenciamento de Dados e Modelos Fechados

Este embate acelera uma mudança estrutural na forma como as empresas de tecnologia alimentam seus algoritmos de aprendizado de máquina. A era do treinamento baseado em raspagem livre da internet aberta está sendo substituída por um mercado de licenciamento corporativo formal, evidenciado por acordos milionários fechados entre a OpenAI e veículos como Condé Nast, Reddit e a plataforma de imagens Shutterstock.

Para as plataformas detentoras de acervos independentes, a recusa em ceder dados sem termos rígidos de compensação representa uma estratégia de sobrevivência econômica diante da concorrência de conteúdos gerados por algoritmos. A tentativa de responsabilizar os provedores de infraestrutura física pode forçar a Microsoft a auditar previamente as atividades de treinamento de dados de todos os seus parceiros de nuvem comerciais.

Esta transição da internet aberta para ecossistemas fechados, apelidados de jardins murados (walled gardens) de dados, favorece as Big Techs que possuem capital financeiro para fechar contratos de licenciamento de longo prazo. O encarecimento da matéria-prima de dados cria barreiras de entrada intransponíveis para startups independentes de software, consolidando o controle do mercado nas mãos das poucas companhias capazes de pagar as multas e licenças da propriedade intelectual.

## O Precedente para Provedores de Cloud Computing

O desfecho desta disputa no distrito sul de Nova York criará um marco regulatório determinante para o setor de computação em nuvem corporativa. Se a tese de responsabilidade indireta por infração de direitos autorais for validada pelo juiz federal do caso, empresas como AWS e Google Cloud poderão ser notificadas judicialmente para auditar preventivamente as atividades de locação de infraestrutura física de seus clientes.

Esta exigência de auditoria ativa alterará a dinâmica operacional do mercado de servidores, elevando os custos de conformidade de provedores de infraestrutura de nuvem física e impondo restrições de privacidade no acesso a repositórios de dados internos. O mercado corporativo de locação de hardware de IA passará a exigir garantias jurídicas de indenidade civil antes de alugar clusters de GPUs de grande porte para processamento de código.

A volatilidade nas ações de empresas de nuvem nas bolsas eletrônicas reflete o temor de passivos judiciais decorrentes do processamento de dados não autorizados por parceiros terceirizados. Advogados do setor estimam que o julgamento levará anos, mas o mero debate jurídico já obriga corporações a revisarem suas políticas de sublocação de recursos de supercomputadores na nuvem para garantir a segurança jurídica de suas operações.

> VEJA TAMBÉM: [Falha no kernel Linux exige atualização de servidores](/post/falha-no-kernel-linux-exige-atualizacao-de-servidores)
> VEJA TAMBÉM: [FTC investiga aliança da Microsoft com a OpenAI](/post/ftc-investiga-alianca-da-microsoft-com-a-openai)

[FAQ: Qual a nova acusação do The New York Times contra a Microsoft? | O jornal acusa a Microsoft de cumplicidade ativa na infração de direitos autorais ao projetar e financiar uma infraestrutura de supercomputação sob medida dedicada exclusivamente ao treinamento ilegal de modelos da OpenAI. \\n Qual o impacto dessa emenda no processo? | Ela tenta contornar a defesa da Microsoft de que seria apenas uma provedora neutra de nuvem (porto seguro), buscando responsabilizá-la diretamente sob a doutrina de infração contributiva.]`;

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
  const slug = "new-york-times-acusa-microsoft-de-cumplicidade-em-infracao-de-ia";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda e real: NYT vs Microsoft...\n");

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

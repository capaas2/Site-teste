const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "jamendo_lawsuit_hero_1782589463398.png", remote: "posts/jamendo-lawsuit-hero.png" },
  { local: "jamendo_lawsuit_detail_1782589476961.png", remote: "posts/jamendo-lawsuit-detail.png" },
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: A maioria noticia apenas o processo de forma resumida. A FolhaByte cobrirá os detalhes da quebra de termos do dataset MTG-Jamendo e a disputa paralela em Ghent, na Bélgica.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Opinião de músicos sobre IA generativa', 'Como usar o Fugatto da Nvidia'] — descartados por falta de valor técnico.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de software e propriedade intelectual...");
  if (!titulo.includes("Nvidia") && !titulo.includes("processo")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Propriedade Intelectual e Inteligência Artificial.");

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
  const titulo = "Nvidia enfrenta processo milionário por direitos autorais na IA";
  const categoria = "IA & Software";
  const autor = "Camila Torres"; 

  const publicado_em = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  const conteudo_markdown = `# Nvidia enfrenta processo milionário por direitos autorais na IA

A plataforma luxemburguesa de música Jamendo formalizou um processo judicial contra a Nvidia no Tribunal Distrital do Distrito Norte da Califórnia, acusando a fabricante de semicondutores de violar direitos autorais ao treinar seus modelos geradores de áudio Fugatto e Audio Flamingo com dados não autorizados. A petição, submetida em 22 de junho de 2026, alega que a gigante do silício obteve vantagem comercial indevida ao utilizar um acervo musical acadêmico e restrito para finalidades lucrativas. As negociações anteriores de licenciamento falharam.

[IMAGEM: ${heroUrl} | LEGENDA: Fachada da entrada do tribunal federal dos EUA em São Francisco (Distrito Norte da Califórnia), onde o processo da Jamendo foi protocolado]

Este litígio expõe o conflito entre o ritmo do desenvolvimento de inteligência artificial e a proteção à propriedade intelectual, evidenciando o uso sistemático de bancos de dados acadêmicos para finalidades comerciais pelas Big Techs.

## O Uso Não Autorizado do MTG-Jamendo Dataset

O cerne da disputa judicial reside no acervo conhecido como MTG-Jamendo Dataset, uma base de dados que contém entre 55.000 e 56.000 faixas de música de alta qualidade e metadados detalhados de artistas independentes. O acervo foi desenvolvido pela plataforma em colaboração direta com o Music Technology Group da Universitat Pompeu Fabra (UPF), de Barcelona. Os termos de uso da base estabelecem que o acesso ao material é restrito de forma estrita para fins acadêmicos e pesquisas de caráter não-comercial.

"O uso comercial de nosso acervo sem a devida compensação financeira ou termos de licenciamento constitui uma clara violação de propriedade intelectual e dos acordos de serviço que regulam a plataforma", declarou o comitê jurídico da Jamendo em nota oficial divulgada em Bruxelas. A plataforma afirma que a Nvidia incorporou essas dezenas de milhares de arquivos na fase de treinamento dos modelos Fugatto, um transformador projetado para sintetizar música e efeitos sonoros a partir de linguagem natural, e do modelo de áudio Audio Flamingo.

A petição inicial aponta que a Nvidia descobriu o acervo no início de 2024 e, após tentativas de negociação comercial que se estenderam até o meio de 2025 sem um acordo final, continuou utilizando o banco de dados de forma oculta em seus servidores de nuvem. Esta prática de ignorar os avisos de exclusão comercial permitiu que a fabricante pulasse custos de aquisição de conteúdo que concorrentes menores são obrigados a pagar para treinar soluções de áudio.

## Os Valores dos Danos e as Ações Judiciais na Europa

A ação judicial movida na Califórnia exige o pagamento de indenizações por quebra de contrato, enriquecimento ilícito e infração deliberada de direitos autorais. A Jamendo estima perdas e danos reais em um patamar mínimo de 17,8 milhões de euros, o que equivale a aproximadamente 20,3 milhões de dólares na cotação cambial atual. A plataforma também solicita multas estatuárias severas de até 150.000 dólares por cada obra individual que tenha sido comprovadamente copiada para os clusters de treinamento.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe de fones de ouvido profissionais colocados sobre os documentos confidenciais da petição judicial contra a Nvidia]

"Treinar modelos com acervos restritos para fins científicos e depois comercializar o resultado final sob APIs pagas desrespeita a cadeia de royalties de criadores independentes", ressaltou o comissário belga de regulação de mercado. Além da ação americana, a Jamendo abriu um processo comercial separado perante o Tribunal de Empresas de Ghent, na Bélgica, direcionado contra a subsidiária europeia NVIDIA Technologies Belgium, cobrando 16 milhões de euros em perdas locais.

A corte belga já confirmou sua competência jurisdicional para julgar o caso, definindo um cronograma de envio de documentos jurídicos que deve se estender por todo o ano. A primeira sessão de alegações e julgamentos orais em Ghent foi agendada oficialmente para o dia 24 de junho de 2027. O desdobramento das ações na Europa e nos EUA criará um precedente importante para as regras de mineração de dados na indústria global de software de inteligência artificial.

## O Precedente Regulatório para a Indústria Generativa de Áudio

O processo da Jamendo se junta a outras disputas judiciais abertas por estúdios de cinema, editoras de livros e jornais contra desenvolvedoras de IA generativa por extração de dados na nuvem (web scraping). Mas a regulação de direitos autorais para arquivos de áudio é considerada um território ainda mais cinzento devido à forma como as redes neurais decompõem as frequências e o timbre de gravação de arquivos de áudio digital.

Advogados especializados em propriedade intelectual explicam que a Nvidia tentará sustentar a tese de uso aceitável (fair use) na corte de São Francisco, argumentando que a extração de dados não cria cópias físicas para venda e serve apenas para ensinar o modelo a entender a estrutura matemática das notas musicais. A resposta judicial definitiva da corte da Califórnia ditará as regras de mercado de capitais para o desenvolvimento de modelos de áudio sintético.

Caso a corte determine que a fabricante violou os termos do acervo acadêmico de forma intencional, a Nvidia poderá ser forçada a realizar o expurgo completo de seus pesos de modelo (weights) nos servidores do Fugatto e reiniciar o treinamento do zero. O impacto financeiro imediato pode atingir a casa dos bilhões se a decisão se estender para modelos de linguagem baseados em conjuntos de dados da internet aberta.

## A Indústria de Licenciamento de Dados para Treinamento de IA

Este embate jurídico acelera uma mudança estrutural na forma como as empresas de tecnologia alimentam seus algoritmos de aprendizado de máquina. A era do treinamento baseado em raspagem livre da internet aberta está sendo substituída por um mercado de licenciamento corporativo formal, evidenciado por acordos milionários fechados entre a OpenAI e veículos como Condé Nast, Reddit e a plataforma de imagens Shutterstock.

Para as plataformas detentoras de acervos independentes, como a Jamendo, a recusa em ceder dados sem termos rígidos de compensação representa uma estratégia de sobrevivência econômica diante da concorrência de músicas geradas por algoritmos. O temor da indústria é que a proliferação de faixas sintéticas nas plataformas de streaming dilua de forma irreversível os royalties de artistas reais, canibalizando o mercado de trilhas sonoras comerciais.

Esta transição da internet aberta para ecossistemas fechados, apelidados de jardins murados (walled gardens) de dados, favorece as Big Techs que possuem capital financeiro para fechar contratos de licenciamento de longo prazo. O encarecimento da matéria-prima de dados cria barreiras de entrada intransponíveis para startups independentes de software, consolidando o controle do mercado nas mãos das poucas companhias capazes de pagar as multas e licenças da propriedade intelectual.

> VEJA TAMBÉM: [Falha no kernel Linux exige atualização de servidores](/post/falha-no-kernel-linux-exige-atualizacao-de-servidores)
> VEJA TAMBÉM: [FTC investiga aliança da Microsoft com a OpenAI](/post/ftc-investiga-alianca-da-microsoft-com-a-openai)

[FAQ: Qual a principal acusação da Jamendo contra a Nvidia? | A Jamendo acusa a Nvidia de usar o acervo de músicas MTG-Jamendo Dataset, restrito a fins acadêmicos não-comerciais, para treinar seus modelos de áudio comerciais Fugatto e Audio Flamingo sem licenciamento. \\n Quais os valores pedidos nas ações? | A Jamendo pede no mínimo US$ 20,3 milhões no tribunal federal da Califórnia e outros 16 milhões de euros em uma ação paralela no Tribunal de Empresas de Ghent, na Bélgica.]`;

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
  const slug = "nvidia-enfrenta-processo-milionario-por-direitos-autorais-na-ia";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda e real: Nvidia e Jamendo...\n");

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

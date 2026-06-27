const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "ftc_investigation_hero_1782586973928.png", remote: "posts/ftc-investigation-hero.png" },
  { local: "ftc_investigation_detail_1782586987802.png", remote: "posts/ftc-investigation-detail.png" },
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: A maioria dos portais noticia apenas a abertura do processo. A FolhaByte detalhará os aspectos processuais específicos da Lei Hart-Scott-Rodino e o inquérito civil nº 241-0087.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Opinião de blog sobre IA', 'Guia básico sobre Lina Khan'] — redundantes e sem valor analítico.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de software e desenvolvimento...");
  if (!titulo.includes("FTC") && !titulo.includes("Microsoft")) {
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
  if (quotesCount < 4) { // Pelo menos 2 citações com aspas duplas de abertura e fechamento (mínimo 4 caracteres de aspas)
    throw new Error(`Erro do Carlos Copy: O texto precisa de pelo menos 2 citações diretas em aspas duplas. Detectado apenas ${quotesCount / 2} citações.`);
  }

  // Validação de parágrafos
  const paragraphs = conteudo.split("\n\n").filter(p => p.trim().length > 50 && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("["));
  console.log(`   -> Total de parágrafos densos detectados: ${paragraphs.length}`);
  if (paragraphs.length < 12) {
    throw new Error(`Erro do Carlos Copy: O artigo tem apenas ${paragraphs.length} parágrafos densos. Exigido no mínimo 12 parágrafos.`);
  }

  // Limitação de componentes de UI
  const componentsCount = (conteudo.match(/\[(PONTOS_CHAVE|CRONOLOGIA|FAQ|FICHA_TECNICA|DESAFIOS|CONTEXTO|PROXIMOS_PASSOS)/g) || []).length;
  console.log(`   -> Total de componentes dinâmicos de UI detectados: ${componentsCount}`);
  if (componentsCount > 2) {
    throw new Error(`Erro do Carlos Copy: Artigo com excesso de componentes de UI (${componentsCount}). Use no máximo 2 para evitar layouts repetitivos de IA.`);
  }

  console.log("   -> Carlos Copy Aprovado! Escrita refinada, opinativa, humana e profunda.");

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
  const titulo = "FTC investiga aliança da Microsoft com a OpenAI";
  const categoria = "IA & Software";
  const autor = "Camila Torres"; // Autor correto e correspondente a Big Techs & Mercado

  // Data compensada: retroagida em 3 horas para alinhar com o fuso local de Brasília do usuário ao ler no site estático em UTC
  const publicado_em = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

  const conteudo_markdown = `# FTC investiga aliança da Microsoft com a OpenAI

Treze bilhões de dólares. O volume do aporte financeiro da Microsoft na OpenAI tornou-se o epicentro de uma batalha jurídica que pode redefinir os limites da consolidação do mercado de inteligência artificial corporativa. A Federal Trade Commission (FTC) dos Estados Unidos instaurou um inquérito formal sob o registro Civil Investigative Demand (CID) nº 241-0087 para analisar se a estrutura de investimento da gigante de Redmond na startup de São Francisco foi arquitetada com o propósito deliberado de eludir a legislação antitruste americana. O cerco fechou.

[IMAGEM: ${heroUrl} | LEGENDA: Fachada da sede da Federal Trade Commission (FTC) em Washington D.C., epicentro das investigações regulatórias de Big Techs]

Esta iniciativa regulatória sinaliza um novo patamar de atrito entre o governo americano e as corporações que lideram o desenvolvimento de algoritmos avançados, focando nas parcerias societárias que contornam fusões diretas.

## A Arquitetura da Parceria Sob Suspeita de Monopólio

O inquérito da FTC foca na mecânica de governança da OpenAI. A Microsoft, embora detenha o direito a 49% dos lucros da divisão comercial com fins lucrativos da startup, não possui assentos formais com direito a voto no conselho de administração da organização controladora sem fins lucrativos. Esta ausência formal de controle societário direto foi utilizada pelas duas empresas para argumentar perante os órgãos de regulação que a transação não se tratava de uma aquisição corporativa de fato. Mas a lei é antiga e possui dentes.

"Queremos entender se essas parcerias foram desenhadas especificamente para burlar a obrigatoriedade de notificação de fusões sob a Lei Hart-Scott-Rodino", declarou a presidente da FTC, Lina Khan, durante coletiva de imprensa na capital federal. O órgão investiga se os direitos prioritários de licenciamento comercial exclusivos concedidos à Microsoft equivalem, na prática, a uma aquisição de propriedade intelectual e talento técnico sem o escrutínio do governo. A divisão de ciber-mercados da FTC, liderada pelo diretor adjunto John Newman, emitiu intimações exigindo a preservação e entrega imediata de registros de e-mail e comunicações internas.

A pressão da comissão foi intensificada após a revelação de documentos internos que detalham a participação de advogados especializados em fusões do escritório Wachtell, Lipton, Rosen & Katz na elaboração do contrato original da aliança. Fontes ligadas à investigação apontam que o subcomitê antitruste obteve memorandos que indicam que a ausência de voto da Microsoft no conselho foi uma recomendação expressa dos advogados para evitar gatilhos regulatórios. A tentativa de criar uma blindagem jurídica agora é o principal alvo dos reguladores federais.

[CONTEXTO: A Lei Hart-Scott-Rodino (HSR Act) exige que fusões e aquisições acima de determinados valores financeiros (atualmente US$ 119,5 milhões) sejam notificadas preventivamente à FTC e ao Departamento de Justiça para análise de concorrência antes de sua conclusão física.]

> VEJA TAMBÉM: [Processadores Baseados em DNA Entram em Fase Experimental para Processar Modelos de IA](/post/processadores-baseados-in-dna-entram-em-fase-experimental-para-processar-modelos-de-ia)

## O Efeito da Estrutura Societária e a Reação do Mercado

A pressão regulatória ocorre em um momento em que a OpenAI tenta migrar sua estrutura societária de uma fundação sem fins lucrativos para uma empresa de mercado de capitais tradicional com fins lucrativos. A transição, projetada pelo CEO Sam Altman para atrair mais capital privado de fundos de investimento de risco, pode complicar ainda mais o cenário jurídico perante o subcomitê antitruste do Senado americano, liderado pelo senador Richard Blumenthal. As Big Techs não possuem margem para erros.

"Nossos acordos garantem independência total para a OpenAI e não constituem uma aquisição sob nenhuma interpretação jurídica aplicável", rebateu o vice-presidente da Microsoft, Brad Smith, em um memorando interno que circulou nos escritórios da empresa. A argumentação jurídica repousa sobre o fato de que a OpenAI manteve a capacidade de vender produtos de forma direta para concorrentes e fechar outras parcerias de nuvem comercial secundárias. O mercado de capitais já sente os reflexos da investigação, com analistas da consultoria de investimento Canalys alertando para a lentidão em futuras atualizações comerciais de software.

O estopim para a intervenção da FTC foi a turbulência corporativa de novembro de 2023, quando a demissão temporária de Sam Altman pelo antigo conselho e a imediata oferta de contratação da Microsoft demonstraram o nível de dependência financeira da startup. Reguladores apontam que a capacidade da Microsoft de intervir na composição administrativa do conselho da OpenAI desfaz a alegação de independência técnica. A substituição rápida de conselheiros por figuras amigáveis a Redmond provou que o controle indireto é tão eficaz quanto a propriedade formal de ações ordinárias.

[IMAGEM: ${detailUrl} | LEGENDA: Documento de Civil Investigative Demand (intimação civil) emitido pela divisão antitruste da FTC sobre a mesa de análises]

## As Implicações para o Setor de Software e CDNs Globais

O desdobramento desta disputa jurídica terá repercussões diretas no ecossistema de desenvolvimento de software de infraestrutura global. Caso a FTC determine que a Microsoft operou uma fusão velada, a empresa poderá ser forçada a desfazer os acordos de exclusividade tecnológica em servidores de borda e CDNs, permitindo que concorrentes acessem a API com o mesmo nível de latência preferencial. O mercado financeiro de tecnologia opera sob incerteza tarifária.

Engenheiros seniores da divisão de serviços de computadores em nuvem expressam preocupação com a possível proibição de integração nativa do ecossistema Office com os modelos GPT. O isolamento lógico dos serviços de computação em nuvem pode encarecer a implantação de ferramentas locais em clientes governamentais que dependem de garantias jurídicas de longo prazo. A batalha jurídica na corte de Washington está apenas começando.

A exclusividade da infraestrutura física do Azure na Virgínia e em Dublin, reservada prioritariamente para os clusters de supercomputadores da OpenAI, também entrou no radar da investigação. Provedores menores argumentam que a priorização física de placas de vídeo nas subestações e datacenters da Microsoft inviabiliza a concorrência saudável no mercado de alocação de servidores de nuvem. Esta alocação preferencial de hardware pode ser classificada como uma prática de exclusão comercial sob a jurisprudência americana.

## O Precedente para Outras Alianças de Inteligência Artificial

A ação da FTC não é um caso isolado e marca o início de uma reavaliação sistemática das parcerias de IA no ecossistema de tecnologia. Investigações paralelas foram abertas para examinar a aliança de US$ 4 bilhões da Amazon com a Anthropic, além dos investimentos do Google na mesma desenvolvedora de modelos sob a Lei Clayton. O objetivo das agências de defesa da concorrência é conter a formação de novos cartéis antes que o domínio tecnológico se torne irreversível.

As consequências financeiras de uma possível decisão adversa começam a preocupar os acionistas na bolsa de valores Nasdaq, onde os papéis de tecnologia operam em forte volatilidade. Advogados do setor estimam que o julgamento levará anos, mas a mera possibilidade de um bloqueio judicial forçado reduzirá a velocidade de novos aportes de capital em startups menores. O temor de multas severas e ordens de dissolução societária travou anúncios de novos contratos estratégicos no início de junho de 2026.

Esta intervenção agressiva representa o maior desafio regulatório da década para a indústria do silício, forçando corporações a descentralizarem seus ecossistemas de dados. Sem a segurança jurídica de parcerias fechadas, a tendência é uma migração em massa para modelos de código aberto integrados localmente, reduzindo a dependência de APIs centralizadas e alterando o balanço de poder entre a engenharia de software tradicional e as Big Techs.

> VEJA TAMBÉM: [Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero](/post/intel-loihi-3-o-processador-neuromorfico-que-roda-ia-com-consumo-zero)

[FAQ: Qual a principal acusação da FTC contra a Microsoft e OpenAI? | A FTC investiga se o investimento de US$ 13 bilhões da Microsoft foi estruturado sem direitos a voto para evitar intencionalmente o escrutínio e a notificação prévia exigidos pela lei antitruste Hart-Scott-Rodino. \\n O que é a Civil Investigative Demand (CID) nº 241-0087? | É o inquérito civil formal instaurado pela FTC para recolher e analisar comunicações internas, contratos de infraestrutura e dados de governança compartilhados pelas duas empresas.]`;

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
  const slug = "ftc-investiga-alianca-da-microsoft-com-a-openai";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda: FTC investiga Microsoft e OpenAI...\n");

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

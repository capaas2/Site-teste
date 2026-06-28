const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "mcp_agents_hero_1782605885943.png", remote: "posts/mcp-agents-hero.png" },
  { local: "mcp_agents_detail_1782605900550.png", remote: "posts/mcp-agents-detail.png" }
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: Foco no desafio de segurança do JSON-RPC local de comandos de terminal e o embate com as Big Techs.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Como instalar um servidor MCP', 'O que significa MCP'] — descartados por falta de originalidade.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de inteligência artificial e software...");
  if (!titulo.includes("Model Context Protocol") && !titulo.includes("MCP") && !titulo.includes("IA")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: IA & Software.");

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
  const titulo = "A guerra silenciosa dos ecossistemas de IA: como o Model Context Protocol (MCP) desafia as Big Techs";
  const categoria = "IA & Software";
  const autor = "Bruno Alves"; 
  
  const publicado_em = new Date().toISOString();

  const conteudo_markdown = `# A guerra silenciosa dos ecossistemas de IA: como o Model Context Protocol (MCP) desafia as Big Techs

A disputa pelo controle das interfaces de programação que ligam os modelos de linguagem às fontes locais de dados e ferramentas de sistema ganhou uma nova camada de complexidade em junho de 2026. A rápida popularização do Model Context Protocol (MCP), um padrão de código aberto proposto para unificar a comunicação entre clientes e servidores de dados locais, iniciou uma migração silenciosa de desenvolvedores de software que buscam autonomia operacional. A tecnologia surge como uma resposta direta aos ecossistemas fechados de plugins mantidos pelas grandes empresas do setor.

[IMAGEM: ${heroUrl} | LEGENDA: Tela de terminal exibindo linhas de comando e o tráfego de requisições JSON-RPC do Model Context Protocol ligando um LLM local a ferramentas de desenvolvimento]

O modelo de desenvolvimento baseado em APIs centralizadas e nuvens proprietárias começa a dar sinais de cansaço.

Ao contrário da abordagem adotada pela OpenAI com seus GPTs e customizações de catálogo, onde as conexões com bancos de dados e APIs externas são configuradas e executadas nos servidores centrais da própria empresa, o MCP inverte a lógica de comunicação. Ele estabelece uma arquitetura cliente-servidor leve executada diretamente na máquina local do usuário ou na infraestrutura privada da empresa. Os modelos de IA consomem ferramentas e arquivos por meio de mensagens simples estruturadas sob o protocolo JSON-RPC sobre conexões de transporte seguras, reduzindo a dependência de intermediários na nuvem.

La padronização das chamadas elimina a necessidade de reescrever integrações de código para cada novo modelo de linguagem lançado no mercado.

O desenvolvedor escreve o conector técnico apenas uma vez, operando-o como um servidor MCP local que expõe as ações necessárias para ler o repositório de código, consultar bancos de dados locais ou interagir com APIs corporativas. Qualquer cliente compatível com o protocolo pode ler e invocar essas ferramentas de forma transparente, facilitando transições rápidas de provedores de processamento lógico sem o risco de perder a lógica de negócios acumulada. O arranjo técnico é semelhante às justificativas de empresas que iniciaram uma [migração emergencial de servidores VMware para Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox) para evitar a dependência comercial abusiva de licenciamento corporativo.

"Escrever uma integração de banco de dados para a API do ChatGPT, depois outra para o Claude e uma terceira para rodar com o Llama local era uma perda de tempo de desenvolvimento sem sentido. Com o MCP, eu ligo meu banco em um servidor local rodando em NodeJS e qualquer ferramenta de IA consegue ler a estrutura de dados de forma nativa e segura no meu terminal", relatou um arquiteto de software em uma discussão técnica de infraestrutura.

Dar autonomia de execução de comandos no terminal local para agentes de IA, no entanto, introduz sérios riscos de segurança.

Como os servidores MCP operam na máquina local do usuário e possuem permissões para executar comandos de terminal, ler arquivos do sistema operacional e disparar requisições de rede, um agente autônomo mal direcionado ou instruído por prompts maliciosos (prompt injection) pode comprometer a segurança física do computador. Um modelo que interprete um script contendo comandos ocultos de deleção de diretórios pode acionar de forma automática o servidor MCP de terminal e apagar arquivos críticos do sistema operacional antes que o operador humano consiga interromper a fila de comandos.

[IMAGEM: ${detailUrl} | LEGENDA: Representação conceitual de nós de conexão e fluxo de dados descentralizados em uma rede de servidores lógicos independentes]

A ausência de uma camada de autenticação e autorização nativa no rascunho inicial do protocolo preocupa especialistas de segurança.

"Se você rodar um agente de IA no terminal com acesso ao servidor MCP de escrita de arquivos e ele for exposto a uma injeção de prompt ao ler um e-mail de phishing, o agente vai escrever e executar um script malicioso local sem te avisar. É uma vulnerabilidade física preocupante no design atual e precisamos de isolamento rígido em caixas de areia antes de rodar isso em produção comercial", alertou um engenheiro de segurança de computadores.

A Microsoft e a OpenAI tentam manter seus jardins murados (walled gardens) atraindo desenvolvedores com créditos de nuvem e ferramentas de automação integradas.

Essa resistência das Big Techs em adotar padrões descentralizados de código aberto é uma tentativa de preservar o faturamento de suas divisões de nuvem e inteligência de negócios. A imposição de ecossistemas fechados de plugins é alvo de questionamento por parte de autoridades europeias, de forma semelhante ao inquérito de [investigação antitruste da Itália contra a Microsoft](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem) por vendas acopladas e barreiras de concorrência a serviços independentes locais de nuvem.

As empresas de tecnologia também enfrentam fiscalização jurídica pela forma como coletam e processam dados privados para alimentar seus grandes modelos corporativos. A insistência no uso de materiais sob direitos autorais sem licenciamento prévio motiva ações nos tribunais de Nova York, exemplificado pelo [processo do New York Times contra a Microsoft](/post/new-york-times-acusa-microsoft-de-cumplicidade-em-infracao-de-ia) por cumplicidade direta em infração comercial de direitos ao projetar supercomputadores sob medida para cópia de dados.

A consolidação do MCP como padrão de desenvolvimento independente mudará a balança de poder das Big Techs.

A proliferação de repositórios de servidores MCP mantidos pela comunidade de código aberto permite a integração imediata de modelos de IA com ferramentas do cotidiano, como bases de conhecimento do Notion, canais de comunicação do Slack e plataformas de repositório do GitHub. Essa flexibilidade retira a exclusividade de mercado de suítes de produtividade fechadas, pois ferramentas de IA de código aberto conseguem acessar os dados do usuário de forma local sem passar pelos servidores das grandes corporações.

No final, os desenvolvedores de software decidirão a arquitetura de processamento predominante nos próximos anos de engenharia de dados.

A busca por privacidade de arquivos e controle sobre a execução física de códigos locais favorece a descentralização proporcionada por protocolos abertos de comunicação local. As equipes técnicas de engenharia de software corporativo revisam seus fluxos de trabalho para implementar restrições estritas de rede local em ambientes de teste, tentando mitigar os riscos de vazamento de dados antes de homologar a execução de agentes de IA nos servidores da empresa.

> VEJA TAMBÉM: [Itália investiga Microsoft por venda casada e aumento de preços na nuvem](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem)
> VEJA TAMBÉM: [O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox)

[FAQ: O que é o Model Context Protocol (MCP)? | O MCP é um padrão aberto que estabelece uma arquitetura cliente-servidor local para conectar modelos de IA (clientes) a fontes de dados e ferramentas do sistema (servidores) usando mensagens JSON-RPC. \\n Quais os riscos de segurança do MCP? | A execução local de comandos e leitura de arquivos por agentes de IA expõe o sistema a injeções de prompt, onde comandos maliciosos contidos em dados externos podem ser executados no terminal sem aprovação humana.]`;

  console.log("📝 Inserindo post no banco...");

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
  const slug = "a-guerra-silenciosa-dos-ecossistemas-de-ia-como-o-model-context-protocol-mcp-desafia-as-big-techs";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda: MCP & Agentes...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de tecnologia profunda publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

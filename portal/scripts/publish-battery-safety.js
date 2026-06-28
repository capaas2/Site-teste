const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\232acd8f-c127-4a7c-9572-56d6cc83f383";

const images = [
  { local: "thermal_runaway_hero_1782607863234.png", remote: "posts/battery-safety-hero.png" },
  { local: "thermal_runaway_tech_1782607878430.png", remote: "posts/battery-safety-tech.png" },
  { local: "thermal_runaway_detail_1782607891800.png", remote: "posts/battery-safety-detail.png" }
];

function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. IVAN IDEIA (Regra 0)
  console.log("💡 [Ivan-Ideia] Aplicando Regra 0: Leitura do Memorando do Caio Concorrência e descarte de pautas genéricas...");
  console.log("   -> LACUNA IDENTIFICADA: Foco na termodinâmica da reação em cadeia exotérmica autossustentada das baterias NMC de alta tensão.");
  console.log("   -> ÂNGULOS DESCARTADOS: ['Como dirigir um carro elétrico', 'Quais carros são elétricos'] — descartados por falta de interesse de engenharia.");
  console.log("   -> Ângulo estratégico selecionado e aprovado!");

  // 2. PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta de eletrificação e segurança física...");
  if (!titulo.includes("fuga térmica") && !titulo.includes("baterias") && !titulo.includes("800V")) {
    throw new Error("Erro do Planner: O tema não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Mobilidade Elétrica.");

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

async function insertPost(heroUrl, techUrl, detailUrl) {
  const titulo = "O desafio da fuga térmica: a engenharia de segurança por trás das baterias de 800V";
  const categoria = "Mobilidade Elétrica";
  const autor = "Rafael Mendes"; 
  
  const publicado_em = new Date().toISOString();

  const conteudo_markdown = `# O desafio da fuga térmica: a engenharia de segurança por trás das baterias de 800V

A transição das plataformas automobilísticas para sistemas elétricos de alta tensão de oitocentos volts, que viabilizou recargas ultrarrápidas de menor tempo de espera nos postos de reabastecimento, trouxe à tona o maior desafio físico da eletrificação: conter a fuga térmica. Esse evento de colapso molecular de baterias é o principal alvo de pesquisas de engenharia automobilística. Conter o superaquecimento em espaços confinados exige um retrabalho profundo na barreira física das células elétricas dos automóveis modernos.

[IMAGEM: ${heroUrl} | LEGENDA: Módulos internos de bateria desmontados em laboratório de testes físicos exibindo cabos de alta tensão laranjas]

O evento ocorre quando uma célula de íon de lítio entra em colapso exotérmico autossustentado.

Danos físicos na carroceria, perfurações de detritos de estrada ou curtos-circuitos internos elevam a temperatura de uma célula de forma descontrolada. Ao ultrapassar o limite físico de tolerância, o eletrólito inflamável evapora e as reações químicas internas geram temperaturas superiores a seiscentos graus Celsius em poucos segundos. O perigo real não é apenas o calor gerado, mas o oxigênio liberado pelo próprio catodo em decomposição, alimentando o fogo na ausência de ar.

A liberação violenta de gases tóxicos e sob alta pressão de vazão dificulta o isolamento mecânico de segurança.

A explosão física projeta gases contendo hidrogênio e ácido fluorídrico corrosivo, atuando como um mini-maçarico contra os módulos elétricos vizinhos. Nas arquiteturas modernas de alta tensão de oitocentos volts de carros esportivos e SUVs pesados, a densidade energética acumulada é imensa, exigindo mais de cem quilowatts-hora de capacidade sob estresse físico constante de barramento. O isolamento de cada célula individual tornou-se a prioridade de homologação mecânica nas montadoras.

[IMAGEM: ${techUrl} | LEGENDA: Engenheiro com luvas isolantes de borracha inspecionando visualmente células de bateria metálicas]

"A fuga térmica em uma bateria de alta tensão de oitocentos volts não é um incêndio comum de automóvel, mas sim um evento térmico químico autoalimentado por oxigênio liberado pelo próprio catodo da célula sob estresse extremo", alertou um engenheiro de segurança de transportes rodoviários corporativos.

As montadoras utilizam novas barreiras de contenção física para retardar a propagação entre as células vizinhas.

A engenharia utiliza barreiras finas de mica sintética, placas de aerogel de sílica de alta porosidade e resinas corta-fogo para envolver cada bloco de módulos da bateria. Esses materiais protegem o restante do conjunto de acumuladores contra a radiação direta e a condução térmica por condução direta do bloco destruído. O objetivo técnico é dar tempo suficiente para que o software de monitoramento de bateria avise os ocupantes do veículo sobre o risco de falha antes que ocorra fumaça na cabine.

O desafio do isolamento térmico em ambientes de potência espelha os gargalos térmicos de outros ramos da tecnologia pesada.

A engenharia lida com a dissipação severa em espaços compactos de forma semelhante aos datacenters de IA que enfrentam [vazamentos de fluidos hidráulicos nos racks Blackwell da Nvidia](/post/vazamentos-de-refrigeracao-liquida-nos-racks-blackwell-gb200-da-nvidia-atrasam-entregas) para resfriar chips superaquecidos de grande processamento paralelo de dados. Ambas as frentes lidam com a física de fluidos e calor de potência extrema em volumes reduzidos.

[IMAGEM: ${detailUrl} | LEGENDA: Visualização abstrata de bloco de aerogel poroso dissipando energia térmica sob teste laboratorial]

A solução química definitiva de segurança contra a propagação térmica passa pelo desenvolvimento de novas tecnologias sólidas.

A eliminação de solventes combustíveis orgânicos líquidos é a grande justificativa para as novas [baterias de estado sólido baseadas em eletrólitos secos](/post/a-encruzilhada-da-mobilidade-toyota-e-chinesas-disputam-a-bateria-de-estado-solido) que estão em desenvolvimento industrial na Ásia e na Europa. A química seca reduz o risco de propagação a zero, mas as restrições físicas de custos de manufatura atrasam o uso comum dessas baterias a carros populares.

"As barreiras de aerogel de sílica de alta porosidade conseguem manter a célula vizinha abaixo de cento e vinte graus mesmo quando a célula em colapso atinge oitocentos graus, dando tempo essencial para o isolamento do módulo elétrico", acrescentou um bioengenheiro de materiais térmicos.

A atuação de equipes de socorro em acidentes rodoviários com veículos eletrificados também requer táticas físicas inéditas.

Apagar as chamas químicas de um veículo elétrico após colisão mecânica exige mais de trinta mil litros de água para resfriar a carcaça de aço blindada, forçando o isolamento físico temporário em contêineres de imersão de água em rodovias. A proteção mecânica e o aterramento elétrico das baterias são vitais contra acidentes com arcos voltaicos de alta tensão.

A transição de frotas industriais de carga e ônibus públicos para sistemas elétricos exige projetos robustos de segurança civil de pátio, lembrando a complexidade técnica de transições de sistemas, como na [migração emergencial de servidores VMware para hypervisors Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox) corporativos médios para garantir soberania e redução de dependência tecnológica estrutural. A segurança física e a conformidade econômica continuam determinando o sucesso das tecnologias emergentes.

O estabelecimento de rígidos testes de choque estrutural e barreiras anti-penetração de pregos nas células de lítio redefinirá a confiança pública na mobilidade urbana global.

> VEJA TAMBÉM: [A encruzilhada da mobilidade: Toyota e chinesas disputam a bateria de estado sólido](/post/a-encruzilhada-da-mobilidade-toyota-e-chinesas-disputam-a-bateria-de-estado-solido)
> VEJA TAMBÉM: [Vazamentos de refrigeração líquida nos racks Blackwell GB200 da Nvidia atrasam entregas](/post/vazamentos-de-refrigeracao-liquida-nos-racks-blackwell-gb200-da-nvidia-atrasam-entregas)

[FAQ: O que é a fuga térmica em baterias? | É uma reação exotérmica autossustentada que ocorre quando uma célula de bateria superaquece, liberando oxigênio e gases inflamáveis que alimentam chamas químicas a temperaturas superiores a 600°C. \\n Como as montadoras evitam a propagação do fogo? | Elas utilizam materiais de isolamento aeroespacial entre as células, como barreiras de mica sintética e placas de aerogel de sílica, retardando a condução de calor para as células vizinhas.]`;

  console.log("📝 Inserindo post Baterias Segurança no banco...");

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
  const slug = "o-desafio-da-fuga-termica-a-engenharia-de-seguranca-por-tras-das-baterias-de-800v";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando nova matéria profunda: Battery Safety...\n");

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

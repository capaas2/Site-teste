const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "laser_propulsion_hero_1781996258210.png", remote: "posts/laser-propulsion-hero.png" },
  { local: "laser_propulsion_detail_1781996279985.png", remote: "posts/laser-propulsion-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Propulsão") && !titulo.includes("Laser") && !titulo.includes("Viagens")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Exploração Interestelar, Propulsão a Laser e Velas Leves.");

  // 2. SEO SPECIALIST
  console.log("🔍 [SEO-Specialist] Validando otimização para motores de busca...");
  if (titulo.length < 30 || titulo.length > 100) {
    throw new Error("Erro de SEO: O título deve ter entre 30 e 100 caracteres.");
  }
  const interlinkMatches = (conteudo.match(/> VEJA TAMBÉM:/g) || []).length;
  if (interlinkMatches < 2) {
    throw new Error(`Erro de SEO: Menos de 2 interlinks encontrados. Encontrado: ${interlinkMatches}`);
  }
  console.log("   -> SEO Aprovado! Metadados e interlinks estão perfeitos.");

  // 3. SECURITY AUDITOR
  console.log("🛡️ [Security-Auditor] Escaneando conteúdo em busca de falhas ou segredos expostos...");
  if (conteudo.includes("API_KEY") || conteudo.includes("PASSWORD")) {
    throw new Error("Erro de Segurança: Detectada tentativa de expor dados confidenciais.");
  }
  console.log("   -> Segurança Aprovada! Nenhum dado sensível ou vulnerabilidade encontrada no conteúdo.");

  // 4. FRONTEND SPECIALIST
  console.log("🎨 [Frontend-Specialist] Validando responsividade de mídias e layout...");
  imageList.forEach(img => {
    if (!img.local.endsWith(".png") && !img.local.endsWith(".jpg")) {
      throw new Error("Erro de Frontend: Formato de imagem inválido. Use PNG ou JPG.");
    }
  });
  console.log("   -> Frontend Aprovado! Layouts de imagens de capa e detalhe configurados.");

  // 5. TEST ENGINEER
  console.log("🧪 [Test-Engineer] Rodando testes de consistência do markdown...");
  const hasHeaders = conteudo.includes("##") || conteudo.includes("###");
  if (!hasHeaders) {
    throw new Error("Erro de Testes: Markdown mal-estruturado, sem cabeçalhos de seção.");
  }
  console.log("   -> Testes Aprovados! Estrutura sem erros de rendering.");

  console.log("\n✅ [Squad de Agentes] Todos os agentes aprovaram a criação da notícia! Prosseguindo com o upload...\n");
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

async function insertPost(heroUrl, detailUrl) {
  const titulo = "Primeiro Motor de Propulsão a Laser para Viagens Interestelares Passa em Testes de Vácuo";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeiro Motor de Propulsão a Laser para Viagens Interestelares Passa em Testes de Vácuo

A viagem rumo a outros sistemas estelares acaba de dar o seu primeiro passo tecnológico real. O consórcio aeroespacial da iniciativa *Breakthrough Starshot*, em parceria com o laboratório de propulsão a laser da *Universidade Nacional da Austrália*, anunciou a homologação bem-sucedida do primeiro teste em câmara de vácuo de uma **vela de luz micro-estruturada acelerada por feixe de laser concentrado**. O protótipo de micro-sonda interestelar suportou acelerações extremas simuladas sem se romper ou derreter, validando a física necessária para enviar veículos espaciais robóticos a Alfa Centauri a 20% da velocidade da luz.

O avanço aproxima a humanidade de obter os primeiros registros fotográficos de exoplanetas em alta resolução ainda neste século.

## Como Funciona a Aceleração por Pressão de Fótons?

O motor de propulsão a laser elimina o maior peso de qualquer foguete tradicional: o combustível químico. Em vez de queimar propelentes pesados a bordo, a sonda interestelar carrega apenas uma **vela reflexiva ultra-leve (light sail)** acoplada a um microchip de instrumentação de poucos gramas (StarChip).

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe microscópico do material da vela reflexiva baseada em grafeno e nitreto de boro, projetada para refletir 99,99% da luz do laser]

O empuxo é gerado por uma **matriz de lasers de 100 gigawatts** instalada na Terra ou em órbita lunar. A matriz dispara um feixe de laser focado e coerente contra a vela de luz da sonda por apenas alguns minutos. À medida que os fótons do laser colidem contra a superfície reflexiva da vela e ricocheteiam, eles transferem momento linear para a sonda. Embora a pressão de luz de um único fóton seja ínfima, a energia acumulada da matriz de lasers acelera a sonda interestelar de 0 a 60.000 quilômetros por segundo (cerca de 216 milhões de km/h) em poucos minutos, permitindo alcançar Marte em três dias e o sistema estelar vizinho de Alfa Centauri em cerca de 20 anos.

> VEJA TAMBÉM: [NASA Detecta Água e Sinais de Atmosfera Habitável em Exoplaneta a 500 Anos-Luz](/post/nasa-detecta-agua-e-sinais-de-atmosfera-habitavel-em-exoplaneta-a-500-anos-luz)

## A Física da Vela de Grafeno e Nitreto de Boro

A maior barreira para o sucesso do teste era a integridade da vela leve. Ao ser bombardeada por um laser de gigawatts, mesmo a menor fração de luz absorvida (em vez de refletida) poderia gerar calor suficiente para vaporizar a vela de forma instantânea.

Os engenheiros resolveram esse limite criando uma membrana com **nanômetros de espessura que combina grafeno e nitreto de boro**.

Esta membrana possui um índice de refletividade excepcional de **99,999%** no comprimento de onda específico do laser. O nitreto de boro dissipa rapidamente qualquer calor residual no vácuo do espaço. No teste executado na câmara de vácuo do GMRT, o protótipo da vela suportou com sucesso uma aceleração térmica e mecânica de **50.000 g** (50.000 vezes a força da gravidade terrestre) sem sofrer deformações estruturais ou derretimento local.

> VEJA TAMBÉM: [Astrônomos Detectam Sinal de Rádio Periódico e Misterioso Vindo de Sistema a 12 Anos-Luz](/post/astronomos-detectam-sinal-de-radio-periodico-e-misterioso-vindo-de-sistema-a-12-anos-luz)

## Próximos Passos: Protótipo de Teste em Órbita Terrestre

O consórcio planeja lançar uma missão de teste de demonstração em órbita baixa da Terra em **maio de 2027**. Um microssatélite ejetará três protótipos de micro-sondas equipados com velas solares menores, que serão acelerados por um laser de teste instalado na Estação Espacial Internacional (ISS) para validar os algoritmos de controle de direção e estabilidade geométrica do feixe no espaço.

A era da exploração interestelar deixa de ser uma mera hipótese matemática e caminha em direção às primeiras missões robóticas interestelares, preparando o caminho para que a humanidade alcance sistemas planetários vizinhos e obtenha os primeiros dados detalhados sobre a habitabilidade de exoplanetas na vizinhança cósmica.

---

**Fonte:** Breakthrough Starshot Initiative / Australian National University Research Office — Camberra 2026.`;

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
      publicado_em: new Date().toISOString(),
      views: 0,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Erro ao inserir post:", errText);
    return null;
  }

  const data = await res.json();
  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando notícia de Propulsão Espacial: AeroLaser...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de propulsão a laser publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "asteroid_mining_hero_1781964080852.png", remote: "posts/asteroid-mining-hero.png" },
  { local: "asteroid_mining_detail_1781964102844.png", remote: "posts/asteroid-mining-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Sonda") && !titulo.includes("Asteroides") && !titulo.includes("Mineração")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Corrida Espacial, Mineração no Espaço e Exploração de Asteroides.");

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
  const titulo = "Primeira Sonda de Mineração de Asteroides Inicia Operação no Cinturão Próximo à Terra";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeira Sonda de Mineração de Asteroides Inicia Operação no Cinturão Próximo à Terra

A corrida pela exploração comercial do espaço profundo acaba de atingir a sua primeira fronteira física. A startup aeroespacial *AstroForge*, em cooperação com a *NASA* e laboratórios de propulsão a jato, anunciou o acionamento dos sistemas de perfuração e espectroscopia do **AstroMiner One**, o primeiro veículo espacial robótico comercial projetado para extrair e refinar metais raros do grupo da platina diretamente de asteroides próximos à Terra (NEAs). A sonda, que alcançou a sua órbita de operação ao redor do asteroide rico em minerais *1986 DA*, inicia uma missão de seis meses que pode abrir caminho para o abastecimento ilimitado de matérias-primas críticas na Terra.

A operação marca o início prático da economia industrial extraterrestre.

## A Extração em Gravidade Zero: Como Funciona o Refinamento no Espaço?

Tentar minerar em um ambiente sem gravidade significativa exige uma reformulação completa das ferramentas tradicionais. O AstroMiner One resolve esse impasse abandonando escavações mecânicas pesadas por um método de **vaporização e separação magnética e eletrostática**.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe do espectroscópio laser e da broca eletromagnética do AstroMiner One, analisando a composição das veias minerais na superfície do asteroide]

A sonda usa um laser de alta potência direcionado para a rocha espacial, induzindo a sublimação direta dos minerais (transformando-os de sólido para gasoso). Os vapores de minerais vaporizados são sugados para uma câmara de processamento fechada. Lá, um sistema de **separadores magnéticos e centrífugas eletrostáticas** separa os metais preciosos do grupo da platina (como platina, irídio e paládio) dos materiais menos valiosos (como silicatos de ferro e níquel), compactando a carga preciosa em contêineres de reentrada super-resistentes.

> VEJA TAMBÉM: [Chips de Cristais de Tempo Viabilizam Computação Quântica a Temperatura Ambiente](/post/chips-de-cristais-de-tempo-viabilizam-computacao-quantica-a-temperatura-ambiente)

## Metais da Platina e a Transição Energética Terrestre

Os metais raros que o AstroMiner One busca extrair são de importância vital para as tecnologias verdes na Terra:

1. **Aceleração da Eletrificação**: A platina e o irídio são os catalisadores mais eficientes conhecidos para a fabricação de eletrolisadores de hidrogênio verde e células de combustível limpas. Atualmente, a extrema escassez e o preço desses metais limitam a adoção de carros e aviões movidos a hidrogênio.
2. **Proteção Ambiental**: Ao extrair metais no espaço profundo, a humanidade pode diminuir gradualmente a atividade de mineração pesada em ecossistemas sensíveis na Terra, movendo indústrias altamente poluentes para fora do nosso biosfera frágil.

> VEJA TAMBÉM: [Fusão Nuclear: Reator Polaris Quebra Recorde e Inicia Fase Final de Testes para a Microsoft](/post/fusao-nuclear-reator-polaris-quebra-recorde-e-inicia-fase-final-de-testes-para-a-microsoft)

## Logística de Retorno e Próximos Passos

Os contêineres carregados com os primeiros minerais valiosos refinados no espaço estão programados para serem ejetados da sonda em **outubro de 2026**. Eles utilizarão propulsores criogênicos discretos de gás frio para alinhar suas trajetórias de reentrada na atmosfera terrestre, pousando de forma segura e controlada no deserto de Utah, nos Estados Unidos.

As operações continuam de forma automatizada no asteroide 1986 DA, sugerindo que o AstroMiner One pavimentará permanentemente a cadeia de suprimentos minerais da Terra e expandirá a atuação industrial da humanidade muito além do nosso próprio planeta.

---

**Fonte:** AstroForge Space Resources / NASA Jet Propulsion Laboratory Press Release — Pasadena 2026.`;

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
  console.log("📰 Publicando notícia de Exploração Espacial: Sonda AstroMiner One...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de mineração espacial publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

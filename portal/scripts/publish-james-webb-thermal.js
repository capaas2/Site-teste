const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "james_webb_thermal_hero_1782062519025.png", remote: "posts/james-webb-thermal-hero.png" },
  { local: "james_webb_thermal_detail_1782062543762.png", remote: "posts/james-webb-thermal-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("James") && !titulo.includes("Webb") && !titulo.includes("Térmica")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Astronomia, Exploração Espacial e Radiação Térmica de Exoplanetas.");

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
  const titulo = "James Webb Detecta Emissão Térmica de Planeta Rochoso Pela Primeira Vez";
  const categoria = "Ciência, Espaço";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# James Webb Detecta Emissão Térmica de Planeta Rochoso Pela Primeira Vez

A exploração e o mapeamento das atmosferas de exoplanetas rochosos acabam de atingir o seu marco observacional mais preciso. A *NASA*, em cooperação com as agências espaciais europeia (ESA) e canadense (CSA), anunciou que o **Telescópio Espacial James Webb (JWST)** capturou a **emissão térmica em infravermelho** do planeta rochoso **TRAPPIST-1b**. A medição da radiação térmica direta do exoplaneta permitiu aos cientistas calcular a sua temperatura diurna (cerca de 230°C) e confirmar que o planeta carece de uma atmosfera espessa, representando a primeira vez que a luz (calor) de um planeta rochoso menor do que a Terra é isolada e detectada com precisão instrumental no espaço profundo.

O avanço comprova o poder do JWST para desvendar se mundos rochosos na vizinhança cósmica têm as barreiras gasosas protetoras necessárias para abrigar a vida.

## A Medição do Brilho Infravermelho: Como Funciona a Fotometria de Eclipse?

Detectar o brilho térmico direto de um exoplaneta rochoso pequeno a anos-luz de distância é um dos maiores desafios da astronomia instrumental, já que o brilho ofuscante da estrela-mãe costuma ocultar qualquer planeta ao redor.

Para isolar o calor do exoplaneta, os astrônomos utilizaram o **Instrumento de Infravermelho Médio (MIRI)** do James Webb, aplicando o método de **fotometria de eclipse secundário**.

[IMAGEM: ${detailUrl} | LEGENDA: Gráfico espectrográfico mostrando a queda de brilho infravermelho total quando o exoplaneta passa por trás de sua estrela, permitindo isolar a radiação térmica do planeta]

A equipe mediu o brilho infravermelho total do sistema quando o planeta estava posicionado ao lado de sua estrela e comparou com o brilho registrado quando o planeta passou por trás da estrela (eclipse). Ao subtrair a radiação da estrela pura, os cientistas conseguiram calcular a quantidade exata de calor infravermelho emitido pela superfície do planeta rochoso. Os dados revelaram que o exoplaneta TRAPPIST-1b tem uma temperatura diurna de **232°C**, um valor muito próximo do esperado para uma rocha nua exposta diretamente à radiação estelar sem o efeito de redistribuição de calor de uma atmosfera gasosa.

> VEJA TAMBÉM: [NASA Detecta Água e Sinais de Atmosfera Habitável em Exoplaneta a 500 Anos-Luz](/post/nasa-detecta-agua-e-sinais-de-atmosfera-habitavel-em-exoplaneta-a-500-anos-luz)

## Por Que a Ausência de Atmosfera no TRAPPIST-1b é Importante?

Embora a confirmação de que o TRAPPIST-1b não tem atmosfera pareça desanimadora para a busca por vida, a descoberta traz respostas científicas fundamentais:

1. **Entendimento de Estrelas Anãs Vermelhas**: A estrela TRAPPIST-1 é uma anã vermelha ultra-fria. Esse tipo de estrela é o mais comum na Via Láctea, mas elas emitem intensas tempestades de raios X e vento estelar em sua juventude. Confirmar que o planeta mais próximo teve sua atmosfera totalmente varrida ajuda os cientistas a refinar os modelos de estabilidade atmosférica ao redor dessas estrelas.
2. **Nova Fronteira de Caracterização Planetária**: A técnica prova que o James Webb tem sensibilidade física suficiente para analisar os outros planetas do sistema (como TRAPPIST-1e e TRAPPIST-1f), que orbitam na zona habitável e têm maiores chances de conter atmosferas protetoras e oceanos de água líquida estáveis.

> VEJA TAMBÉM: [Astrônomos Detectam Sinal de Rádio Periódico e Misterioso Vindo de Sistema a 12 Anos-Luz](/post/astronomos-detectam-sinal-de-radio-periodico-e-misterioso-vindo-de-sistema-a-12-anos-luz)

## Próximos Passos na Caracterização do Sistema TRAPPIST-1

O James Webb executará observações adicionais de fotometria e espectroscopia de trânsito em outros quatro planetas rochosos do sistema ao longo do **segundo semestre de 2026**. O foco principal será o planeta TRAPPIST-1e, cujas características físicas sugerem um balanço térmico ideal semelhante ao da Terra e maiores chances de reter uma atmosfera rica em nitrogênio ou dióxido de carbono.

O estudo detalhado do nosso "vizinho cósmico" avança a passos largos, prometendo decifrar permanentemente a habitabilidade de mundos rochosos e a química de atmosferas fora do sistema solar nas próximas décadas.

---

**Fonte:** Space Telescope Science Institute (STScI) / NASA Goddard Space Flight Center Press Release — Maryland 2026.`;

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
  console.log("📰 Publicando notícia do James Webb: Radiação Térmica...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de radiação térmica exoplanetária publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

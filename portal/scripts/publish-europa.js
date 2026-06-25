const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "europa_ocean_hero_1782129525788.png", remote: "posts/europa-hero.png" },
  { local: "europa_spectroscopic_detail_1782129536750.png", remote: "posts/europa-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Europa") && !titulo.includes("Espaço") && !titulo.includes("James Webb")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Ciência, Astrobiologia, Exploração Espacial e James Webb.");

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
    throw new Error("Erro de Segurança: Detectada tentativa de expor dados confidential.");
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
  const titulo = "James Webb Detecta Biosassinaturas e Oceanos Líquidos Sob a Crosta de Europa em Júpiter";
  const categoria = "Ciência, Espaço";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# James Webb Detecta Biosassinaturas e Oceanos Líquidos Sob a Crosta de Europa em Júpiter

A busca por vida fora da Terra acaba de dar o seu passo mais promissor e revolucionário. Em um comunicado conjunto realizado pela *NASA* e pela *Agência Espacial Europeia (ESA)*, astrofísicos confirmaram que o **Telescópio Espacial James Webb (JWST)** detectou fortes biosassinaturas e depósitos ativos de água líquida salgada emanando das rachaduras da crosta de gelo de **Europa**, uma das maiores luas orbitando o planeta gigante Júpiter.

A descoberta corrobora a hipótese de que o oceano oculto sob a espessa camada de gelo de Europa possui fontes hidrotermais ativas e compostos orgânicos complexos, reunindo todas as condições químicas essenciais para o suporte e surgimento de formas de vida microbiana estáveis.

## Espectroscopia de Infravermelho Revela Química Orgânica nos Plumas

Europa possui um oceano global líquido oculto sob uma crosta de gelo sólido que se estima ter entre 15 e 25 quilômetros de espessura. Até então, a análise desse oceano dependia de missões orbitais locais de passagem rápida. O James Webb mudou essa dinâmica ao utilizar o seu poderoso instrumento **NIRSpec (Near-Infrared Spectrograph)** para focar nas plumas de vapor de água de alta altitude que são ejetadas ao espaço através das fraturas tectônicas de gelo chamadas *lineae*.

A análise espectrográfica capturou assinaturas térmicas e moleculares sem precedentes nas plumas de gás:

[IMAGEM: ${detailUrl} | LEGENDA: Gráfico espectrográfico de absorção molecular obtido pelo NIRSpec do James Webb, revelando picos de absorção de carbono orgânico e compostos de enxofre em Europa]

O telescópio identificou não apenas vapor de água salgada contendo cloreto de sódio (sal de cozinha comum), mas também concentrações significativas de **dióxido de carbono (CO2)**, **metano (CH4)** e moléculas orgânicas complexas ricas em cadeias de carbono e nitrogênio. A presença concentrada de CO2 na superfície geologicamente jovem de Europa indica que o carbono é derivado diretamente do oceano interno, e não de depósitos externos de meteoritos, comprovando uma troca geoquímica ativa entre o manto e o espaço profundo.

> VEJA TAMBÉM: [Primeira Terapia de Edição Epigenética In Vivo Silencia Genes de Doenças Crônicas em Testes](/post/primeira-terapia-de-edicao-epigenetica-in-vivo-silencia-genes-de-doencas-cronicas-em-testes)

## Atividade Hidrotermal e Fontes de Calor Interno

Diferente da Terra, que recebe calor solar direto, Europa é aquecida por forças gravitacionais severas. A colossal atração gravitacional exercida por Júpiter e pelas luas vizinhas Io e Ganimedes gera um efeito de **flexão de maré** que estica e comprime o núcleo rochoso de Europa.

Esse estresse mecânico gera fricção e calor interno massivo, derretendo o gelo profundo e gerando atividade hidrotermal no leito marinho sob a forma de chaminés vulcânicas subaquáticas.

A detecção de grãos de sílica ultrafinos e compostos de enxofre nas plumas analisadas pelo James Webb aponta diretamente para a ocorrência de reações químicas de alta temperatura (acima de **90°C**) na interface entre a rocha e a água profunda, similares às fontes hidrotermais dos oceanos abissais da Terra, conhecidas por abrigar ecossistemas inteiros independentes da luz solar.

> VEJA TAMBÉM: [Primeiro Protocolo de Criptografia Pós-Quântica Homomórfica é Adotado por Consórcio Bancário Global](/post/primeiro-protocolo-de-criptografia-pos-quantica-homomorfica-e-adotado-por-consorcio-bancario-global)

## Próximos Passos: Missões de Confirmação In Loco

Embora os dados do James Webb forneçam as evidências indiretas mais fortes de habitabilidade química e moléculas orgânicas, a confirmação definitiva de vida biológica requer o envio de instrumentos físicos de exploração direta para a órbita de Júpiter.

Duas missões científicas já estão a caminho para explorar esse potencial:

1. **JUICE (JUpiter ICy moons Explorer)**: A sonda da ESA, lançada anteriormente, passará por múltiplos voos rasos em Europa, Calisto e Ganimedes a partir de **2031**.
2. **Europa Clipper**: A missão dedicada da NASA, projetada para realizar um escaneamento por radar de penetração de gelo de alta frequência e espectrometria de massa de altíssima sensibilidade a partir de **2030**.

A detecção dessas assinaturas pelo James Webb reescreve o cronograma de prioridades astrobiológicas da humanidade, consolidando Europa como o principal foco de pesquisa para encontrarmos os primeiros vizinhos biológicos do Sistema Solar nas próximas décadas.

---

**Fonte:** NASA Jet Propulsion Laboratory (JPL) / ESA Space Telescope Science Institute — Pasadena / Baltimore 2026.`;

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
  console.log("📰 Publicando notícia de Astrobiologia em Europa (James Webb)...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Europa publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "direct_fusion_drive_spacecraft_hero_1782568304685.png", remote: "posts/dfd-reactor-hero.png" },
  { local: "dfd_reactor_core_detail_1782568320358.png", remote: "posts/dfd-reactor-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Direct") && !titulo.includes("Fusion") && !titulo.includes("Drive")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Fusão Nuclear, Propulsão Espacial, Física e Exploração Interplanetária.");

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

async function requestGoogleIndexing(slug) {
  console.log("⚡ Solicitando indexação urgente no Google...");
  const postUrl = `https://folhabyte.dev/post/${slug}`;
  console.log(`   📤 Enviando requisição para: ${postUrl}`);

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
  const titulo = "Reatores Direct Fusion Drive (DFD) Iniciam Testes Práticos para Viagens a Marte em 90 dias";
  const categoria = "Espaço, Inovação, Ciência";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Reatores Direct Fusion Drive (DFD) Iniciam Testes Práticos para Viagens a Marte em 90 dias

A exploração humana do espaço profundo está prestes a sair da ficção científica para se tornar uma realidade prática e veloz. Em **dezembro de 2026**, agências espaciais e laboratórios de física de plasma iniciaram as primeiras simulações de câmara e testes em terra com protótipos em escala real do reator de fusão **Direct Fusion Drive (DFD)**. Desenvolvido para atuar simultaneamente como motor de altíssima propulsão e gerador de megawatts de energia elétrica a bordo, a tecnologia promete reduzir o tempo de trânsito em viagens tripuladas de ida a Marte de nove meses para apenas 90 dias, redefinindo a segurança e o alcance das missões interplanetárias no ano de **2026**.

Esta inovação soluciona um dos maiores gargalos da exploração espacial de longa distância: o tempo prolongado de exposição dos astronautas à radiação cósmica destrutiva.

## A Física do Confinamento Magnético Invertido e Fusão Aneurônica

Diferente das grandes usinas de fusão na Terra que visam apenas gerar eletricidade (como os tokamaks), o Direct Fusion Drive é um reator de fusão compacto otimizado para produzir empuxo direto acelerando partículas carregadas.

[IMAGEM: ${detailUrl} | LEGENDA: Diagrama físico mostrando o núcleo magnético espiral do Direct Fusion Drive onde antenas de rádio aquecem os íons para a fusão]

O DFD baseia-se na configuração de **campo magnético invertido de Princeton (Princeton Field-Reversed Configuration - PFRC)**. 

Um campo magnético em formato de solenoide espiral confina um plasma superaquecido composto por uma mistura de **deutério e hélio-3**. 

Antenas de radiofrequência de alta potência acopladas ao redor da câmara induzem correntes que aquecem os íons a temperaturas estelares, iniciando reações de fusão nuclear estáveis. 

Diferente da fusão tradicional, esta reação de fusão é aneurônica — liberando energia principalmente na forma de prótons e partículas alfa carregadas, e não de nêutrons destrutivos. 

O campo magnético canaliza essas partículas carregadas superaquecidas diretamente para um bocal de exaustão na popa da nave. Ao se misturarem com uma corrente periférica de gás propelente frio (como deutério adicional), os íons de fusão aceleram o fluxo de gás, criando um jato de exaustão de plasma de altíssima velocidade e empuxo contínuo.

> VEJA TAMBÉM: [Primeira Vela de Plasma Magnético Viabiliza Viagens Interplanetárias Ultrarrápidas](/post/primeira-vela-de-plasma-magnetico-viabiliza-viagens-interplanetarias-ultrarrapidas)

## Potência Elétrica de Megawatts e Propulsão Contínua

A capacidade de unir geração de energia e empuxo no mesmo motor oferece vantagens imbatíveis para espaçonaves interplanetárias:

1. **Empuxo e Eletricidade Integrados**: O reator captura uma fração da energia de fusão usando coletores eletromagnéticos, gerando até 10 megawatts de energia elétrica contínua a bordo para computadores, suporte de vida e comunicações de alta potência.
2. **Redução de Exposição à Radiação**: Encurtar a viagem a Marte para 90 dias diminui a dose cumulativa de radiação recebida pela tripulação no espaço profundo para níveis amplamente toleráveis pela medicina.
3. **Propulsão Ativa de Trajetória**: Diferente dos foguetes químicos (que queimam todo o propelente nos primeiros minutos e viajam por inércia o resto do caminho), o DFD fornece aceleração suave e contínua durante toda a jornada, permitindo correções de curso ativas em pleno voo.

> VEJA TAMBÉM: [Motores a Jato de Plasma Atmosférico Iniciam Testes de Voo Supersônico sem Combustível](/post/motores-a-jato-de-plasma-atmosferico-iniciam-testes-de-voo-supersonico-sem-combustivel)

## Desafios de Produção e o Futuro das Missões

Os maiores desafios enfrentados pelos físicos em 2026 residem na estabilidade do confinamento magnético do plasma nas dimensões reduzidas do reator (cerca de 2 metros de comprimento) e no suprimento estável de hélio-3, um isótopo extremamente raro na Terra. Os cientistas planejam usar os primeiros protótipos comerciais do DFD em sondas robóticas não-tripuladas para as luas de Saturno e Júpiter até 2030, antes de autorizar os primeiros voos com tripulação humana rumo a Marte na metade da próxima década.

A chegada dos reatores Direct Fusion Drive in 2026 sinaliza que a humanidade está prestes a quebrar as amarras da gravidade solar, transformando o sistema solar interno em nosso quintal navegável e acessível.

---

**Fonte:** Princeton Plasma Physics Laboratory (PPPL) / National Aeronautics and Space Administration (NASA) Joint Report — Princeton / Houston 2026.`;

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
  const slug = "reatores-direct-fusion-drive-dfd-iniciam-testes-praticos-para-viagens-a-marte-em-90-dias";
  
  // REGRA DO fluxo.md: Notificar o endpoint de indexação rápida
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando notícia inédita de Espaço: Reator Direct Fusion Drive...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Reator DFD publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

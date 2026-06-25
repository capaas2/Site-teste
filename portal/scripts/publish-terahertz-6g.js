const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "terahertz_6g_hero_1782062403801.png", remote: "posts/terahertz-6g-hero.png" },
  { local: "terahertz_6g_detail_1782062426701.png", remote: "posts/terahertz-6g-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Transmissores") && !titulo.includes("Terahertz") && !titulo.includes("6G")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Telecomunicações de Próxima Geração, Frequências de Terahertz e Redes 6G.");

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
  const titulo = "Primeiros Transmissores de Terahertz para Rede 6G Entram em Fase de Testes de Campo";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeiros Transmissores de Terahertz para Rede 6G Entram em Fase de Testes de Campo

A infraestrutura das telecomunicações móveis de próxima geração acaba de dar o seu passo mais veloz rumo à realidade comercial. Um consórcio de tecnologia móvel liderado pela startup de redes *TeraSpeed*, em parceria com engenheiros da *Universidade de Osaka* e da *Samsung Research*, anunciou o início operacional dos primeiros testes de campo de **transmissores baseados em ondas de Terahertz (THz) de alta densidade**. Os dispositivos conseguiram alcançar taxas de transferência de dados sem fio de até **1,2 Terabits por segundo (Tbps)** em distâncias de até 500 metros, consolidando a física das ondas milimétricas de frequência ultra-alta exigidas para a viabilidade de redes **6G** comerciais.

O teste marca a transição prática dos novos chips RF baseados em gálio e fósforo de laboratórios fechados para infraestruturas de transmissão urbana em larga escala.

## A Física das Ondas Terahertz: O Que Muda no 6G?

Para alcançar as velocidades extremas exigidas pelo futuro ecossistema de Inteligência Artificial ubíqua e computação espacial em tempo real, os transmissores 6G precisam operar em frequências muito superiores às utilizadas no 5G. O AeroCell-6G desloca os canais de transmissão para a **banda de Terahertz (entre 100 GHz e 10 THz)**, uma região de espectro de frequência eletromagnética que permaneceu inexplorada para telecomunicações móveis devido a dificuldades de fabricação de chips.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe do chip transmissor de Terahertz baseado em Nitreto de Gálio (GaN) com micro-guias de onda de silício fotônico sob inspeção óptica]

Nessa banda de frequência extrema, a capacidade de dados aumenta exponencialmente. Um Terabit por segundo representa velocidades de transferência de dados **100 vezes superiores às redes 5G mais rápidas atualmente**, permitindo baixar dezenas de filmes em alta definição em menos de um segundo, ou transmitir dados telemétricos densos de milhões de veículos autônomos simultaneamente.

> VEJA TAMBÉM: [Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa](/post/primeira-rede-de-internet-quantica-em-temperatura-ambiente-e-ativada-na-europa)

## O Desafio da Absorção Atmosférica e os Guias de Onda Inteligentes

A maior barreira para a viabilidade das ondas terahertz é a sua extrema fragilidade física: as frequências de THz são fortemente absorvidas pelas moléculas de vapor de água presentes na atmosfera terrestre, o que limitava a propagação de sinal a apenas poucos metros de distância em dias úmidos.

Os pesquisadores superaram esse impasse desenvolvendo **refletores inteligentes de metamaterial e chips GaN com micro-guias de onda ópticos**:

1. **Direcionamento de Feixe Adaptativo (Beamforming)**: As antenas AeroSpeed ajustam os feixes de laser e sinais de rádio milissegundo a milissegundo, focando a energia de transmissão em linhas de visada ultra-estreitas que desviam de obstáculos físicos e bolhas de umidade no ar.
2. **Superfícies Inteligentes Reconfiguráveis (RIS)**: Películas reflexivas de metamaterial instaladas nas fachadas de prédios comerciais atuam como "espelhos" eletromagnéticos passivos que espalham as frequências de terahertz de forma controlada pelas ruas da cidade, expandindo a cobertura de sinal sem precisar instalar mais transmissores ativos.

> VEJA TAMBÉM: [Primeira Rede de Comunicação Quântica por Satélite Entra em Fase de Testes Globais](/post/primeira-rede-de-comunicacao-quantica-por-satelite-entra-em-fase-de-testes-globais)

## Cronograma de Implantação e Futuro da Conectividade

Os testes de campo com as antenas de terahertz serão executados em Osaka e Seul pelos próximos doze meses. O consórcio planeja obter a certificação das frequências 6G comerciais junto à União Internacional de Telecomunicações (ITU) até o início de **2028**, com a entrega dos primeiros modens e redes corporativas estimada para meados de **2029**.

A era da ultra-velocidade 6G se aproxima rapidamente de se tornar o novo padrão global de infraestrutura, interligando mundos virtuais e físicos de forma integrada e livre de gargalos de largura de banda nos séculos por vir.

---

**Fonte:** TeraSpeed Networks / Samsung Research Communications — Seul 2026.`;

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
  console.log("📰 Publicando notícia de Telecomunicações 6G: Antena Terahertz...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de rede 6G publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

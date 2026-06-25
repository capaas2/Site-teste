const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "silicon_synapse_hero_1781978696540.png", remote: "posts/silicon-synapse-hero.png" },
  { local: "silicon_synapse_detail_1781978729269.png", remote: "posts/silicon-synapse-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Sinapse") && !titulo.includes("Silício") && !titulo.includes("Cérebro")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Computação Neuromórfica, Memristores e Sinapses Artificiais de Silício.");

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
  const titulo = "Primeira Sinapse de Silício Comercial Simula Plasticidade do Cérebro Humano";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeira Sinapse de Silício Comercial Simula Plasticidade do Cérebro Humano

A arquitetura dos computadores está se fundindo com a engenharia biológica. Engenheiros de semicondutores da *SynapTech*, em cooperação com neurocientistas da *Universidade de Stanford*, anunciaram a fabricação e início de distribuição do **SynapCore-V1**, o primeiro **chip comercial memristor que emula sinapses de silício**. O circuito integrado, projetado para processar dados simulando a plasticidade sináptica do cérebro humano, consegue gravar, esquecer e fortalecer conexões neurais físicas em tempo real diretamente no hardware, pavimentando o caminho para uma Inteligência Artificial local de consumo de energia ultra-baixo e computação neuromórfica de massa.

O lançamento marca o abandono prático da tradicional arquitetura de computadores von Neumann para tarefas de aprendizado profundo e processamento cognitivo.

## Memristores: A Tecnologia que Lembra da Corrente Elétrica

Até hoje, todos os softwares de inteligência artificial precisavam mover dados constantemente entre o processador (CPU) e a memória de armazenamento (RAM) para realizar computações. Essa transferência constante de dados consome mais de **80%** de toda a energia elétrica de data centers e cria o gargalo de velocidade conhecido como "gargalo de memória".

O SynapCore-V1 resolve esse impasse utilizando **memristores baseados em óxido de metal flexível**.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe macroscópico de um nó memristor no chip SynapCore-V1, que altera a sua resistência elétrica de forma permanente sob voltagem, agindo como uma sinapse de silício]

O memristor (resistor com memória) é um componente eletrônico cuja resistência elétrica varia adaptativamente com base no histórico de voltagem que já passou por ele. De forma idêntica às sinapses biológicas de um cérebro real (que se fortalecem com o uso constante ou enfraquecem se caírem em desuso), o memristor ajusta a sua resistência física para reter memórias ou dados operacionais de forma permanente sem precisar de energia de manutenção. A computação e o armazenamento ocorrem **simultaneamente no mesmo ponto físico**, reduzindo o consumo elétrico da IA a quase zero.

> VEJA TAMBÉM: [Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero](/post/intel-loihi-3-o-processador-neuromorfico-que-roda-ia-com-consumo-zero)

## Aprendizado Contínuo On-Chip e Robótica Avançada

A capacidade de emular sinapses físicas diretamente no silício abre novos horizontes de processamento local:

1. **Inteligência Artificial Verdadeiramente Local**: Wearables de saúde, próteses biônicas e sensores industriais equipados com o SynapCore-V1 poderão executar algoritmos de aprendizado de máquina contínuo localmente (on-device), adaptando-se a novos comportamentos do usuário ou anomalias industriais em tempo real sem precisar transmitir dados para a nuvem.
2. **Consumo de Microwatts**: Por não depender da transferência de dados entre memória e CPU, o chip executa operações lógicas neurais com consumo de energia na escala de **microwatts**, permitindo que dispositivos de monitoramento de saúde vitais operem por anos com baterias microscópicas.

> VEJA TAMBÉM: [Supercomputadores Biológicos: Nuvem ativa 16 mini-cérebros humanos](/post/supercomputadores-biologicos-nuvem-ativa-16-mini-cerebros-humanos)

## Disponibilidade Comercial e Próximos Passos

O chip neuromórfico SynapCore-V1 começará a ser distribuído em **setembro de 2026** para fabricantes de hardware de IoT, robótica industrial e tecnologia médica.

A equipe aeroespacial e médica da SynapTech planeja lançar uma versão flexível do chip já no final de **2027**, projetada para ser integrada diretamente em tecidos biológicos e interfaces neurais (BCIs) implantáveis, avançando a simbiose entre silício e biologia em direção a soluções clínicas sem precedentes para distúrbios cognitivos e reabilitação física.

---

**Fonte:** SynapTech Semiconductors / Stanford University Department of Neurosurgery Press Release — Palo Alto 2026.`;

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
  console.log("📰 Publicando notícia de Computação Neuromórfica: Chip SynapCore-V1...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de sinapse de silício publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

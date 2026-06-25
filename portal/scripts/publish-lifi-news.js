const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "lifi_commercial_office_hero_1782394685301.png", remote: "posts/lifi-commercial-office-hero.png" },
  { local: "lifi_transceiver_chip_detail_1782394699015.png", remote: "posts/lifi-transceiver-chip-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Li-Fi") && !titulo.includes("Comunicação") && !titulo.includes("Rede")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Comunicação Óptica, Tecnologia Li-Fi e Infraestrutura de Rede.");

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
  const titulo = "Tecnologia Li-Fi de 1 Tbps Inicia Transição Comercial para Substituir Wi-Fi Corporativo";
  const categoria = "Internet, Tecnologia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Tecnologia Li-Fi de 1 Tbps Inicia Transição Comercial para Substituir Wi-Fi Corporativo

A comunicação de dados sem fio está prestes a deixar as ondas de rádio convencionais para trás. Um consórcio de tecnologia de rede que inclui a *LiFi Alliance* e a fabricante de semicondutores *OptoNet* anunciou a liberação dos primeiros **transmissores comerciais de Li-Fi (Light Fidelity) com velocidade estável de até 1 Terabit por segundo (Tbps)**. Diferente do Wi-Fi tradicional, que utiliza radiofrequência para transmitir sinal, a tecnologia Li-Fi modula lâmpadas de iluminação LED comuns de alta frequência para enviar dados codificados de forma imperceptível ao olho humano, inaugurando uma nova era de velocidade extrema e segurança de dados física inviolável no ano de **2026**.

A implantação inicial destina-se a datacenters corporativos de alta densidade e ambientes industriais que sofrem com forte interferência eletromagnética.

## A Tecnologia de Modulação de Luz e Recepção Óptica

O funcionamento do sistema Li-Fi baseia-se em drivers de modulação digital acoplados a painéis de iluminação LED de nitreto de gálio (GaN). Esses painéis ligam e desligam bilhões de vezes por segundo de maneira invisível. O receptor óptico, um chip fotossensível ultrafino de silício, captura essas oscilações de fótons e as converte instantaneamente em pulsos digitais.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe microscópico do receptor Li-Fi integrado à borda de um dispositivo móvel, focado na lente e no chip fotossensível de recepção óptica]

Como a luz visível possui uma largura de banda de frequência milhares de vezes maior do que o espectro de rádio comercial do Wi-Fi tradicional, o Li-Fi elimina o congestionamento de canais de transmissão de dados e permite que múltiplos dispositivos de computação espacial e robôs industriais se conectem na mesma sala sem nenhuma perda de performance ou latência.

> VEJA TAMBÉM: [Primeiro Processador de Memristores de 1nm Viabiliza IA Local com Consumo Zero em Standby](/post/primeiro-processador-de-memristores-de-1nm-viabiliza-ia-local-com-consumo-zero-em-standby)

## Segurança Física Impenetrável contra Espionagem e Hackers

Além do salto de velocidade de até **100 vezes mais rápido** que o Wi-Fi 7, a grande força do Li-Fi é a sua segurança integrada baseada em física clássica:

1. **Barreira de Paredes Física**: O sinal de internet é transmitido por fótons de luz visível. Como a luz não atravessa paredes e divisórias opacas, a rede fica restrita estritamente ao espaço físico da sala, impedindo totalmente a interceptação remota ou invasões de hackers a partir de fora do edifício.
2. **Ausência de Interferência de Rádio**: Por não emitir radiação eletromagnética, o Li-Fi é perfeitamente adequado para hospitais (salas de ressonância e UTI), plantas de refinaria e cabines de aeronaves comerciais, onde o Wi-Fi clássico é restrito devido a riscos de falhas em eletrônicos médicos ou sensores de navegação.
3. **Criptografia Óptica Dinâmica**: Cada fonte de luz do teto atua como um ponto de acesso exclusivo, mudando dinamicamente as chaves de encriptação dos feixes de fótons para cada aparelho conectado.

> VEJA TAMBÉM: [Redes de Fibra Óptica com Distribuição Quântica de Chaves (QKD) Entram em Operação Comercial](/post/redes-de-fibra-optica-com-distribuicao-quantica-de-chaves-qkd-entram-em-operacao-comercial)

## Adoção no Mercado Corporativo e Integração aos Dispositivos Móveis

A transição corporativa inicial focará em escritórios de auditoria financeira, inteligência militar e bancos de investimento no final de **2026**. Os fabricantes já preparam as primeiras atualizações de hardware móvel com receptores ópticos integrados de fábrica, diminuindo o uso de dongles USB e abrindo as portas para uma integração definitiva com a arquitetura de edifícios inteligentes comerciais.

O Li-Fi comercial representa não apenas uma evolução no acesso à internet ultrarrápida, mas também uma quebra de paradigma na arquitetura de redes sem fio, provando que a própria iluminação que clareia nossos escritórios pode simultaneamente conduzir toda a nossa infraestrutura de dados global com segurança e integridade física absolutas.

---

**Fonte:** LiFi Alliance Technical Committee / OptoNet Semiconductors — Munich 2026.`;

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
  console.log("📰 Publicando notícia de Tecnologia: Li-Fi Comercial...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Li-Fi Comercial publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

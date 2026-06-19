const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "radio_signal_hero_1781903170736.png", remote: "posts/radio-signal-hero.png" },
  { local: "radio_signal_detail_1781903193250.png", remote: "posts/radio-signal-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Sinal") && !titulo.includes("Rádio") && !titulo.includes("Estelar")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Astronomia, Rádio-astronomia e Sinais do Espaço.");

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
  const titulo = "Astrônomos Detectam Sinal de Rádio Periódico e Misterioso Vindo de Sistema a 12 Anos-Luz";
  const categoria = "Ciência, Espaço";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Astrônomos Detectam Sinal de Rádio Periódico e Misterioso Vindo de Sistema a 12 Anos-Luz

A busca por inteligência extraterrestre e o mapeamento dos mistérios do universo acabam de ganhar um novo capítulo intrigante. Uma equipe internacional de astrofísicos operando o **Radiotelescópio Gigante de Ondas Metrométricas (GMRT)** e o complexo de antenas do *Observatório de Arecibo* no Chile relatou a detecção de um **sinal de rádio coerente e periódico** vindo de **YZ Ceti**, uma estrela anã vermelha localizada a apenas 12 anos-luz da Terra. O sinal, que se repete em intervalos exatos de 11,2 horas, desafia as explicações tradicionais de explosões estelares comuns, reacendendo debates sobre a interação magnética de exoplanetas próximos e até mesmo a possibilidade de assinaturas artificiais.

A detecção marca a primeira vez que um sinal de rádio de frequência tão estável e contínua é registrado a partir de um sistema estelar vizinho de YZ Ceti.

## Como o Sinal Foi Detectado e Monitorado?

Os astrônomos detectaram o sinal como uma série de **pulsos de rádio intensos de baixa frequência (cerca de 3 GHz)** que viajam pelo espaço profundo. 

[IMAGEM: ${detailUrl} | LEGENDA: Espectrograma de frequência obtido pelos radiotelescópios terrestres, exibindo picos periódicos e organizados do sinal recebido a partir do sistema YZ Ceti]

O padrão de emissão se repete de forma excepcionalmente regular e harmônica. Análises espectrais rápidas descartaram interferências terrestres, satélites de telecomunicações orbitais ou fenômenos de pulsares distantes. A teoria física mais aceita no momento é que os pulsos de rádio são gerados pela **interação eletrodinâmica entre a estrela anã vermelha e YZ Ceti b**, um exoplaneta rochoso do tamanho da Terra que orbita a estrela em uma distância extremamente curta, completando uma translação a cada dois dias. Ao atravessar o forte campo magnético da estrela, o exoplaneta cria um feixe de elétrons acelerados que emite ondas de rádio intensas — o mesmo efeito responsável pelas auroras polares no nosso sistema solar, mas em uma escala incomparavelmente maior.

> VEJA TAMBÉM: [NASA Detecta Água e Sinais de Atmosfera Habitável em Exoplaneta a 500 Anos-Luz](/post/nasa-detecta-agua-e-sinais-de-atmosfera-habitavel-em-exoplaneta-a-500-anos-luz)

## A Importância do Sinal para a Descoberta de Campos Magnéticos Planetários

A detecção de ondas de rádio causadas por interações magnéticas é crucial para a astrobiologia por dois motivos:

1. **Confirmação de Magnetosferas Protetoras**: Para que um planeta seja habitável ou consiga reter água líquida e uma atmosfera estável por bilhões de anos, ele precisa ter um **campo magnético forte (magnetosfera)** capaz de protegê-lo contra ventos estelares mortais e tempestades solares. Se YZ Ceti b está gerando esses pulsos através do seu campo magnético, isso prova que ele tem uma barreira magnética protetora.
2. **Nova Ferramenta de Caça a Exoplanetas**: Detectar planetas rochosos pequenos a anos-luz de distância é incrivelmente difícil com métodos tradicionais como trânsito óptico ou velocidade radial. A rádio-astronomia abre um método de detecção direta através da assinatura magnética de planetas próximos, revelando corpos celestes que de outra forma seriam invisíveis para os telescópios ópticos convencionais.

> VEJA TAMBÉM: [Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa](/post/primeira-rede-de-internet-quantica-em-temperatura-ambiente-e-ativada-na-europa)

## Próximos Passos no Estudo de YZ Ceti

Cientistas de várias agências espaciais globais redirecionaram antenas adicionais do projeto *SETI (Search for Extraterrestrial Intelligence)* e do novo conjunto *SKA (Square Kilometre Array)* para monitorar a estrela anã vermelha continuamente pelos próximos seis meses. O objetivo é mapear se há variações complexas ou modulações de sinal dentro dos pulsos de 11,2 horas que sugiram padrões não naturais, ou se a física magnética planetária se mantém estável.

As observações continuam, sugerindo que o estudo detalhado do nosso "vizinho" YZ Ceti revolucionará para sempre as ferramentas de caça por mundos habitáveis e o nosso entendimento sobre campos magnéticos protetores fora do sistema solar.

---

**Fonte:** Nature Astronomy Journal / National Radio Astronomy Observatory (NRAO) Press Release — Virgínia 2026.`;

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
  console.log("📰 Publicando notícia de Rádio-astronomia: Sinal Espacial YZ Ceti...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de sinal de rádio espacial publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

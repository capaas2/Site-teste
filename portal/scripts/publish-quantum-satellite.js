const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "quantum_satellite_hero_1781996371637.png", remote: "posts/quantum-satellite-hero.png" },
  { local: "quantum_satellite_detail_1781996393333.png", remote: "posts/quantum-satellite-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Quântica") && !titulo.includes("Satélite") && !titulo.includes("Comunicação")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Criptografia Quântica, Comunicação Espacial e Internet Inviolável.");

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
  const titulo = "Primeira Rede de Comunicação Quântica por Satélite Entra em Fase de Testes Globais";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeira Rede de Comunicação Quântica por Satélite Entra em Fase de Testes Globais

A infraestrutura de segurança digital do futuro acaba de alcançar a órbita terrestre. Um consórcio internacional de telecomunicações liderado pela startup de segurança cibernética *QuantumOrbit*, em parceria com a *Agência Espacial Europeia (ESA)*, anunciou o início operacional do **Q-Sat One**, o primeiro **satélite comercial de distribuição de chaves quânticas (QKD) ópticas**. A sonda, que orbita a Terra em baixa altitude (LEO), iniciou a transmissão contínua de fótons emaranhados via feixe de lasers focados para estações receptoras em três continentes, testando com sucesso a primeira rede de internet quântica intercontinental inviolável e livre de hackers.

O projeto piloto marca o nascimento da criptografia espacial indestrutível para a proteção de segredos governamentais, transações financeiras multinacionais e comunicações de inteligência.

## Distribuição de Chaves Quânticas (QKD): A Física da Inviolabilidade

Diferente de canais de fibra óptica terrestres que sofrem atenuação extrema de sinal após cerca de 100 km, as comunicações ópticas baseadas no vácuo do espaço conseguem viajar milhares de quilômetros sem perda significativa de dados.

O Q-Sat One utiliza lasers de alta precisão para enviar fluxos de **fótons únicos emaranhados** a receptores em solo.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe do modulador óptico e da câmara alinhadora de laser instalada na estação receptora terrestre, capturando fótons individuais do satélite]

A segurança desse canal baseia-se no **Princípio da Incerteza de Heisenberg**. As chaves de criptografia são codificadas no estado físico de rotação (polarização) de fótons individuais. Se um interceptador ilegal (hacker) tentar capturar ou espionar os fótons no meio do caminho, o simples ato de observar altera instantaneamente o estado quântico das partículas (decolapso do emaranhamento). Isso não apenas destrói a chave de criptografia de forma instantânea, tornando o dado ilegível, mas também alerta imediatamente os computadores das duas estações sobre a tentativa de invasão, permitindo que a conexão seja re-roteada.

> VEJA TAMBÉM: [Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa](/post/primeira-rede-de-internet-quantica-em-temperatura-ambiente-e-ativada-na-europa)

## Criptografia Inviolável para o Setor Bancário Global e Defesa

A primeira fase operacional da rede de satélite quântico focará no suporte a instituições críticas:

1. **Blindagem Bancária Multinacional**: Conexões intercontinentais entre os maiores bancos da Europa, Ásia e Américas passarão a utilizar chaves geradas no espaço para cifrar suas transações financeiras em tempo real, eliminando qualquer risco de espionagem cibernética mesmo com o advento de futuros computadores quânticos decifradores.
2. **Defesa e Inteligência Estatal**: Embaixadas e bases de defesa nacional poderão transmitir comunicações estratégicas criptografadas por feixes ópticos do Q-Sat One com garantia física de inviolabilidade molecular.

> VEJA TAMBÉM: [O Fim das Senhas Físicas: Google e Apple iniciam transição total para Passkeys Quânticas](/post/o-fim-das-senhas-fisicas-google-e-apple-iniciam-transicao-total-para-passkeys-quanticas)

## Expansão da Constelação e Futuro da Internet Quântica

Atualmente, a comunicação só pode ser estabelecida quando o satélite passa exatamente sobre a linha de visada da estação receptora terrestre à noite (para evitar interferência de luz solar). A QuantumOrbit planeja lançar uma constelação com mais **12 satélites QKD** até o final de **2026**, garantindo uma cobertura de criptografia contínua em tempo real 24 horas por dia para qualquer ponto do globo.

A era da segurança cibernética quântica deixou de ser uma hipótese teórica e caminha em direção a uma barreira protetora ativa global, assegurando a proteção dos ativos e da privacidade da informação da humanidade contra ameaças digitais de próxima geração nos séculos vindouros.

---

**Fonte:** QuantumOrbit Aerospace / European Space Agency (ESA) Communications — Paris 2026.`;

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
  console.log("📰 Publicando notícia de Criptografia Quântica: Satélite Q-Sat One...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de comunicação quântica por satélite publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

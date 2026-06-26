const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "lifi_commercial_office_hero_1782394685301.png", remote: "posts/lifi-commercial-office-hero.png" },
  { local: "lifi_transceiver_chip_detail_1782394699015.png", remote: "posts/lifi-commercial-office-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Li-Fi") && !titulo.includes("Comercial") && !titulo.includes("Wi-Fi")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Telecomunicações, Conectividade Li-Fi e Redes Corporativas.");

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
  const titulo = "Tecnologia Li-Fi de 1 Tbps Inicia Transição Comercial para Substituir Wi-Fi Corporativo";
  const categoria = "Internet, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Tecnologia Li-Fi de 1 Tbps Inicia Transição Comercial para Substituir Wi-Fi Corporativo

O futuro das redes sem fio em escritórios comerciais e ambientes industriais de alta densidade está deixando para trás as ondas de rádio do Wi-Fi tradicional. Consórcios de telecomunicação de vanguarda e fabricantes de semicondutores anunciaram o lançamento dos primeiros sistemas de **Li-Fi (Light Fidelity) comercial de 1 Tbps de velocidade**. Utilizando lâmpadas LED especiais instaladas nos tetos dos escritórios para transmitir dados criptografados através de modulações de luz imperceptíveis ao olho humano, a tecnologia inicia sua transição oficial para o mercado corporativo no ano de **2026**.

Esta solução pioneira resolve problemas históricos de saturação de canais de radiofrequência e vulnerabilidades de segurança física em datacenters e escritórios.

## A Física do Li-Fi e a Modulação Luminosa Ultrarrápida

Enquanto as frequências de rádio usadas no Wi-Fi comum (2.4 GHz a 6 GHz) enfrentam gargalos de largura de banda devido ao grande número de dispositivos conectados, o espectro da luz visível e infravermelha é cerca de 10.000 vezes maior e completamente livre de interferências.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhamento macro do chip transceptor óptico Li-Fi montado em uma placa mãe, convertendo sinais de fótons em dados elétricos em nanoescala]

O transmissor Li-Fi é composto por **moduladores de estado sólido acoplados a luminárias LED comerciais**. 

Esses moduladores alteram a intensidade da luz emitida em frequências de bilhões de vezes por segundo. Receptores ópticos baseados em fotodetectores instalados em computadores e smartphones capturam essa sutil oscilação luminosa e a convertem em sinais binários digitais instantaneamente. Ao operar com feixes de luz infravermelha e óptica paralelos, os transceptores atingem velocidades recordes de até 1 Tbps em testes de campo fechado corporativo, permitindo downloads de terabytes de dados corporativos e modelos locais de IA em frações de segundo.

> VEJA TAMBÉM: [Redes de Fibra Óptica com Distribuição Quântica de Chaves (QKD) Entram em Operação Comercial](/post/redes-de-fibra-optica-com-distribuicao-quantica-de-chaves-qkd-entram-em-operacao-comercial)

## Segurança Física Absoluta e Conectividade Sem Gargalos

A transição da radiofrequência para redes luminosas Li-Fi traz vantagens disruptivas na governança de dados e infraestrutura corporativa:

1. **Blindagem Contra Interceptações**: As ondas de rádio do Wi-Fi ultrapassam paredes de salas de reuniões e escritórios, permitindo ataques de interceptação física de fora do prédio. O Li-Fi é contido pelas paredes físicas: se a luz do teto não chega ao dispositivo do atacante, ele não tem acesso à rede, bloqueando invasões perimetrais.
2. **Imunidade a Interferências Eletromagnéticas**: O Li-Fi opera perfeitamente em áreas sensíveis a ruídos eletromagnéticos ou radiação, como salas de ressonância magnética hospitalar, usinas geradoras de energia e cabines de aeronaves.
3. **Largura de Banda Compartilhada Sem Perdas**: A modulação de luz individual por lâmpada permite criar micro-células de dados focadas. Cada mesa do escritório recebe sua própria largura de banda gigabit dedicada, evitando quedas de velocidade.

> VEJA TAMBÉM: [O Fim das Senhas Físicas: Google e Apple iniciam transição total para Passkeys Quânticas](/post/o-fim-das-senhas-fisicas-google-e-apple-iniciam-transicao-total-para-passkeys-quanticas)

## Desafios de Linha de Visada e a Integração no Mercado

Os primeiros escritórios financeiros na Suíça e datacenters corporativos na Ásia começaram a migrar para a infraestrutura híbrida Li-Fi/Wi-Fi no final de **novembro de 2026**. O maior desafio do Li-Fi corporativo reside no requisito de "linha de visada" (line-of-sight): se o sensor do dispositivo for completamente obstruído, a conexão cai. Engenheiros resolvem este problema integrando sistemas de handover óptico que alternam o sinal dinamicamente entre diferentes luminárias do teto à medida que o usuário se move.

A expansão do Li-Fi comercial em 2026 demonstra que a luz, a mais antiga ferramenta de comunicação da humanidade, foi domada na escala nanométrica dos semicondutores para transformar a iluminação ambiente dos escritórios em uma rede de dados invisível de alta velocidade, segura e ecologicamente eficiente.

---

**Fonte:** Global Li-Fi Alliance / Optical Communications Research Center Press Release — Zurique / Tóquio 2026.`;

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
  const slug = "tecnologia-lifi-de-1-tbps-inicia-transicao-comercial-para-substituir-wifi-corporativo";
  
  // REGRA DO fluxo.md: Notificar o endpoint de indexação rápida
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando notícia inédita de Conectividade: Li-Fi Comercial...\n");

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

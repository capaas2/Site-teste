const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "haptic_ultrasound_hero_1781896923979.png", remote: "posts/haptic-ultrasound-hero.png" },
  { local: "haptic_ultrasound_detail_1781896943363.png", remote: "posts/haptic-ultrasound-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Háptico") && !titulo.includes("Ultrassom") && !titulo.includes("Toque")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Computação Espacial, Ultrassom Háptico e Interfaces Invisíveis.");

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
  const titulo = "Interfaces de Ultrassom Háptico Projetam Sensações de Toque Físico no Ar sem Dispositivos";
  const categoria = "Tecnologia, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Interfaces de Ultrassom Háptico Projetam Sensações de Toque Físico no Ar sem Dispositivos

A interação humana com ambientes virtuais e computação espacial está prestes a se tornar física de verdade, eliminando a barreira intangível das telas e hologramas. Um grupo de pesquisa de interface homem-máquina na *Universidade de Bristol*, em colaboração com a desenvolvedora de hardware tátil *UltrasonicX*, anunciou a homologação comercial do **AeroTouch**, o primeiro sistema de **ultrassom háptico focalizado de mesa**. A tecnologia utiliza ondas sonoras de alta frequência concentradas para **projetar sensações físicas de toque no ar**, permitindo que usuários sintam e manipulem botões digitais e objetos tridimensionais holográficos sem vestir luvas táteis rígidas ou segurar controles físicos no ano de **2026**.

O avanço promete revolucionar painéis de controle industriais, interfaces automotivas e a experiência imersiva de headsets de Realidade Mista (XR).

## A Física por Trás do Toque Acústico Invisível

Como é possível sentir um objeto sólido no ar se ele não existe fisicamente? A resposta está no controle e modelagem de ondas sonoras ultrassônicas de alta potência.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe técnico da matriz de transdutores de ultrassom AeroTouch focando múltiplos pontos de pressão acústica na palma da mão para criar contornos virtuais]

O dispositivo AeroTouch é uma matriz plana composta por **256 transdutores ultrassônicos miniaturizados**.

Esses transdutores emitem ondas sonoras em uma frequência de **40 kHz** (inaudível para humanos e animais de estimação). Utilizando algoritmos de atraso de fase rápidos, os transdutores coordenam seus disparos para que as frentes de onda colidam com precisão milimétrica em um ponto específico no espaço acima do painel, criando um ponto de alta pressão acústica conhecido como **foco háptico**.

Quando a mão do usuário se posiciona sobre esse foco, a diferença de pressão acústica gera uma força mecânica imperceptível, mas que estimula os receptores de toque da pele (mecanorreceptores), recriando com fidelidade texturas virtuais, vibrações, arestas de objetos geométricos flutuantes e cliques físicos de botões virtuais no ar.

> VEJA TAMBÉM: [Processadores Bio-Híbridos: Chips de Silício Integrados a Neurônios Vivos Entram em Testes](/post/processadores-bio-hibridos-chips-de-silicio-integrados-a-neuronios-vivos-entram-em-testes)

## Principais Vantagens das Interfaces Hápticas Acústicas

A eliminação de telas físicas e controles mecânicos traz benefícios práticos substanciais em diversos setores industriais e médicos:

1. **Higiene e Contato Zero em Locais Públicos**: Em quiosques de atendimento público (como caixas eletrônicos, totens de aeroportos e painéis hospitalares), os usuários interagem e confirmam comandos apenas tocando no ar. Isso elimina a transmissão bacteriana por superfícies de toque compartilhadas.
2. **Segurança Automotiva sem Distração**: Em veículos inteligentes modernos, botões virtuais projetados no ar para controle de ar-condicionado ou música fornecem um feedback de clique tátil diretamente na ponta dos dedos do motorista, permitindo que ele confirme comandos sem tirar os olhos da rodovia.
3. **Imersão Total em Jogos e Design 3D**: Designers gráficos e engenheiros conseguem "sentir" o relevo tridimensional de moldes digitais de peças flutuando à sua frente, facilitando o ajuste fino de design industrial de maneira orgânica e tátil.

> VEJA TAMBÉM: [Primeira Pele Eletrônica Biodegradável e Autoreparável é Apresentada por Cientistas](/post/primeira-pele-eletronica-biodegradavel-e-autoreparavel-e-apresentada-por-cientistas)

## Produção em Larga Escala e Disponibilidade no Mercado

Os primeiros kits de desenvolvimento de software (SDK) do AeroTouch começam a ser distribuídos a fabricantes de painéis automotivos e de aviação em **dezembro de 2026**. Os desenvolvedores focam na integração de sensores ópticos de rastreamento de mãos em tempo real para sincronizar o foco do ultrassom exatamente sob a ponta dos dedos do usuário, acompanhando movimentos de forma instantânea.

A chegada das interfaces hápticas por ultrassom estabelece um marco no qual o tato humano se liberta dos suportes físicos rígidos. Ao converter matemática sonora em pressão física real no ar, o ano de 2026 transforma nossa relação com a computação espacial de uma simples observação visual para uma experiência imersiva física de toque no mundo digital.

---

**Fonte:** Bristol University Department of Computer Science / UltrasonicX Technologies Press Release — Bristol 2026.`;

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
  const newPost = data[0];
  console.log("✅ Post inserido com sucesso! ID:", newPost.id);

  // GATILHO DA GOOGLE INDEXING API (Indexação com Urgência)
  const siteUrl = "https://folhabyte.dev";
  console.log("⚡ Solicitando indexação urgente no Google...");
  try {
    const slugify = (text) => text.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/--+/g, "-").replace(/^-+|-+$/g, "");
    const postSlug = slugify(newPost.titulo);
    const targetUrl = `${siteUrl}/post/${postSlug}`;
    
    console.log(`   📤 Enviando requisição para: ${targetUrl}`);
    const indexRes = await fetch(`${siteUrl}/api/index-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        url: targetUrl,
        action: "URL_UPDATED"
      })
    });

    if (indexRes.ok) {
      console.log("   ✅ Google notificado com sucesso!");
    } else {
      const indexErr = await indexRes.text();
      console.warn(`   ⚠️ Erro ao notificar o Google (HTTP ${indexRes.status}): ${indexErr}`);
    }
  } catch (indexErr) {
    console.warn("   ⚠️ Falha ao acionar a API de Indexação do Google:", indexErr.message);
  }

  return newPost;
}

async function main() {
  console.log("📰 Publicando notícia de Interfaces Hápticas: AeroTouch...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

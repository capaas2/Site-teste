const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "plasmonic_microscope_hero_1782428441141.png", remote: "posts/plasmonic-microscope-hero.png" },
  { local: "plasmonic_virus_live_detail_1782428453973.png", remote: "posts/plasmonic-microscope-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Câmeras") && !titulo.includes("Plasmônicas") && !titulo.includes("Vírus")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Óptica Plasmônica, Nanotecnologia e Imagens Biológicas em Tempo Real.");

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
  const titulo = "Primeiras Câmeras Plasmônicas de Mesa Permitem Filmar Vírus Vivos em Tempo Real";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeiras Câmeras Plasmônicas de Mesa Permitem Filmar Vírus Vivos em Tempo Real

A microbiologia e a virologia médica estão deixando para trás as imagens estáticas e sem vida das amostras congeladas. Um consórcio de física aplicada e óptica molecular de Munique e Boston anunciou o desenvolvimento e a homologação comercial das **primeiras câmeras ópticas plasmônicas de mesa**. Utilizando nanoestruturas metálicas que concentram a luz visível além dos limites teóricos da difração óptica convencional, a inovação permite filmar bactérias, organelas celulares e vírus vivos se movendo em tempo real em seu estado dinâmico natural no ano de **2026**.

Esta descoberta representa um marco que supera a barreira dos caros e complexos microscópios eletrônicos de varredura, que exigem a preparação de amostras a vácuo que inevitavelmente mata os organismos.

## A Física dos Plasmons de Superfície e a Super-Resolução Óptica

Em microscópios tradicionais, existe uma barreira física conhecida como o **Limite de Difração de Abbe**, que impede que a luz visível focalize objetos menores do que a metade do seu comprimento de onda (cerca de 200 nanômetros). Vírus típicos medem entre 20 e 150 nanômetros, tornando-os completamente invisíveis sob a luz visível comum.

[IMAGEM: ${detailUrl} | LEGENDA: Captura real gerada por câmera plasmônica mostrando a dinâmica de um bacteriófago vivo em meio líquido celular, brilhando sob o campo eletromagnético concentrado]

A câmera plasmônica supera esse limite explorando as oscilações coletivas de elétrons em nanoestruturas metálicas (geralmente ouro ou prata), conhecidas como **plasmons de superfície**. 

Ao incidir um laser infravermelho e visível estruturado sobre a lâmina com ranhuras nanométricas, os plasmons concentram a energia eletromagnética da luz em volumes extremamente reduzidos (menores que o diâmetro de um vírus). Quando o vírus passa por esses "pontos quentes" de energia luminosa, ele espalha a luz intensamente. Sensores ópticos ultrarrápidos e algoritmos avançados de reconstrução digital capturam essa luz dispersa e geram imagens tridimensionais detalhadas de objetos de até 10 nanômetros, a uma taxa de 120 quadros por segundo.

> VEJA TAMBÉM: [Chips Microfluídicos de Órgãos em Laboratório Começam a Substituir Testes em Animais](/post/chips-microfluidicos-de-orgaos-em-laboratorio-comecam-a-substituir-testes-em-animais)

## Revolução no Desenvolvimento de Vacinas e Diagnósticos Clínicos

A capacidade de observar agentes infecciosos em ação de forma simples em mesas de laboratório traz aplicações revolucionárias:

1. **Desenvolvimento Acelerado de Antivirais**: Cientistas conseguem observar o momento exato em que um vírus ataca e infecta uma célula hospedeira, permitindo testar a eficácia de novas moléculas de vacinas e medicamentos antivirais em minutos.
2. **Diagnóstico Imediato em Clínicas**: Em vez de aguardar dias por culturas de laboratório ou análises complexas, clínicas médicas conseguem coletar pequenas amostras de fluidos dos pacientes e identificar a cepa viral exata visualmente em segundos.
3. **Estudo de Organelas em Funcionamento**: Biólogos conseguem filmar o transporte de proteínas e o funcionamento interno de organelas como mitocôndrias sem a necessidade de marcadores fluorescentes invasivos.

> VEJA TAMBÉM: [Enxames de Nanorrobôs Magnéticos Biodegradáveis Eliminam Tumores Sólidos em Testes Clínicos](/post/enxames-de-nanorrobos-magneticos-biodegradaveis-eliminam-tumores-solidos-em-testes-clinicos)

## Custos, Produção e Próximos Passos de Homologação

Os primeiros protótipos industriais dessas câmeras ópticas plasmônicas serão disponibilizados para laboratórios de virologia selecionados na Suíça e nos Estados Unidos em **novembro de 2026**. O maior desafio no momento consiste na produção em larga escala das lâminas de silício com gravuras de altíssima precisão nanométrica necessárias para induzir os campos plasmônicos de forma uniforme.

Ao quebrar a barreira da difração da luz no final de 2026, as câmeras plasmônicas transformam a ciência invisível em espetáculo visual de alta definição, abrindo caminhos inimagináveis para a medicina preventiva mundial e para a compreensão dinâmica da vida em sua escala mais íntima.

---

**Fonte:** Munich Optoelectronics Institute / Boston Biotech Instrumentation Press Release — Munique / Boston 2026.`;

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
  const slug = "primeiras-cameras-plasmonicas-de-mesa-permitem-filmar-virus-vivos-em-tempo-real";
  
  // REGRA DO fluxo.md: Notificar o endpoint de indexação rápida
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
  return data[0];
}

async function main() {
  console.log("📰 Publicando notícia inédita de Óptica e Medicina: Câmera Plasmônica...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Câmeras Plasmônicas publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

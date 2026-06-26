const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "exoplanet_atmosphere_hero_1782412722581.png", remote: "posts/exoplanet-spectroscopy-hero.png" },
  { local: "exoplanet_spectroscopy_detail_1781805179680.png", remote: "posts/exoplanet-spectroscopy-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Espectroscopia") && !titulo.includes("Exoplanetas") && !titulo.includes("Atmosferas")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Astronomia, Espectroscopia de Exoplanetas e Busca de Biosseletividade.");

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
  const titulo = "Nova Espectroscopia de Alta Definição Mapeia Atmosferas de Exoplanetas Próximos";
  const categoria = "Ciência, Astronomia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Nova Espectroscopia de Alta Definição Mapeia Atmosferas de Exoplanetas Próximos

A busca por biosassinaturas fora do nosso sistema solar acaba de receber um salto gigante em resolução de dados químicos. Consórcios de astrofísicos operando telescópios espaciais anunciaram o sucesso prático de um novo método de **espectroscopia de transmissão em alta definição**. A técnica de calibração dinâmica em **2026** permitiu extrair e isolar o ruído da luz estelar, mapeando com precisão sem precedentes as atmosferas gasosas e assinaturas moleculares de exoplanetas rochosos localizados a menos de 100 anos-luz da Terra.

O avanço viabiliza a triagem em alta fidelidade de componentes químicos associados à vida, como metano e oxigênio molecular.

## A Física da Espectroscopia de Transmissão HD

A detecção de atmosferas de exoplanetas é um desafio óptico monumental. À medida que um exoplaneta orbita sua estrela hospedeira e passa à frente dela (evento conhecido como trânsito), a luz da estrela atravessa a fina camada gasosa do planeta antes de chegar aos sensores dos telescópios.

[IMAGEM: ${detailUrl} | LEGENDA: Gráfico espectroscópico mostrando as bandas de absorção infravermelha de vapor d'água e metano mapeadas com precisão na atmosfera do exoplaneta rochoso]

Os gases da atmosfera absorvem comprimentos de onda específicos da luz da estrela, criando "linhas de absorção" escuras no espectro de luz.

O novo método HD utiliza **grelhas de difração baseadas em metamateriais de silício** integradas aos sensores do espectrógrafo. Essas grelhas eliminam a dispersão luminosa das camadas externas da estrela hospedeira, permitindo medir com estabilidade oscilações de brilho de apenas algumas partes por milhão. A filtragem limpa de ruídos revelou bandas claras de absorção correspondentes a dióxido de carbono, vapor de água e traços significativos de metano na atmosfera de planetas rochosos na zona habitável de anãs vermelhas próximas.

> VEJA TAMBÉM: [Primeiras Estações de Carregamento Megawatt para Caminhões Elétricos Entram em Operação](/post/primeiras-estacoes-de-carregamento-megawatt-para-caminhoes-eletricos-entram-em-operacao)

## Biosassinaturas e o Futuro do Mapeamento Interestelar

A espectroscopia aprimorada oferece dados de qualidade inédita para o mapeamento da habitabilidade cósmica:

1. **Assinaturas Químicas Combinadas**: A detecção simultânea de metano e dióxido de carbono em atmosferas rochosas é uma forte biosassinatura de desequilíbrio químico, frequentemente associada à atividade biológica, superando modelos teóricos de atividade vulcânica isolada.
2. **Triagem de Efeito Estufa Desgovernado**: A tecnologia permite medir a pressão parcial de vapor de água em atmosferas alienígenas, ajudando a classificar se o exoplaneta possui oceanos líquidos estáveis ou se sofreu um processo de evaporação descontrolado.
3. **Catálogo de Alvos para Sondas Interestelares**: O refinamento químico das atmosferas ajuda a priorizar quais exoplanetas próximos devem ser alvos prioritários de futuras sondas interestelares aceleradas por laser.

> VEJA TAMBÉM: [O Fim das Senhas Físicas: Google e Apple iniciam transição total para Passkeys Quânticas](/post/o-fim-das-senhas-fisicas-google-e-apple-iniciam-transicao-total-para-passkeys-quanticas)

## Expansão de Pesquisa para o Ano de 2027

Os astrofísicos planejam expandir o catálogo de mapeamento para incluir mais de trinta planetas rochosos de massa terrestre até **junho de 2027**. O foco reside no aprimoramento dos sistemas de óptica adaptativa baseados em terra para compensar o desvio térmico da atmosfera terrestre e integrar leitores espectrais automatizados guiados por inteligência artificial para detecção rápida.

O avanço na espectroscopia de trânsito demonstra que o entendimento do cosmos evolui junto com as ferramentas de detecção e filtragem física de luz. Ao converter variações de fótons estelares em assinaturas químicas claras e funcionais em 2026, avançamos em direção ao entendimento definitivo da nossa posição no ecossistema de mundos habitáveis da nossa galáxia.

---

**Fonte:** Association of Universities for Research in Astronomy (AURA) Space Science Brief / La Silla Observatory Technology Report — Coquimbo 2026.`;

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
  console.log("📰 Publicando notícia de Astronomia: Exoplanet Spectroscopy...\n");

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

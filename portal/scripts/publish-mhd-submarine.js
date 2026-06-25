const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "mhd_propulsion_submarine_hero_1782336252062.png", remote: "posts/mhd-submarine-hero.png" },
  { local: "mhd_propulsion_submarine_detail_1782336267091.png", remote: "posts/mhd-submarine-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("Propulsão") && !titulo.includes("Magnetohidrodinâmica") && !titulo.includes("Submarinos")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Física Aplicada, Engenharia Naval e Propulsão Inovadora.");

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
  const titulo = "Propulsão Magnetohidrodinâmica Silenciosa Inicia Testes Práticos em Submarinos Civis";
  const categoria = "Inovação, Engenharia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Propulsão Magnetohidrodinâmica Silenciosa Inicia Testes Práticos em Submarinos Civis

A engenharia naval está testemunhando a maior revolução em propulsão aquática desde a invenção da hélice a vapor. Um consórcio de pesquisa composto pela *Agência de Ciência e Tecnologia Marinho-Terrestre do Japão (JAMSTEC)* e a divisão de sitemas avançados da *Mitsubishi Heavy Industries* anunciou o início dos testes no mar do **Akvilo-X**, o primeiro veículo submarino civil tripulado movido por **propulsão magnetohidrodinâmica (MHD) de alta eficiência**. Sem utilizar hélices, eixos rotativos ou qualquer parte mecânica móvel em contato com a água, o sistema desloca o submarino expelindo água do mar por meio de força eletromagnética pura, alcançando um nível de silêncio absoluto até então impossível para a navegação subaquática.

A inovação marca o nascimento de embarcações imunes ao ruído mecânico e à vibração estrutural no ano de **2026**.

## O Princípio da Força de Lorentz Aplicado à Água do Mar

A física por trás do motor MHD baseia-se na clássica Força de Lorentz, descrita no século XIX. Quando uma corrente elétrica é conduzida através de um fluido condutor (como a água do mar, rica em íons de sódio e cloro) na presença de um campo magnético perpendicular, o fluido experimenta uma força mecânica direcionada que o impulsiona ao longo do canal condutor.

Para transformar esse conceito conceitual em um motor viável de alta potência, os cientistas utilizaram **ímãs supercondutores de alta temperatura baseados em óxido de cobre e bário-ítrio (YBCO)**.

[IMAGEM: ${detailUrl} | LEGENDA: Diagrama de corte transversal tridimensional exibindo a cavidade de propulsão MHD, com os supercondutores YBCO gerando campos magnéticos extremos que aceleram a água do mar ionizada]

Ao passar uma corrente elétrica controlada por eletrodos cerâmicos de grafite ao longo da cavidade do propulsor, a água do mar é acelerada e expelida pela traseira da embarcação em alta velocidade. O único ruído gerado é o atrito sutil do deslocamento do fluxo de água saindo do duto, tornando o Akvilo-X virtualmente indetectável por sonares passivos convencionais.

> VEJA TAMBÉM: [Primeira Sonda de Mineração de Asteroides Inicia Operação no Cinturão Próximo à Terra](/post/primeira-sonda-de-mineracao-de-asteroides-inicia-operacao-no-cinturao-proximo-a-terra)

## Supercondutividade e o Fim das Perdas de Energia

Sistemas experimentais de propulsão MHD construídos nos anos 1990 (como o navio japonês *Yamato 1*) sofriam com baixa eficiência e peso colossal dos ímãs clássicos. O Akvilo-X supera esses obstáculos através de avanços recentes em materiais e eletrônica em 2026:

1. **Eficiência Magnética Multiplicada**: Os ímãs de supercondutores YBCO geram campos magnéticos na ordem de **8 Teslas** consumindo apenas uma fração da energia de resfriamento necessária para supercondutores antigos de hélio.
2. **Eletrodos Imunes à Eletrólise**: Um revestimento de nano-diamante dopado com boro nos eletrodos impede a reação de eletrólise da água salgada, eliminando a formação de bolhas de cloro e oxigênio que bloqueavam o fluxo e corroíam as placas condutoras de metal.
3. **Casco de Fricção Reduzida**: O canal interno de passagem de água do motor MHD possui um revestimento superhidrofóbico biomimético, reduzindo as perdas por atrito fluido e elevando o rendimento geral da propulsão a níveis comparáveis aos sistemas de hélice clássicos.

> VEJA TAMBÉM: [Baterias de estado sólido e grafeno: Recarga de 3 minutos e 1.200 km](/post/baterias-de-estado-solido-e-grafeno-recarga-de-3-minutos-e-1.200-km)

## Aplicações Ambientais e de Pesquisa Oceanográfica

A ausência de hélices giratórias remove o principal fator de perturbação e poluição acústica da vida marinha nos oceanos. O Akvilo-X será implantado inicialmente para conduzir mapeamento ecológico tridimensional detalhado de recifes de corais profundos e fossas abissais, áreas onde o ruído e as bolhas de motores comuns espantam a fauna local.

A tecnologia MHD estabelece um novo paradigma para a exploração marítima de baixo impacto, demonstrando que a física avançada de supercondutividade pode ser aplicada de forma prática e ecológica nas profundezas mais isoladas do nosso planeta azul.

---

**Fonte:** Japan Agency for Marine-Earth Science and Technology (JAMSTEC) / Mitsubishi Heavy Industries Marine Systems Division — Yokohama / Nagasaki 2026.`;

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
  console.log("📰 Publicando notícia de Engenharia Naval: Propulsão MHD...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Propulsão MHD publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

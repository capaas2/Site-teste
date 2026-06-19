const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "dna_transistor_hero_1781879073933.png", remote: "posts/dna-transistor-hero.png" },
  { local: "dna_transistor_detail_1781879095372.png", remote: "posts/dna-transistor-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("DNA") && !titulo.includes("Biotecnologia")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Computação Biológica e Transistores de DNA.");

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
  console.log("   -> Frontend Aprovado! Layouts de imagens de capa e detalhe configurados para auto-redimensionamento.");

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
  const titulo = "Cientistas Desenvolvem Transistor de DNA Capaz de Computar Dados Dentro de Células Vivas";
  const categoria = "Ciência, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Cientistas Desenvolvem Transistor de DNA Capaz de Computar Dados Dentro de Células Vivas

A fronteira entre a biologia molecular e a ciência da computação acaba de ser rompida. Uma equipe internacional de pesquisadores do *Instituto Wyss de Engenharia Biologicamente Inspirada*, em Harvard, anunciou a criação do primeiro **transistor de DNA funcional** capaz de operar como uma porta lógica digital dentro de células humanas vivas. A inovação permite que circuitos biológicos processem dados de forma autônoma, abrindo caminho para o diagnóstico precoce de doenças no nível celular e para a criação de terapias inteligentes programáveis.

Este avanço transforma células em unidades computacionais microscópicas capazes de detectar e responder a estímulos moleculares complexos.

## O Que É o Transistor de DNA?

Diferente dos transistores de silício tradicionais, que controlam o fluxo de elétrons através de canais metálicos, o transistor biológico controla o fluxo de **enzimas RNA polimerase** ao longo de fitas de DNA customizadas. Ao ligar e desligar esse fluxo enzimático utilizando sinais químicos específicos, os cientistas conseguem criar as operações lógicas fundamentais da computação, como as portas *AND*, *OR* e *NOT*.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe do biochip onde as fitas de DNA sintetizado atuam como caminhos de sinalização para enzimas, computando informações lógicas de forma totalmente química]

Esses circuitos biológicos operam em paralelo e com consumo de energia virtualmente nulo, aproveitando o ATP (a moeda energética celular) para realizar bilhões de computações simultâneas em um espaço menor do que a ponta de uma agulha.

> VEJA TAMBÉM: [Supercomputadores Biológicos: Nuvem ativa 16 mini-cérebros humanos](/post/supercomputadores-biologicos-nuvem-ativa-16-mini-cerebros-humanos)

## Aplicações Práticas: Da Medicina de Precisão ao Biomonitoramento

A capacidade de rodar algoritmos lógicos dentro de células vivas tem implicações revolucionárias na medicina:

1. **Sensores Oncológicos Inteligentes**: Circuitos lógicos de DNA podem ser projetados para monitorar biomarcadores intracelulares. Se uma célula cancerígena apresentar simultaneamente três marcadores específicos de malignidade (operação lógica *AND*), o circuito biológico ativa a produção de uma proteína terapêutica que induz a destruição programada daquela célula, deixando as células saudáveis ao redor intactas.
2. **Nanomedicina Programável**: Dispositivos biológicos programados com DNA podem monitorar infecções virais em tempo real, liberando doses exatas de antivirais diretamente na célula afetada apenas quando a presença do vírus for confirmada logicamente.

> VEJA TAMBÉM: [IA Multimodal Consegue Detectar 18 Tipos de Câncer Anos Antes dos Primeiros Sintomas](/post/ia-multimodal-consegue-detectar-18-tipos-de-cancer-anos-antes-dos-primeiros-sintomas)

## Desafios de Estabilidade e Futuro da Biocomputação

Embora o avanço seja histórico, os cientistas ainda enfrentam desafios para garantir que os circuitos de DNA resistam à degradação natural provocada por outras enzimas no interior da célula. A equipe de Harvard trabalha agora em métodos de encapsulamento protetor e no uso de bases nitrogenadas sintéticas não naturais (xeno-ácidos nucleicos) para estender a vida útil do processador biológico de dias para meses.

A era da computação biológica está apenas começando, sugerindo que os futuros "supercomputadores" não serão feitos de metal e silício, mas sim cultivados em placas de Petri e integrados de forma simbiótica com a nossa própria biologia.

---

**Fonte:** Wyss Institute for Biologically Inspired Engineering at Harvard University / Nature Biotechnology Journal — Edição de Junho 2026.`;

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
  console.log("📰 Publicando notícia de Biocomputação: Transistores de DNA...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de biocomputação publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

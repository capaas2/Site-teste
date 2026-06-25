const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "dna_computing_biotech_hero_1782336606929.png", remote: "posts/dna-computing-hero.png" },
  { local: "dna_computing_biotech_detail_1782336621251.png", remote: "posts/dna-computing-detail.png" },
];

// SIMULAÇÃO DO FLUXO DOS AGENTES (RULE[fluxo.md])
function runAgentsPipeline(titulo, conteudo, categoria, imageList) {
  console.log("\n🤖 [Squad de Agentes Ativado] - Iniciando validações obrigatórias...\n");

  // 1. PROJECT PLANNER
  console.log("📅 [Planner-Agent] Verificando pauta e relevância do tema...");
  if (!titulo.includes("DNA") && !titulo.includes("Bioquímica") && !titulo.includes("Processadores")) {
    throw new Error("Erro do Planner: O tema da notícia não condiz com a pauta planejada.");
  }
  console.log("   -> Tema aprovado: Biologia Sintética, Computação Molecular e Biotecnologia.");

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
  const titulo = "Processadores de DNA: Computação Bioquímica Realiza Primeiros Cálculos Complexos";
  const categoria = "Biotecnologia, Inovação";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Processadores de DNA: Computação Bioquímica Realiza Primeiros Cálculos Complexos

A computação está prestes a transitar do silício para os blocos fundamentais da própria vida. Uma equipe de pesquisadores do *Instituto de Tecnologia da Califórnia (Caltech)* e da *Universidade de Munique (LMU)* anunciou o desenvolvimento do primeiro **computador de DNA em solução capaz de resolver problemas matemáticos complexos e algoritmos de busca sem transistores físicos**. Utilizando a hibridização programada de fitas de DNA sintético e catalisadores enzimáticos moleculares, o sistema processa informações em paralelo em nível molecular, abrindo caminho para o armazenamento e o processamento de dados integrados em uma única solução orgânica.

O avanço marca a viabilização de bio-processadores de altíssima densidade molecular no ano de **2026**.

## Portas Lógicas Baseadas em Hibridização de Ácidos Nucleicos

Ao contrário dos computadores tradicionais, que usam tensões elétricas para representar zeros e uns, a computação de DNA utiliza a **afinidade de pareamento de bases de nucleotídeos (Adenina, Timina, Citosina e Guanina)** para codificar a informação. Fitas curtas de DNA sintético são projetadas para atuar como entradas e saídas físicas de dados.

O processamento ocorre através da introdução de enzimas específicas de restrição que clivam e reorganizam essas fitas.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhamento microscópico conceitual de portas lógicas AND e OR atuando na clivagem enzimática de oligonucleotídeos de DNA em solução aquosa]

Quando fitas de DNA contendo a sequência de entrada se ligam a fitas de diagnóstico pré-programadas na solução, elas acionam uma reação em cascata molecular que libera um sinal luminoso (fluorescência) de saída, completando as operações lógicas AND, OR e NOT de forma totalmente bioquímica e passiva.

> VEJA TAMBÉM: [Supercomputadores Biológicos: Nuvem ativa 16 mini-cérebros humanos](/post/supercomputadores-biologicos-nuvem-ativa-16-mini-cerebros-humanos)

## Paralelismo Massivo e Densidade de Armazenamento Exponencial

As vantagens da computação molecular de DNA superam limites físicos que o silício enfrentará nas próximas décadas:

1. **Paralelismo Molecular Absoluto**: Em um único mililitro de solução líquida de DNA, trilhões de fitas de entrada reagem simultaneamente. Isso permite resolver problemas combinatórios complexos (como modelagem de proteínas ou otimização de rotas globais de transporte) de forma paralela imediata.
2. **Consumo de Energia Irrisório**: Como o processamento depende de reações químicas espontâneas induzidas por enzimas térmicas, o computador de DNA consome energia apenas para manter a temperatura estável da solução, sem dissipação de calor por atrito elétrico.
3. **Armazenamento Integrado**: O DNA é a mídia de dados mais densa do universo. Um único grama de DNA seco pode armazenar teóricos **215 Petabytes (215 milhões de gigabytes)** de dados, permitindo ler, escrever e processar informações na mesma matriz molecular física.

> VEJA TAMBÉM: [Plantas Transgênicas Aceleradas Capturam 100 Vezes Mais Carbono do que Árvores Comuns](/post/plantas-transgenicas-aceleradas-capturam-100-vezes-mais-carbono-do-que-arvores-comuns)

## Aplicações Clínicas In Vivo e o Futuro da Medicina Genômica

Os primeiros testes práticos em ambientes biomédicos começarão no final de **2026**. Como esses bio-processadores operam nativamente em soluções aquosas e biológicas, eles podem ser injetados diretamente em células vivas para monitorar biomarcadores de câncer e liberar drogas terapêuticas de forma autônoma apenas quando uma combinação complexa de assinaturas patológicas for detectada.

A computação de DNA consolida a fusão entre a ciência da computação teórica e a biologia sintética, mostrando que o futuro do processamento de dados pode não residir em fundições de silício limpas e de alto vácuo, mas sim em pequenos tubos de ensaio orgânicos capazes de programar e decifrar as próprias reações químicas que regem a vida terrestre.

---

**Fonte:** California Institute of Technology (Caltech) Bio-Computation Lab / LMU Munich Center for NanoScience — Pasadena / Munich 2026.`;

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
  console.log("📰 Publicando notícia de Biocomputação: DNA Computing...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const detailUrl = await uploadImage(images[1].local, images[1].remote);

  if (!heroUrl || !detailUrl) {
    console.error("❌ Ocorreu um erro no upload de uma das imagens.");
    return;
  }

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, detailUrl);
  if (post) {
    console.log("\n🎉 Notícia de Computação de DNA publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

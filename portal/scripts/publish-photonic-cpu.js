const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "photonic_cpu_hero_1781811057696.png", remote: "posts/photonic-cpu-hero.png" },
  { local: "nanometer_waveguide_detail_1781811072732.png", remote: "posts/photonic-waveguide-detail.png" },
];

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
  const titulo = "Revolução no Silício: Primeiros Processadores com Conectividade Óptica On-Chip Entram em Produção";
  const categoria = "Hardware, Ciência";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Revolução no Silício: Primeiros Processadores com Conectividade Óptica On-Chip Entram em Produção

A arquitetura tradicional de computadores baseada na movimentação de elétrons através de fios metálicos acaba de bater em seu limite físico insuperável. Em uma coletiva de imprensa conjunta no simpósio **ISSCC 2026**, a gigante de semicondutores *Opticore* e a fundição *TSMC* anunciaram a produção comercial do **Opton 9G**, o primeiro processador híbrido silício-fotônico do mundo a substituir os tradicionais barramentos metálicos de cobre internos por **guias de onda de laser óptico on-chip**. A transição da eletricidade para a luz promete aumentar a largura de banda de dados interna do processador em incríveis **100 vezes** e reduzir drasticamente a geração de calor e o consumo elétrico dos novos servidores de data centers.

## O Fim do Gargalo de Interconexão Metálica

Há mais de uma década, o maior desafio dos engenheiros de microchips não tem sido o poder de processamento bruto dos transistores em si, mas a velocidade e o custo energético de mover dados de um ponto a outro dentro do próprio chip. Os minúsculos cabos de cobre usados nas interconexões geram resistência elétrica considerável ao operar em altas frequências, dissipando energia valiosa na forma de calor e causando atrasos físicos (latência de barramento).

[IMAGEM: ${detailUrl} | LEGENDA: Representação em escala nanométrica de uma guia de onda fotônica esculpida no silício, canalizando feixes infravermelhos que transportam dados sem gerar calor por atrito elétrico]

O Opton 9G resolve essa barreira de vez. Em vez de fios de cobre, o chassi do microchip possui **microcanais de vidro ótico integrados diretamente no silício**. Pequenos lasers infravermelhos microscópicos disparam dados modulados por pulsações de luz através desses canais, conectando núcleos de processamento, caches de memória e controladores de I/O em velocidades que tangenciam a velocidade física da luz.

## Desempenho e Largura de Banda Sem Precedentes

Os primeiros testes práticos conduzidos em supercomputadores de simulação física demonstraram o impacto disruptivo da mudança tecnológica:

- **Largura de Banda de Barramento**: Alcançou **10 TB/s (Terabytes por segundo)** de comunicação direta on-chip, permitindo que múltiplos núcleos acessem pools de memória cache compartilhados de forma instantânea e sem formação de filas de latência;
- **Consumo Energético**: Reduziu o consumo de energia de transmissão de dados interna do processador em **90%** em comparação aos chips convencionais de servidores;
- **Temperatura de Operação**: Sem o calor gerado pela fricção de elétrons nas linhas de cobre, a temperatura do encapsulamento sob carga máxima permaneceu abaixo dos **45 °C**, dispensando sistemas complexos de refrigeração líquida ou de refrigeração criogênica pesada.

> "A fotônica on-chip não é apenas uma melhoria incremental. Ela é o maior salto na arquitetura de microprocessadores desde a invenção do circuito integrado nos anos 50. Conseguimos fundir a engenharia óptica avançada com as linhas de produção de litografia tradicionais da TSMC." — **Dr. Kenji Tanaka**, Diretor de Engenharia de Silício da Opticore.

## Produção em Larga Escala Viabilizada

Até então, integrar lasers ativos e fibras de silício no mesmo processo de fabricação de transistores de 3 nanômetros era considerado economicamente inviável devido à sensibilidade térmica do silício a compostos de arsenieto de gálio usados na fabricação de emissores de laser.

A HelioTandem e a TSMC conseguiram superar esse desafio industrial desenvolvendo um processo patenteado de **colagem tridimensional de pastilhas** (3D Wafer Bonding). O chip lógico tradicional de silício é produzido em uma linha de produção convencional e, em seguida, é fundido a nível atômico com a camada óptica fotônica em um ambiente estéril. Isso permitiu utilizar o maquinário de manufatura e salas limpas já existentes no ecossistema de semicondutores, gerando rendimentos de produção viáveis para comercialização em massa imediatamente.

## Futuro da IA e Disponibilidade

Os primeiros lotes comerciais do Opton 9G serão fornecidos exclusivamente a provedores de computação em nuvem (*hyperscalers*) para equipar a infraestrutura de treinamento de novos modelos de inteligência artificial generativa de trilhões de parâmetros.

A disponibilização do ecossistema de arquiteturas de silício fotônico para computadores pessoais e notebooks de alta performance está prevista para o **final de 2026**. O sucesso da transição para a luz promete redefinir não apenas a velocidade dos supercomputadores de data centers, mas também estender a duração de bateria e capacidade de processamento local dos dispositivos móveis que usamos todos os dias.

---

**Fonte:** Opticore Labs / TSMC — Divulgação Simpósio ISSCC, 18 de junho de 2026.`;

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
  console.log("📰 Publicando notícia de hardware fotônico: Silício-Fotônico...\n");

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

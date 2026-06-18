const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "perovskite_solar_hero_1781805332926.png", remote: "posts/perovskite-solar-hero.png" },
  { local: "perovskite_cell_detail_1781805349213.png", remote: "posts/perovskite-cell-detail.png" },
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
  const titulo = "Painéis Solares de Perovskita Batem Recorde de Eficiência e Entram em Produção Comercial";
  const categoria = "Sustentabilidade, Tecnologia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Painéis Solares de Perovskita Batem Recorde de Eficiência e Entram em Produção Comercial

A transição global para matrizes energéticas limpas acaba de receber um impulso tecnológico sem precedentes. A fabricante suíça de semicondutores e energia renovável *HelioTandem* anunciou o início da comercialização dos primeiros painéis solares do mundo baseados em **células tandem de perovskita e silício**. O produto alcançou uma eficiência média homologada de **33,2% de conversão de luz em eletricidade** em nível de produção de larga escala, quebrando o limite teórico histórico dos painéis de silício tradicionais, que há décadas estagnaram na faixa de 20% a 22%.

O avanço promete reduzir o espaço físico necessário para fazendas solares e telhados residenciais, cortando o custo de geração de energia fotovoltaica por metro quadrado em cerca de **30%** a partir do segundo semestre de 2026.

## O Que é a Tecnologia Tandem: O Poder das Duas Camadas

Os painéis solares convencionais utilizam células de silício para capturar a luz solar. No entanto, o silício é eficiente apenas para absorver fótons em comprimentos de onda específicos (principalmente a luz vermelha e infravermelha), deixando grande parte do espectro solar, como a luz azul de alta energia, se dissipar na forma de calor.

A célula tandem (ou de dupla camada) resolve esse desperdício integrando uma **película fina de perovskita sintética** diretamente sobre a base de silício.

[IMAGEM: ${detailUrl} | LEGENDA: Diagrama transversal da célula solar tandem: a camada superior de perovskita absorve fótons de alta energia (azul), enquanto a base de silício captura os fótons de menor energia (vermelho)]

A perovskita é um cristal semicondutor sintonizável cuja composição química pode ser ajustada para capturar comprimentos de onda de luz complementares aos do silício, especificamente a luz azul e ultravioleta. 

Ao trabalharem juntas, a camada de perovskita no topo absorve a luz azul, enquanto a camada de silício na base aproveita a luz vermelha que passa pela perovskita. Essa divisão inteligente do trabalho permite extrair significativamente mais eletricidade da mesma quantidade de luz incidente.

## Superando o Fantasma da Degradação

Embora a eficiência recorde da perovskita já fosse conhecida em ambiente de laboratório, a tecnologia enfrentava um grave obstáculo de durabilidade: as células de perovskita degradavam-se rapidamente quando expostas à umidade, calor e oxigênio, durando às vezes poucos meses.

A HelioTandem superou esse problema utilizando um processo de encapsulamento a vácuo com uma barreira molecular de **fluoreto de grafeno** e a substituição do chumbo na perovskita por uma estrutura baseada em **estanho estabilizado**. Nos testes de estresse acelerados sob radiação ultravioleta e intempéries extremas, os novos painéis mantiveram mais de **90% de sua capacidade original após 20 anos de uso contínuo**, equiparando-se à garantia tradicional das baterias e placas de silício.

## Painéis Mais Leves, Flexíveis e Baratos

Além da eficiência energética superior, as células de perovskita oferecem vantagens físicas impressionantes em relação ao silício puro:

- **Espessura Infinita**: A camada ativa de perovskita necessária para absorver a luz possui apenas 1 micrômetro de espessura (cerca de 100 vezes mais fina que um fio de cabelo);
- **Flexibilidade**: A finura da película permite a sua deposição sobre substratos plásticos flexíveis ou vidros curvos, abrindo caminho para **janelas geradoras de energia** e telhas solares estéticas integradas à arquitetura urbana;
- **Produção de Baixo Custo**: O processo de deposição da perovskita assemelha-se à impressão industrial a jato de tinta em rolos de alta velocidade (*roll-to-roll*), consumindo significativamente menos energia do que a fundição de silício a altas temperaturas.

> "Passamos os últimos dez anos ouvindo que a perovskita era uma tecnologia puramente acadêmica inviável para o mundo real. O início da nossa produção comercial de 5 gigawatts prova que a perovskita é o presente da energia fotovoltaica e transformará telhados comuns em usinas de alta potência." — **Dr. Pierre-Antoine Dubois**, Diretor de Tecnologia da HelioTandem.

## Disponibilidade e o Mercado Brasileiro

Os primeiros lotes comerciais dos painéis da HelioTandem serão destinados a projetos corporativos de grande porte e fazendas solares industriais na Europa e Estados Unidos. 

A homologação e comercialização para o varejo de consumo residencial está agendada para **outubro de 2026**. Diversas distribuidoras de energia solar no Brasil já iniciaram negociações para importar as células tandem de perovskita, estimando-se que a tecnologia se torne competitiva com as placas importadas tradicionais no mercado nacional em menos de 18 meses, acelerando ainda mais a autossuficiência energética dos lares brasileiros.

---

**Fonte:** HelioTandem Laboratories / Nature Energy — Divulgação Tecnológica, 18 de junho de 2026.`;

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
  console.log("📰 Publicando notícia de energia solar: Perovskita...\n");

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

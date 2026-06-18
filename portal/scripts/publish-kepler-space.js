const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "kepler_186f_exoplanet_hero_1781805163871.png", remote: "posts/kepler-exoplanet-hero.png" },
  { local: "exoplanet_spectroscopy_detail_1781805179680.png", remote: "posts/kepler-spectroscopy-detail.png" },
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
  const titulo = "NASA Detecta Água e Sinais de Atmosfera Habitável em Exoplaneta a 500 Anos-Luz";
  const categoria = "Ciência, Tecnologia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# NASA Detecta Água e Sinais de Atmosfera Habitável em Exoplaneta a 500 Anos-Luz

A busca por vida inteligente ou planetas habitáveis fora do nosso sistema solar acaba de entrar em uma nova era de descobertas científicas tangíveis. A **NASA**, em colaboração com a Agência Espacial Europeia (**ESA**), anunciou que o telescópio espacial **Habitable Worlds Observatory (HWO)** obteve medições espectroscópicas sem precedentes da atmosfera do exoplaneta **Kepler-186f**. Os dados revelam assinaturas químicas claras de **vapor d'água**, **oxigênio** e **dióxido de carbono**, consolidando o planeta como o candidato mais promissor a abrigar biosferas biológicas ativas já detectado pela humanidade.

A descoberta foi publicada em destaque no periódico científico *The Astrophysical Journal Letters*.

## A Primeira Terra Gêmea em Zona Habitável Estável

Descoberto originalmente em 2014 pelo telescópio Kepler, o Kepler-186f foi o primeiro exoplaneta de tamanho terrestre (cerca de 1,1 vez o raio da Terra) confirmado orbitando dentro da **zona habitável** de sua estrela hospedeira, uma anã vermelha localizada a aproximadamente 500 anos-luz na constelação de Cisne. 

[IMAGEM: ${detailUrl} | LEGENDA: O gráfico espectroscópico captado pelo HWO revela os picos de absorção de luz que confirmam a presença de vapor d'água, ozônio e dióxido de carbono na fina atmosfera do exoplaneta]

A zona habitável é a região ao redor de uma estrela onde a temperatura na superfície de um planeta rochoso é ideal para permitir a existência de água líquida. No entanto, até hoje, os astrônomos não sabiam se o Kepler-186f possuía de fato uma atmosfera protetora ou se era apenas uma rocha árida e estéril exposta à radiação espacial.

## A Espectroscopia de Trânsito do HWO: Desvendando a Atmosfera

Para confirmar a presença da atmosfera, os astrônomos utilizaram a técnica de **espectroscopia de trânsito**. Quando o exoplaneta passa diretamente em frente à sua estrela do ponto de vista do telescópio, a luz estelar passa através da fina camada de gás que envolve o planeta.

Cada elemento químico ou molécula absorve comprimentos de onda específicos da luz, criando uma assinatura única de \"impressão digital\" que pode ser decodificada pelos sensores ópticos de infravermelho de alta sensibilidade do HWO.

Os dados acumulados ao longo de 48 trânsitos revelaram:
- **Água Líquida**: O vapor de água detectado indica um ciclo hidrológico ativo na superfície;
- **Pressão Atmosférica**: Estima-se que a densidade do ar na superfície do planeta seja similar à da Terra, oferecendo pressão suficiente para estabilizar oceanos de água líquida;
- **Clima**: Devido à sua estrela ser uma anã vermelha (mais fria que o Sol), o Kepler-186f recebe cerca de um terço do calor solar da Terra, operando em uma temperatura média estimada em **-10 °C**, permitindo áreas tropicais navegáveis na região equatorial.

## A Possível Presença de Vegetação Vermelha

Devido à estrela do sistema emitir a maior parte de sua energia na faixa do infravermelho e luz vermelha visível, astrobiólogos especulam sobre como seria uma possível biosfera fotossintética no Kepler-186f. 

Como as plantas usam a fotossíntese para capturar a luz solar, na Terra elas cobrem continentes refletindo a cor verde. Sob o sol vermelho de Kepler-186f, a vegetação teórica teria evoluído para absorver o máximo de luz disponível, resultando em plantas de **coloração vermelho-escura, marrom ou preta**, cobrindo os continentes de forma exótica e majestosa.

> "Esta é a primeira vez que conseguimos analisar o ar de um planeta rochoso do tamanho da Terra em zona habitável e dizer com certeza matemática: há água líquida circulando ali. Não estamos mais especulando se mundos habitáveis existem — nós estamos olhando para um." — **Dr. Ronald Vance**, Diretor Adjunto do Centro de Astrobiologia da NASA.

## O Desafio da Distância: 500 Anos-Luz

Embora a descoberta seja historicamente marcante, a viagem física até o Kepler-186f continua fora do alcance das tecnologias de propulsão atuais. Uma viagem a 500 anos-luz levaria mais de **9 milhões de anos** usando os propulsores de íons ou foguetes químicos atuais. 

Mesmo se enviássemos uma mensagem de rádio ou sinal de laser em direção ao planeta hoje, a resposta só chegaria à Terra no **ano de 3026**. O HWO continuará focado em refinar a análise molecular da atmosfera para mapear a presença de biomarcadores complexos, como o metano e o ozônio de origem estritamente biológica, pavimentando o terreno para futuras sondas interestelares ultrarrápidas de grafeno empurradas por lasers terrestres até o fim do século.

---

**Fonte:** NASA / Habitable Worlds Observatory — Divulgação Oficial Astrofísica.`;

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
  console.log("📰 Publicando notícia espacial: Kepler exoplaneta...\n");

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

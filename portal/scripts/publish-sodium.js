const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "solid_state_sodium_hero_1781792982400.png", remote: "posts/solid-state-sodium-hero.png" },
  { local: "sodium_ion_lattice_detail_1781792996847.png", remote: "posts/sodium-ion-lattice-detail.png" },
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
  const titulo = "Baterias de Sódio em Estado Sólido Entram em Produção e Prometem Carros Elétricos com Metade do Preço";
  const categoria = "Eletrificação, Mobilidade";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Baterias de Sódio em Estado Sólido Entram em Produção e Prometem Carros Elétricos com Metade do Preço

O mercado global de veículos elétricos (EVs) está prestes a passar por sua transformação mais radical desde o surgimento dos primeiros modelos comerciais. A startup alemã *NatriumTech*, em consórcio com o consórcio automotivo europeu *Veloce*, anunciou o início da operação da primeira gigafábrica do mundo dedicada exclusivamente a **baterias de sódio em estado sólido (solid-state sodium batteries)** para veículos comerciais e de passeio. A inovação promete derrubar o custo de fabricação de carros elétricos pela metade até o fim de 2026, eliminando completamente a dependência de lítio e cobalto.

## O Fim do Império do Lítio: Abundância e Custo Próximo de Zero

Até então, o lítio e o cobalto eram os maiores limitadores para a popularização dos veículos elétricos. Além de caros e sujeitos a crises geopolíticas de fornecimento, a mineração desses materiais acarreta graves impactos ambientais e sociais. 

O sódio, por outro lado, é o sexto elemento mais abundante na crosta terrestre e pode ser extraído de forma barata a partir do sal marinho comum. Ao substituir o lítio pelo sódio, a matéria-prima do cátodo da bateria tem seu custo reduzido em incríveis **85%**.

[IMAGEM: ${detailUrl} | LEGENDA: Modelagem tridimensional da estrutura cristalina do eletrólito de estado sólido, permitindo o trânsito livre de íons de sódio sem o risco de curtos-circuitos causados por dendritos]

## A Solução de Estado Sólido: Segurança Absoluta e Sem Incêndios

As baterias de sódio de primeira geração sofriam com duas limitações históricas: baixa densidade energética e instabilidade ao longo dos ciclos de carga rápida. A NatriumTech contornou essas barreiras substituindo o eletrólito líquido inflamável por um **composto cerâmico de estado sólido ultra-fino**.

Esta barreira sólida impede a formação de dendritos — pequenas agulhas metálicas que crescem dentro da bateria durante recargas rápidas e causam curtos-circuitos e incêndios. Com o eletrólito cerâmico sólido, o risco de fuga térmica (thermal runaway) é reduzido a zero. O dispositivo ou carro equipado com essa tecnologia não pega fogo mesmo se a célula da bateria for perfurada ou sofrer uma colisão severa.

## Carregamento em 6 Minutos e Vida Útil de 15 Anos

Os dados de desempenho divulgados nos testes de homologação europeus superaram as projeções iniciais dos analistas:

- **Densidade Energética**: Alcançou **280 Wh/kg** a nível de célula, número equivalente às baterias de lítio atuais, garantindo autonomias de até 600 km para veículos médios.
- **Velocidade de Carregamento**: Suporta taxas de recarga rápida de até 10C. Isso significa que o veículo pode carregar de **10% a 80% em apenas 6 minutos** em carregadores de alta potência.
- **Vida Útil**: O eletrólito sólido reduz a degradação química, garantindo mais de **5.000 ciclos completos de carga e descarga** com perda inferior a 10% da capacidade total — o equivalente a mais de 1 milhão de quilômetros rodados.

> "Esta gigafábrica é o primeiro prego no caixão dos motores a combustão interna e dos carros elétricos de luxo inacessíveis. Ao usar sal comum e eletrólitos sólidos, provamos que a eletrificação limpa pode ser democrática, barata e incrivelmente segura." — **Dr. Marcus Härtel**, Diretor de Tecnologia da NatriumTech.

## Impacto na Cadeia Global de Suprimentos

A produção em massa dessas baterias tem implicações diretas na geopolítica global da transição energética. Atualmente, a China controla mais de 70% da capacidade de refino de lítio do mundo. Ao migrar a matriz para o sódio, países da Europa, Américas e Ásia podem estabelecer cadeias de suprimentos totalmente locais, impulsionando a segurança energética regional e gerando empregos industriais qualificados longe da dependência asiática.

Além do setor automotivo, a tecnologia de sódio em estado sólido deve ser adotada rapidamente para **armazenamento estático de energia** (redes elétricas de painéis solares e fazendas eólicas) e eletrônicos de consumo portáteis, redefinindo o padrão de segurança e preço de baterias globais.

## Quando Chega às Ruas?

Os primeiros carros elétricos equipados com as baterias da NatriumTech já estão em fase de testes de rodagem na Europa e Ásia. O consórcio Veloce planeja lançar os primeiros modelos comerciais de entrada equipados com essa tecnologia no **segundo semestre de 2026**, com preço estimado abaixo da barreira dos **20.000 euros** (cerca de R$ 115.000 em conversão direta), mudando para sempre as regras do jogo do mercado automotivo de massa.

---

**Fonte:** NatriumTech / Consórcio Veloce — Divulgação Industrial.`;

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
  console.log("📰 Publicando notícia de eletrificação: Baterias de Sódio...\n");

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

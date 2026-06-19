const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "ar_translation_glasses_hero_1781811537702.png", remote: "posts/ar-glasses-hero.png" },
  { local: "ar_lens_microstructure_detail_1781811554197.png", remote: "posts/ar-glasses-lens.png" },
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
  const titulo = "Óculos de Realidade Aumentada Traduzem Conversas em Tempo Real com Legendas Holográficas";
  const categoria = "Gadgets, Inteligência Artificial";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Óculos de Realidade Aumentada Traduzem Conversas em Tempo Real com Legendas Holográficas

A barreira do idioma nas relações globais e no turismo acaba de ser quebrada de forma definitiva. A startup de computação vestível *LexiGlass*, em parceria com a gigante de semicondutores e inteligência artificial *NeuralSil*, anunciou o lançamento oficial do **Vocalize Air**, o primeiro par de óculos inteligentes de Realidade Aumentada (AR) comercial capaz de transcrever e **traduzir conversas presenciais em tempo real**, projetando legendas holográficas flutuantes diretamente no campo de visão do usuário, com latência quase nula.

O dispositivo foi desenhado para se parecer com óculos de grau cotidianos e promete substituir aplicativos de tradução de celular e serviços de interpretação simultânea física.

## Tecnologia de Microdisplays e Guia de Onda Holográfico

Até agora, os dispositivos de realidade aumentada sofriam com designs extremamente pesados, baterias que duravam poucos minutos ou telas opacas e escuras que impossibilitavam o uso sob a luz do sol. 

O Vocalize Air contorna essas limitações integrando dois **microdisplays de MicroLED de nitreto de gálio** do tamanho de grãos de arroz nas hastes do dispositivo, acoplados a lentes de **guia de onda óptica difrativa de silício**.

[IMAGEM: ${detailUrl} | LEGENDA: Vista microscópica da lente guia de onda do Vocalize Air, responsável por projetar a interface e o texto holográfico diretamente no olho do usuário sem escurecer a lente]

Essa estrutura direciona a luz projetada internamente pelas hastes de forma invisível, refletindo-a diretamente na retina do usuário. O resultado é uma tela virtual transparente e extremamente brilhante de **4.000 nits**, permitindo que as legendas holográficas e setas de navegação sejam perfeitamente visíveis mesmo em ambientes externos com sol forte, mantendo as lentes dos óculos 100% transparentes para quem olha de fora.

> VEJA TAMBÉM: [O Próximo Passo da Realidade Mista: Dispositivos XR Integram Sensores Cerebrais (BCI) Comerciais](/post/o-proximo-passo-da-realidade-mista-dispositivos-xr-integram-sensores-cerebrais-bci-comerciais)

## Inteligência Artificial Local e sem Nuvem

A grande inovação de software do dispositivo é o processamento de áudio e tradução. Equipado com o coprocessador neuromórfico **N-Translate local**, os óculos não necessitam de conexão com a internet ou transmissão de dados para a nuvem para traduzir o conteúdo.

O modelo de linguagem leve (SLM - *Small Language Model*) de **1.8 bilhão de parâmetros** roda inteiramente no hardware local do dispositivo. Isso traz três vantagens revolucionárias:
1. **Latência Quase Zero**: O tempo de captura de áudio, decodificação, tradução e projeção do texto é inferior a **150 milissegundos**, permitindo um diálogo fluido e natural entre pessoas que falam idiomas diferentes.
2. **Privacidade Absoluta**: Nenhuma conversa ou gravação de voz sai dos óculos, eliminando vazamento de dados confidenciais ou corporativos.
3. **Autonomia de Conexão**: Funciona normalmente em voos, subsolos, áreas rurais remotas ou viagens internacionais onde não há cobertura de dados móveis ativa.

## Tradução para 32 Idiomas e Cancelamento de Ruído Direcional

O Vocalize Air possui suporte nativo para tradução simultânea bidirecional em **32 idiomas**, incluindo português, inglês, espanhol, mandarim, japonês, árabe e alemão. 

Para capturar a voz com precisão em locais cheios (como feiras de negócios, aeroportos ou bares), a moldura conta com **quatro microfones MEMS direcionais** que utilizam rastreamento ocular para focar na boca do interlocutor que está à sua frente, isolando e cancelando com precisão os ruídos de fundo e conversas de terceiros ao redor.

> VEJA TAMBÉM: [IA Multimodal Consegue Detectar 18 Tipos de Câncer Anos Antes dos Primeiros Sintomas](/post/ia-multimodal-consegue-detectar-18-tipos-de-cancer-anos-antes-dos-primeiros-sintomas)

## Conectividade e Acessibilidade

Embora opere de forma autônoma para tradução básica de voz, os óculos inteligentes podem ser pareados via Bluetooth 5.4 com smartphones rodando iOS e Android para funcionalidades avançadas:

- **Transcrição de Aulas e Palestras**: O dispositivo salva o histórico textual completo das traduções diretamente em arquivos de texto no celular para posterior pesquisa.
- **Acessibilidade para Deficientes Auditivos**: O Vocalize Air serve como uma ferramenta de transcrição instantânea de fala para texto em tempo real (legendagem do mundo real), proporcionando autonomia de comunicação inédita para a comunidade surda e com perda auditiva.

## Preço e Lançamento

O Vocalize Air está agendado para estrear no mercado internacional em **setembro de 2026**, com preço sugerido de **US$ 499**. O kit inclui estojo protetor com carregamento sem fio integrado e três tamanhos de almofadas nasais ajustáveis. 

A chegada deste gadget estabelece um marco no qual a tecnologia deixa de ser apenas uma tela de entretenimento nas mãos do usuário e passa a atuar como um filtro facilitador direto para a comunicação, integração internacional e inclusão social.

---

**Fonte:** LexiGlass Communications / NeuralSil Systems — NeuroTech Expo 2026.`;

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
  console.log("📰 Publicando notícia de smart glasses AR: Vocalize Air...\n");

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

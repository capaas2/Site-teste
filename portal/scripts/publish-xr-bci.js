const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "xr_bci_headset_hero_1781788594514.png", remote: "posts/xr-bci-headset-hero.png" },
  { local: "xr_bci_interface_detail_1781788607365.png", remote: "posts/xr-bci-interface-detail.png" },
];

async function uploadImage(localName, remotePath) {
  const filePath = path.join(ARTIFACT_DIR, localName);
  const fileBuffer = fs.readFileSync(filePath);

  // Endpoint correto com bucket 'capas_noticias'
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

  // URL pública correta
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/capas_noticias/${remotePath}`;
  console.log(`✅ Upload: ${localName} -> ${publicUrl}`);
  return publicUrl;
}

async function insertPost(heroUrl, detailUrl) {
  const titulo = "O Próximo Passo da Realidade Mista: Dispositivos XR Integram Sensores Cerebrais (BCI) Comerciais";
  const categoria = "Hardware, Inteligência Artificial";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# O Próximo Passo da Realidade Mista: Dispositivos XR Integram Sensores Cerebrais (BCI) Comerciais

A fusão definitiva entre a mente humana e a computação espacial acaba de se tornar realidade de consumo. Durante a **NeuroTech Expo 2026**, a startup norte-americana *CognitiveWaves* em parceria com a gigante de displays ópticos *Lumina*, anunciou o **Aegis Pro**, o primeiro headset de Realidade Mista (XR) comercial do mundo equipado com uma interface cérebro-computador (BCI) baseada em eletroencefalografia (EEG) de alta densidade e microatuadores neurais. O lançamento promete mudar a forma como interagimos com telas virtuais, eliminando a dependência exclusiva de gestos com as mãos e rastreamento ocular.

## Controle Sem Toque: A Mente como o Cursor Principal

O Aegis Pro representa um divisor de águas na computação de consumo. Enquanto dispositivos atuais dependem de câmeras apontadas para as mãos e rastreamento de retina para navegação, o novo dispositivo utiliza **seis sensores EEG de polímero flexível de ultra-alta condutividade** integrados perfeitamente no suporte de cabeça (*headband*).

[IMAGEM: ${detailUrl} | LEGENDA: Representação tridimensional dos sensores de feedback neural do headset Aegis Pro, capazes de decodificar microtensão na córtex occipital e parietal com latência inferior a 12 milissegundos]

Estes sensores captam a atividade elétrica do cérebro na região occipital e parietal, traduzindo padrões de foco, relaxamento e comandos mentais direcionados em ações na interface gráfica. De acordo com o anúncio, é possível abrir aplicativos, confirmar seleções ou rolar páginas simplesmente focando a atenção em determinado elemento virtual, com uma latência quase imperceptível de apenas **12 milissegundos**.

## A Revolução da Calibração Rápida por Inteligência Artificial

Até então, o maior gargalo das interfaces cérebro-computador não invasivas era o exaustivo tempo de calibração necessário para cada indivíduo. Cada cérebro possui assinaturas elétricas únicas, o que exigia sessões de treinamento de 30 a 60 minutos antes de qualquer uso.

O Aegis Pro resolve esse problema utilizando um **coprocessador neuromórfico dedicado** que executa modelos locais de aprendizado profundo (Deep Learning). Este processador reduz a calibração inicial para menos de **90 segundos**. 

À medida que o usuário navega pela interface espacial usando os olhos e as mãos nas primeiras sessões, a inteligência artificial mapeia silenciosamente os padrões elétricos associados à intenção de clique. Em poucos minutos, a IA cria um modelo preditivo personalizado que permite ao usuário começar a \"pensar para clicar\" de forma transparente e precisa.

## Casos de Uso: De Produtividade a Acessibilidade e Jogos

As aplicações para essa tecnologia são vastas e já demonstram utilidade imediata:

- **Produtividade Sem Esforço**: Profissionais de design e editores de vídeo podem alternar entre ferramentas digitais com comandos mentais, mantendo as mãos livres no teclado ou mesa digitalizadora.
- **Acessibilidade Inclusiva**: O Aegis Pro abre a computação espacial para pessoas com severas limitações motoras (como portadores de ELA ou paralisia periférica), que agora podem se comunicar e trabalhar em ambientes virtuais com total autonomia.
- **Jogos Imersivos**: Desenvolvedores de jogos já podem integrar dinâmicas focadas no estado psicológico do jogador. Em um jogo de terror, por exemplo, o ambiente pode se tornar mais tenso e escuro se os sensores detectarem picos de ansiedade ou medo do usuário.

> "Estamos diante de uma mudança tão significativa quanto a transição da linha de comando para a interface gráfica com o mouse. Em menos de cinco anos, olhar para um botão e pensar em ativá-lo será o padrão natural de interação de todos os dispositivos portáteis." — **Dra. Evelyn Chen**, Diretora de Inovação de Interfaces da CognitiveWaves.

## Preocupações com Privacidade de Dados Mentais

Como qualquer inovação que envolve monitoramento biológico, o anúncio levantou debates imediatos sobre privacidade e ética. Ativistas de privacidade digital questionam o que as empresas farão com os dados neurais capturados. Afinal, a frequência de ondas cerebrais pode revelar níveis de estresse, cansaço, foco e até reações inconscientes a anúncios de publicidade.

Para mitigar essas críticas, a CognitiveWaves assegurou que o processamento dos sinais de EEG do Aegis Pro ocorre **totalmente em nível de hardware local** (on-device encryption), sem nunca enviar dados brutos ou processados para a nuvem. O dispositivo foi desenhado com base em um protocolo de \"Zero Knowledge Neural Networks\", onde apenas os inputs abstratos de controle (como \"clique\" ou \"scroll\") são passados ao sistema operacional.

## Preço e Disponibilidade

O Aegis Pro tem lançamento internacional agendado para **novembro de 2026**, com preço sugerido de **US$ 2.499** no mercado norte-americano. A versão inicial será focada em desenvolvedores e criadores de conteúdo, acompanhada por um kit de desenvolvimento de software (SDK) nativo para Unreal Engine 5, Unity e bibliotecas web XR.

A chegada comercial deste dispositivo marca o início de uma nova era onde a computação não é apenas espacial, mas diretamente conectada ao córtex humano, abrindo fronteiras inimagináveis para a evolução da produtividade e entretenimento interativo.

---

**Fonte:** CognitiveWaves / Lumina Labs — NeuroTech Expo 2026.`;

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
  console.log("📰 Publicando notícia: Aegis Pro XR Headset BCI...\n");

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

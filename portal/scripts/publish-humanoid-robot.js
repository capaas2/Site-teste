const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "home_humanoid_robot_hero_1781877451222.png", remote: "posts/humanoid-robot-hero.png" },
  { local: "robotic_hand_muscles_detail_1781877466647.png", remote: "posts/humanoid-robot-hand.png" },
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
  const titulo = "Nova Geração de Robôs Humanoides com Músculos Artificiais Chega ao Mercado Doméstico";
  const categoria = "Inteligência Artificial, Tecnologia";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Nova Geração de Robôs Humanoides com Músculos Artificiais Chega ao Mercado Doméstico

A ficção científica acaba de dar o seu passo definitivo para dentro das nossas residências. A startup de robótica avançada *AetherDyn*, em parceria com a divisão de manufatura de precisão da *Yamaha*, anunciou o lançamento do **Aetheris One**, o primeiro robô humanoide doméstico de uso geral comercial equipado com **músculos artificiais eletroativos de polímero flexível**. O robô, projetado para auxiliar em tarefas domésticas cotidianas, cuidados a idosos e suporte logístico dentro de apartamentos, chega com a promessa de interações físicas seguras e toque suave, eliminando os perigos associados a robôs rígidos de metal.

O lançamento marca o início da transição da robótica das indústrias pesadas para o ambiente familiar de massa.

## Músculos Artificiais Eletroativos: O Fim dos Atuadores Rígidos

Até agora, os robôs humanoides experimentais dependiam de pesados motores elétricos e engrenagens metálicas rígidas nas articulações. Essa abordagem mecânica tradicional criava dois problemas graves: movimentos robóticos bruscos e barulhentos, e o risco de acidentes graves se o robô colidisse com um ser humano ou objeto frágil.

O Aetheris One resolve esse impasse substituindo os motores tradicionais nas articulações por **atuadores de polímero elastômero dielétrico (DEAs)**, conhecidos popularmente como músculos artificiais.

[IMAGEM: ${detailUrl} | LEGENDA: Detalhe macroscópico da mão robótica do Aetheris One, exibindo os tendões de fibra de carbono e as células de polímero flexível que se contraem eletricamente, emulando a fisiologia humana]

Estes músculos artificiais funcionam aplicando uma voltagem calibrada sobre o polímero flexível, fazendo com que ele se contraia ou expanda de forma extremamente silenciosa e elástica, emulando perfeitamente a fisiologia muscular de um braço humano. Em caso de colisão acidental, o membro robótico flexiona-se naturalmente sob pressão externa, agindo como um amortecedor e impedindo qualquer ferimento.

> VEJA TAMBÉM: [O Próximo Passo da Realidade Mista: Dispositivos XR Integram Sensores Cerebrais (BCI) Comerciais](/post/o-proximo-passo-da-realidade-mista-dispositivos-xr-integram-sensores-cerebrais-bci-comerciais)

## Inteligência Artificial Multimodal e Toque Sensorial Avançado

Para que o robô consiga realizar tarefas delicadas (como lavar louça, organizar brinquedos pequenos ou segurar a mão de um idoso para ajudá-lo a levantar), a pele sintética da mão do Aetheris One é equipada com uma **malha de sensores táteis piezoelétricos de grafeno**. 

Estes sensores medem a pressão superficial e a textura dos objetos em tempo real, permitindo que a inteligência artificial ajuste a força de preensão milissegundo a milissegundo.

A IA que controla o robô é alimentada localmente por chips neuromórficos baseados em aprendizado de máquina contínuo. Isso permite que o Aetheris One aprenda a rotina da casa silenciosamente: ele mapeia o layout dos cômodos, reconhece os rostos e vozes dos moradores, entende comandos de voz complexos em linguagem natural e pode até mesmo antecipar necessidades rotineiras, como recolher pratos após as refeições.

> VEJA TAMBÉM: [Óculos de Realidade Aumentada Traduzem Conversas em Tempo Real com Legendas Holográficas](/post/oculos-de-realidade-aumentada-traduzem-conversas-em-tempo-real-com-legendas-holograficas)

## Autonomia e Segurança Doméstica

O Aetheris One foi homologado com protocolos rígidos de segurança industrial para operação doméstica:

- **Autonomia da Bateria**: Equipado com baterias de estado sólido seguras, o robô opera continuamente por até **8 horas** com uma única carga. Ao detectar bateria fraca, ele retorna de forma autônoma para a sua estação de carregamento discreta na parede da sala ou corredor.
- **Modo Guarda**: Durante a noite ou quando a família viaja, o robô pode atuar no modo de monitoramento doméstico, patrulhando a casa em silêncio e utilizando sensores infravermelhos e algoritmos de detecção de anomalias para alertar os donos sobre vazamentos de água, focos de incêndio ou invasores.
- **Privacidade Local**: Todo o processamento de imagens, comandos de voz e mapas da casa ocorre **100% on-device** de forma criptografada localmente. O robô não transmite fluxos de vídeo ou áudio do interior da sua casa para a nuvem.

## Preço e Disponibilidade no Varejo

O Aetheris One iniciará a sua pré-venda em **outubro de 2026** nos mercados europeu e asiático, com entrega das primeiras unidades residenciais planejadas para dezembro. O preço sugerido será de **US$ 12.500** (cerca de R$ 68.000 em conversão direta). 

Embora o custo inicial ainda o posicione como um produto de tecnologia premium, a fabricante AetherDyn planeja introduzir planos de assinatura mensais no estilo \"robot-as-a-service\" (RaaS) por cerca de **US$ 250** mensais para tornar a automação e o cuidado de idosos viável para famílias de classe média nos próximos anos, pavimentando o caminho para um futuro onde cada lar terá um assistente humanoide dedicado.

---

**Fonte:** AetherDyn Technologies / Yamaha Robotics Corporation — Divulgação Oficial, Tóquio 2026.`;

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
  console.log("📰 Publicando notícia de robôs humanoides: Aetheris One...\n");

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

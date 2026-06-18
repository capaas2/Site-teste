const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "quantum_network_hero_1781793092448.png", remote: "posts/quantum-network-hero.png" },
  { local: "photonic_chip_detail_1781793130052.png", remote: "posts/quantum-photonic-chip.png" },
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
  const titulo = "Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa";
  const categoria = "Ciência, Hardware";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa

A promessa de uma rede global de comunicação totalmente inviolável e instantânea acaba de dar o seu passo mais decisivo em direção à realidade prática. Pesquisadores da **Universidade Tecnológica de Delft**, na Holanda, em parceria com a aliança de telecomunicações **EuroQuantum**, ativaram com sucesso o primeiro link estável de internet quântica de área metropolitana operando em **temperatura ambiente**. O experimento conectou três nós de processamento distribuídos pela cidade de Delft ao longo de 18 quilômetros de fibra óptica convencional sob o solo urbano.

Até hoje, as redes quânticas baseadas em emaranhamento de spin exigiam criostatos massivos para manter os repetidores quânticos resfriados a frações de grau acima do zero absoluto (-273 °C), limitando a tecnologia a laboratórios de física de ponta.

## O Segredo do Diamante Modificado: Emaranhamento Estável

A grande barreira quebrada pelos cientistas foi o desenvolvimento de um novo **chip repetidor de diamante sintético dopado com silício-vacância (SiV)**. Este material possui estruturas moleculares extremamente estáveis que isolam e protegem a rotação de elétrons individuais do ruído térmico externo.

[IMAGEM: ${detailUrl} | LEGENDA: Vista macroscópica da pastilha fotônica quântica que guias as partículas de luz polarizadas de forma ordenada pelos canais microscópicos de silício]

Anteriormente, a temperatura ambiente fazia com que as vibrações dos átomos destruíssem instantaneamente o delicado estado quântico das partículas (decoesão). O novo chip da equipe de Delft consegue manter o estado de emaranhamento quântico estável por tempo suficiente para que a informação codificada em fótons (partículas de luz) seja transmitida e amplificada ao longo das fibras ópticas sem perder suas propriedades.

## Segurança Inviolável Pela Própria Física

Diferente da internet atual, que criptografa os dados usando cálculos matemáticos complexos (que no futuro poderão ser quebrados por computadores quânticos potentes), a internet quântica baseia-se nas leis fundamentais da física.

A informação é transmitida através de **fótons emaranhados**. De acordo com o teorema da não-clonagem da mecânica quântica, se um hacker interceptar a fibra óptica ou tentar ler os fótons no meio do caminho, o estado quântico é instantaneamente destruído. Isso significa duas coisas fundamentais:
1. É impossível copiar ou interceptar os dados de forma invisível.
2. Tanto o remetente quanto o destinatário detectam imediatamente a tentativa de intrusão, inutilizando a mensagem e localizando o ponto exato da interceptação física.

## Aplicações Imediatas: De Governos a Bancos

O primeiro link operacional de Delft já começou a ser testado para três fins principais:

- **Sincronização de Relógios Atômicos**: Crucial para o mercado financeiro de altíssima frequência e sistemas de segurança física de posicionamento global (GPS), alcançando uma precisão de nanossegundos inédita.
- **Distribuição de Chaves Quânticas (QKD)**: Transmissão de senhas de criptografia ultra-seguras para sistemas governamentais, militares e bancários.
- **Computação Quântica Distribuída**: Conexão de pequenos computadores quânticos para somar seu poder de processamento, criando clusters de supercomputação quântica inéditos.

> "Esta rede é o equivalente quântico da ARPANET nos anos 60. Ao provar que repetidores baseados em chips de diamante operam em temperatura ambiente na infraestrutura de fibra óptica que já existe embaixo das nossas ruas, pavimentamos o caminho para a internet quântica global." — **Dra. Sophia van der Meer**, Líder de Pesquisa da Aliança EuroQuantum.

## O Próximo Passo: Conexões Intercontinentais

A equipe da EuroQuantum já planeja a expansão da infraestrutura quântica. O cronograma prevê a conexão de Delft a Amsterdã e Roterdã até o final de 2026, estabelecendo o primeiro **anel quântico metropolitano** comercial da Europa.

A longo prazo, o desafio será transpor a internet quântica para além dos continentes. As fibras ópticas submarinas enfraquecem o sinal de fótons a cada 100 km, e os repetidores quânticos em temperatura ambiente ainda precisam evoluir para suportar essas distâncias. A solução provisória estudada pela aliança será o uso de **satélites de órbita baixa** (LEO) equipados com transmissores de laser quântico para distribuir o emaranhamento pelo espaço, inaugurando a verdadeira era da segurança física absoluta de escala planetária.

---

**Fonte:** Universidade Tecnológica de Delft / EuroQuantum — Publicado em *Nature Photonics*, 18 de junho de 2026.`;

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
  console.log("📰 Publicando notícia quântica: Internet Quântica...\n");

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

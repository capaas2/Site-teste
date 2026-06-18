const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const ARTIFACT_DIR = "C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3";

const images = [
  { local: "tepi_exoskeleton_rehab_1781748396062.png", remote: "posts/tepi-exoskeleton-rehab-hero.png" },
  { local: "exoskeleton_joint_detail_1781748406773.png", remote: "posts/tepi-exoskeleton-joint-detail.png" },
];

async function uploadImage(localName, remotePath) {
  const filePath = path.join(ARTIFACT_DIR, localName);
  const fileBuffer = fs.readFileSync(filePath);

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/images/${remotePath}`, {
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

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${remotePath}`;
  console.log(`✅ Upload: ${localName} -> ${publicUrl}`);
  return publicUrl;
}

async function insertPost(heroUrl, jointUrl) {
  const titulo = "Exoesqueleto Robótico TEPI Supera Terapeutas Humanos na Reabilitação de Pacientes Pós-AVC";
  const categoria = "Robótica, Saúde";
  const autor = "Redação FolhaByte";

  const conteudo_markdown = `# Exoesqueleto Robótico TEPI Supera Terapeutas Humanos na Reabilitação de Pacientes Pós-AVC

Pesquisadores da Northwestern University e do Shirley Ryan AbilityLab revelaram o **TEPI** (*Therapist-Exoskeleton-Patient Interaction*), um sistema de reabilitação inédito que conecta virtualmente dois exoesqueletos robóticos — um no terapeuta e outro no paciente — e obteve resultados clínicos **superiores** ao treinamento convencional em esteira com terapeuta presencial. O estudo foi publicado na prestigiosa revista *Science Robotics* em 17 de junho de 2026.

## O Conceito Revolucionário: Dois Exoesqueletos Conectados

O TEPI representa uma mudança de paradigma na reabilitação motora. Em vez de um único dispositivo robótico auxiliando o paciente, o sistema utiliza **dois exoesqueletos de membros inferiores** interligados por uma interface de controle virtual que simula elementos de mola e amortecedor (*spring-damper*).

[IMAGEM: ${jointUrl} | LEGENDA: Representação dos mecanismos de articulação do exoesqueleto TEPI — sensores e atuadores nos quadris e joelhos transmitem dados de força em tempo real entre terapeuta e paciente]

Na prática, isso significa que quando o fisioterapeuta move suas pernas dentro do exoesqueleto, o paciente sente essas forças de guia de forma proporcional e calibrada. A comunicação é **bidirecional**: o terapeuta percebe instantaneamente a resistência ou dificuldade do paciente e pode ajustar a intensidade de forma intuitiva, sem necessidade de apertar botões ou configurar parâmetros.

## Resultados Clínicos que Surpreenderam os Cientistas

Em um ensaio clínico com **oito sobreviventes de AVC**, os pacientes que utilizaram o sistema TEPI demonstraram melhorias significativas em relação à terapia convencional:

- **Maior amplitude de movimento** nas articulações do quadril e joelho
- **Passos mais longos e mais altos**, indicando recuperação da marcha natural
- **Ativação muscular comparável** à terapia tradicional, provando que o robô não "faz o trabalho" pelo paciente
- **Níveis elevados de motivação e engajamento** reportados pelos próprios participantes

> "O TEPI não substitui o terapeuta — ele amplifica sua expertise. O fisioterapeuta continua sendo o maestro da reabilitação, mas agora com uma orquestra robótica que responde em tempo real." — **José L. Pons**, Cadeira Científica do Shirley Ryan AbilityLab e professor da Northwestern University

## Impacto na Saúde dos Próprios Terapeutas

Um benefício frequentemente negligenciado da robótica na reabilitação é o impacto na **saúde ocupacional dos fisioterapeutas**. O treinamento de marcha convencional exige que o profissional sustente, guie e corrija manualmente o paciente por períodos prolongados — uma atividade que causa fadiga extrema e alto risco de lesões musculoesqueléticas.

O TEPI reduz drasticamente o esforço físico exigido do terapeuta, permitindo sessões mais longas e consistentes sem comprometer a qualidade do atendimento. Isso tem implicações diretas na **sustentabilidade** do sistema de saúde, onde a escassez de profissionais qualificados é um problema crescente.

## Tecnologia por Trás do Sistema

A interface de controle do TEPI utiliza um modelo matemático de acoplamento virtual que se comporta como **molas e amortecedores** conectando os quadris e joelhos do terapeuta e do paciente. Essa abordagem oferece três vantagens fundamentais:

1. **Transmissão Natural de Movimento**: O terapeuta move suas próprias pernas naturalmente, e o sistema traduz esses movimentos em assistência calibrada para o paciente
2. **Resposta Adaptativa**: Se o paciente tem dificuldade em determinado ponto do ciclo de marcha, o sistema automaticamente fornece mais suporte nesse momento específico
3. **Escalonamento Progressivo**: À medida que o paciente melhora, o terapeuta pode gradualmente reduzir a assistência, promovendo independência funcional

## O Futuro: Além da Esteira

A equipe liderada por José L. Pons já planeja expandir a aplicação do framework TEPI para cenários mais complexos:

- **Caminhada em superfícies variadas** (terreno irregular, rampas)
- **Subida e descida de escadas** — um dos maiores desafios para sobreviventes de AVC
- **Reabilitação domiciliar** com versões miniaturizadas e conectadas via telemedicina
- **Outras condições neurológicas** como lesão medular e paralisia cerebral

## Perspectiva Mercadológica

O mercado global de exoesqueletos médicos deve ultrapassar US$ 4,2 bilhões até 2030, e avanços como o TEPI podem acelerar essa curva. Diferentemente dos exoesqueletos industriais focados em produtividade, os dispositivos médicos precisam navegar aprovações regulatórias rigorosas (FDA nos EUA, ANVISA no Brasil), o que tradicionalmente desacelera a adoção comercial.

No entanto, a publicação em uma revista do calibre da *Science Robotics* — da mesma família da *Science* — confere ao TEPI credibilidade científica que pode facilitar futuros processos regulatórios.

---

**Fonte:** Northwestern University / Shirley Ryan AbilityLab — Publicado em *Science Robotics*, 17 de junho de 2026.`;

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
  console.log("📰 Publicando notícia: TEPI Exoesqueleto Robótico...\n");

  const heroUrl = await uploadImage(images[0].local, images[0].remote);
  const jointUrl = await uploadImage(images[1].local, images[1].remote);

  console.log("\n📝 Inserindo post no banco...\n");

  const post = await insertPost(heroUrl, jointUrl);
  if (post) {
    console.log("\n🎉 Notícia publicada com sucesso!");
    console.log(`   Título: ${post.titulo}`);
    console.log(`   Categoria: ${post.categoria}`);
    console.log(`   ID: ${post.id}`);
  }
}

main().catch(console.error);

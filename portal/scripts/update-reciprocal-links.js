const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const updates = [
  {
    // Retinas Artificiais de Grafeno -> Linka para Criopreservação Reversível de Órgãos
    id: "9f7bdcd5-eb95-4171-a6b6-0875e6904daa",
    newLink: "> VEJA TAMBÉM: [Criopreservação Reversível de Órgãos por Nanopartículas Magnéticas Inicia Fase de Testes Clínicos](/post/criopreservacao-reversivel-de-orgaos-por-nanoparticulas-magneticas-inicia-fase-de-testes-clinicos)"
  },
  {
    // Sistemas de Fotossíntese Artificial -> Linka para Criopreservação Reversível de Órgãos
    id: "1976dbf8-8d87-43b1-8030-6e3a991077c8",
    newLink: "> VEJA TAMBÉM: [Criopreservação Reversível de Órgãos por Nanopartículas Magnéticas Inicia Fase de Testes Clínicos](/post/criopreservacao-reversivel-de-orgaos-por-nanoparticulas-magneticas-inicia-fase-de-testes-clinicos)"
  },
  {
    // Usina Solar Orbital (fdfbfeb3-e378-4095-8cd2-976a83d544cf) -> Linka para Ligas Metálicas Autoreparáveis
    id: "fdfbfeb3-e378-4095-8cd2-976a83d544cf",
    newLink: "> VEJA TAMBÉM: [Ligas Metálicas Autoreparáveis Iniciam Testes em Componentes Críticos da Aviação Comercial](/post/ligas-metalicas-autoreparaveis-iniciam-testes-em-componentes-criticos-da-aviacao-comercial)"
  },
  {
    // Fotobiorreatores Urbanos de Microalgas (589c3439-7e8e-4b10-906f-59cc4e42ba8e) -> Linka para Clareamento de Nuvens Marinhas
    id: "589c3439-7e8e-4b10-906f-59cc4e42ba8e",
    newLink: "> VEJA TAMBÉM: [Tecnologia de Clareamento de Nuvens Marinhas Inicia Testes para Salvar a Grande Barreira de Corais](/post/tecnologia-de-clareamento-de-nuvens-marinhas-inicia-testes-para-salvar-a-grande-barreira-de-corais)"
  },
  {
    // Sistemas de Fotossíntese Artificial (1976dbf8-8d87-43b1-8030-6e3a991077c8) -> Linka para Clareamento de Nuvens Marinhas
    id: "1976dbf8-8d87-43b1-8030-6e3a991077c8",
    newLink: "> VEJA TAMBÉM: [Tecnologia de Clareamento de Nuvens Marinhas Inicia Testes para Salvar a Grande Barreira de Corais](/post/tecnologia-de-clareamento-de-nuvens-marinhas-inicia-testes-para-salvar-a-grande-barreira-de-corais)"
  },
  {
    // Interfaces Cérebro-Computador (d8b4d27a-f832-422e-ba4a-2700219cdceb) -> Linka para Lentes Inteligentes
    id: "d8b4d27a-f832-422e-ba4a-2700219cdceb",
    newLink: "> VEJA TAMBÉM: [Lentes de Contato Inteligentes Alimentadas por Lágrimas Iniciam Fase de Homologação Médica](/post/lentes-de-contato-inteligentes-alimentadas-por-lagrimas-iniciam-fase-de-homologacao-medica)"
  },
  {
    // Anel Inteligente (779d3bbd-eda2-4b33-987c-4d5eed020ffd) -> Linka para Lentes Inteligentes
    id: "779d3bbd-eda2-4b33-987c-4d5eed020ffd",
    newLink: "> VEJA TAMBÉM: [Lentes de Contato Inteligentes Alimentadas por Lágrimas Iniciam Fase de Homologação Médica](/post/lentes-de-contato-inteligentes-alimentadas-por-lagrimas-iniciam-fase-de-homologacao-medica)"
  },
  {
    // Baterias de Papel (177e8c92-7628-499e-ae23-887a7d47fb64) -> Linka para Higroeletricidade
    id: "177e8c92-7628-499e-ae23-887a7d47fb64",
    newLink: "> VEJA TAMBÉM: [Dispositivos de Higroeletricidade Iniciam Produção para Gerar Energia do Ar Úmido](/post/dispositivos-de-higroeletricidade-iniciam-producao-para-gerar-energia-do-ar-umido)"
  },
  {
    // Armazenamento em Vidro Sílica (b7235d4e-de5e-49da-8c36-2fc6f60af888) -> Linka para Higroeletricidade
    id: "b7235d4e-de5e-49da-8c36-2fc6f60af888",
    newLink: "> VEJA TAMBÉM: [Dispositivos de Higroeletricidade Iniciam Produção para Gerar Energia do Ar Úmido](/post/dispositivos-de-higroeletricidade-iniciam-producao-para-gerar-energia-do-ar-umido)"
  },
  {
    // Impressoras Moleculares (a644aab9-5ac5-43c2-8d81-34baf2ab3b8e) -> Linka para Impressoras de mRNA
    id: "a644aab9-5ac5-43c2-8d81-34baf2ab3b8e",
    newLink: "> VEJA TAMBÉM: [Micro-impressoras de mRNA sob Demanda Iniciam Testes em Áreas de Saúde Isoladas](/post/micro-impressoras-de-mrna-sob-demanda-iniciam-testes-em-areas-de-saude-isoladas)"
  },
  {
    // Bioimpressão 3D (2762b5f7-b27a-4c31-9abc-57807e9ba976) -> Linka para Impressoras de mRNA
    id: "2762b5f7-b27a-4c31-9abc-57807e9ba976",
    newLink: "> VEJA TAMBÉM: [Micro-impressoras de mRNA sob Demanda Iniciam Testes em Áreas de Saúde Isoladas](/post/micro-impressoras-de-mrna-sob-demanda-iniciam-testes-em-areas-de-saude-isoladas)"
  },
  {
    // Baterias de Ar-Alumínio (29b67f99-3999-42a3-a1b7-ef7c05ba0fcc) -> Linka para Jato de Plasma
    id: "29b67f99-3999-42a3-a1b7-ef7c05ba0fcc",
    newLink: "> VEJA TAMBÉM: [Motores a Jato de Plasma Atmosférico Iniciam Testes de Voo Supersônico sem Combustível](/post/motores-a-jato-de-plasma-atmosferico-iniciam-testes-de-voo-supersonico-sem-combustivel)"
  },
  {
    // Vela de Plasma Magnético (26878741-1440-491a-a021-eda9e4254ec9) -> Linka para Jato de Plasma
    id: "26878741-1440-491a-a021-eda9e4254ec9",
    newLink: "> VEJA TAMBÉM: [Motores a Jato de Plasma Atmosférico Iniciam Testes de Voo Supersônico sem Combustível](/post/motores-a-jato-de-plasma-atmosferico-iniciam-testes-de-voo-supersonico-sem-combustivel)"
  }
];

async function run() {
  console.log("🔗 Injetando links recíprocos no banco de dados...\n");

  for (const item of updates) {
    try {
      // 1. Buscar o conteúdo atual do post
      const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${item.id}`, {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!res.ok) {
        console.error(`❌ Erro ao buscar post ${item.id}:`, await res.text());
        continue;
      }

      const posts = await res.json();
      if (posts.length === 0) {
        console.warn(`⚠️ Post ${item.id} não encontrado no banco.`);
        continue;
      }

      const post = posts[0];
      let markdown = post.conteudo_markdown;

      // Evita duplicidade do link específico
      if (markdown.includes(item.newLink)) {
        console.log(`ℹ️ Link recíproco já existe em: "${post.titulo}". Pulando.`);
        continue;
      }

      // Adiciona o link antes da seção de Fontes ou no final do arquivo
      if (markdown.includes("\n---")) {
        markdown = markdown.replace("\n---", `\n\n${item.newLink}\n\n---`);
      } else {
        markdown += `\n\n${item.newLink}`;
      }

      // 2. Fazer o PATCH
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${item.id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          conteudo_markdown: markdown
        })
      });

      if (!patchRes.ok) {
        console.error(`❌ Erro ao atualizar interlink no post ${item.id}:`, await patchRes.text());
      } else {
        console.log(`✅ Link recíproco adicionado em: "${post.titulo}"`);
      }
    } catch (err) {
      console.error(`❌ Falha ao processar item ${item.id}:`, err.message);
    }
  }
}

run();

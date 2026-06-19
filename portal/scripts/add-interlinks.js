const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const postsToUpdate = [
  {
    id: "7b8c7555-41f5-4bf4-888c-b42c7288a2ef", // Processadores fotônicos
    interlinks: [
      { text: "Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero", slug: "intel-loihi-3-o-processador-neuromorfico-que-roda-ia-com-consumo-zero" },
      { text: "Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa", slug: "primeira-rede-de-internet-quantica-em-temperatura-ambiente-e-ativada-na-europa" }
    ]
  },
  {
    id: "30428f07-f245-4d34-bbd9-4870fc2a7ae6", // Perovskita solar
    interlinks: [
      { text: "Baterias de Sódio em Estado Sólido Entram em Produção e Prometem Carros Elétricos com Metade do Preço", slug: "baterias-de-sodio-em-estado-solido-entram-em-produco-e-prometem-carros-eletricos-com-metade-do-preco" },
      { text: "Baterias de estado sólido e grafeno: Recarga de 3 minutos e 1.200 km", slug: "baterias-de-estado-solido-e-grafeno-recarga-de-3-minutos-e-1-200-km" }
    ]
  },
  {
    id: "75bc9252-a344-4e40-ac3c-593bb47ac2e7", // Kepler-186f
    interlinks: [
      { text: "Primeira Rede de Internet Quântica em Temperatura Ambiente é Ativada na Europa", slug: "primeira-rede-de-internet-quantica-em-temperatura-ambiente-e-ativada-na-europa" }
    ]
  },
  {
    id: "7f533236-8055-4e9f-9443-2332f779b74f", // IA cancer
    interlinks: [
      { text: "Supercomputadores Biológicos: Nuvem ativa 16 mini-cérebros humanos", slug: "supercomputadores-biologicos-nuvem-ativa-16-mini-cerebros-humanos" },
      { text: "Intel Loihi 3: O processador neuromórfico que roda IA com consumo zero", slug: "intel-loihi-3-o-processador-neuromorfico-que-roda-ia-com-consumo-zero" }
    ]
  },
  {
    id: "91f4153f-ded0-4475-9373-4d010063a240", // Internet Quantica
    interlinks: [
      { text: "O Fim das Senhas Físicas: Google e Apple iniciam transição total para Passkeys Quânticas", slug: "o-fim-das-senhas-fisicas-google-e-apple-iniciam-transico-total-para-passkeys-quanticas" }
    ]
  },
  {
    id: "04a16ea1-ef68-4c34-b78a-22e07352d360", // Baterias de Sódio
    interlinks: [
      { text: "Baterias de estado sólido e grafeno: Recarga de 3 minutos e 1.200 km", slug: "baterias-de-estado-solido-e-grafeno-recarga-de-3-minutos-e-1-200-km" }
    ]
  }
];

async function addInterlinks() {
  console.log("🔗 Iniciando injeção de interlinks nos posts recentes...\n");

  for (const item of postsToUpdate) {
    try {
      // 1. Obter post
      const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${item.id}`, {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!res.ok) throw new Error(`Erro ao buscar post ${item.id}`);
      const posts = await res.json();
      if (posts.length === 0) continue;
      const post = posts[0];

      // Se já tiver um "VEJA TAMBÉM", não adiciona de novo para evitar duplicidade
      if (post.conteudo_markdown.includes("VEJA TAMBÉM:") || post.conteudo_markdown.includes("VEJA TAMBÉM")) {
        console.log(`ℹ️ Post "${post.titulo}" já possui interlinks. Pulando.`);
        continue;
      }

      // 2. Construir bloco de interlink
      let interlinkBlock = "\n\n";
      item.interlinks.forEach(link => {
        interlinkBlock += `> VEJA TAMBÉM: [${link.text}](/post/${link.slug})\n\n`;
      });

      // 3. Inserir na metade do markdown (depois do H2 principal)
      const parts = post.conteudo_markdown.split("\n## ");
      let updatedMarkdown = "";

      if (parts.length > 1) {
        // Insere após a primeira seção H2
        parts[0] = parts[0] + interlinkBlock;
        updatedMarkdown = parts.join("\n## ");
      } else {
        // Se não tiver H2, coloca no final
        updatedMarkdown = post.conteudo_markdown + interlinkBlock;
      }

      // 4. Executar PATCH
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${item.id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          conteudo_markdown: updatedMarkdown
        })
      });

      if (!patchRes.ok) {
        console.error(`❌ Erro no patch do post ${item.id}:`, await patchRes.text());
      } else {
        console.log(`✅ Interlinks adicionados com sucesso em: "${post.titulo}"`);
      }
    } catch (e) {
      console.error(`❌ Erro processando post ${item.id}:`, e.message);
    }
  }
}

addInterlinks();

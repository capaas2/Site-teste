const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../portal/.env.local') });

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = ["Eletrificação", "Mobilidade", "IA & Software", "Mercado", "Design", "Tecnologia", "Sustentabilidade"];
const images = [
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
  "https://images.unsplash.com/photo-1517524206127-48bbd3f813d7?w=1200&q=80",
  "https://images.unsplash.com/photo-1554672408-730436b60dde?w=1200&q=80",
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80",
  "https://images.unsplash.com/photo-1542381045-39908de75f0a?w=1200&q=80"
];

const mockTitles = [
  "O Futuro dos Carros Voadores está mais próximo",
  "Baterias de Estado Sólido prometem 1000km de autonomia",
  "Novo SUV Elétrico da BYD chega para dominar o mercado",
  "Apple Car: Vazamentos indicam lançamento para 2027",
  "Como a IA está tornando o trânsito das cidades mais seguro",
  "A corrida pelo hidrogênio verde: Quem está na liderança?",
  "Design Futurista: O novo conceito da Mercedes-Benz",
  "Cidades Inteligentes: A revolução da micromobilidade",
  "O impacto dos semicondutores na produção de veículos",
  "Energia Solar em frotas de entrega: Vale a pena?"
];

async function insertMockPosts() {
  console.log("Iniciando inserção de 10 notícias de teste...");

  for (let i = 0; i < 10; i++) {
    const post = {
      titulo: mockTitles[i],
      conteudo_markdown: `# ${mockTitles[i]}\n\nEste é um texto de teste gerado automaticamente para validar o layout do portal de notícias.\n\n## Detalhes\n- Categoria: ${categories[i % categories.length]}\n- Data: ${new Date().toLocaleDateString()}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      categoria: categories[i % categories.length],
      autor: "Squad 15 (Bot)",
      imagem_url: images[i % images.length],
      views: Math.floor(Math.random() * 500) + 10 // Gera visualizações aleatórias para testar o ranking
    };

    const { data, error } = await supabase.from('posts').insert([post]);

    if (error) {
      console.error(`Erro ao inserir post ${i + 1}:`, error.message);
    } else {
      console.log(`✅ Post ${i + 1} inserido: ${post.titulo} (Views: ${post.views})`);
    }
  }

  console.log("Processo concluído!");
}

insertMockPosts();

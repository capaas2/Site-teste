const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "fd65900f-3f32-464c-a789-e313b4e0c002", // UUID HEXADECIMAL VÁLIDO (0-9, a-f)
  titulo: "Neuralink em Humanos: Primeiro Paciente Já Controla Mouse com o Pensamento",
  conteudo_markdown: `# Neuralink em Humanos: Primeiro Paciente Já Controla Mouse com o Pensamento

O futuro da interface cérebro-computador (BCI) deixou de ser ficção científica para se tornar uma realidade clínica palpável. A Neuralink, startup de neurotecnologia de Elon Musk, confirmou que o primeiro paciente humano a receber o implante cerebral, Noland Arbaugh, já é capaz de controlar o cursor de um computador e jogar xadrez online utilizando exclusivamente seus pensamentos. O feito marca um divisor de águas não apenas para a medicina de reabilitação, mas para a própria definição de interação humana com a tecnologia digital.

[IMAGEM: https://images.unsplash.com/photo-1518770660439-4636190af475 | LEGENDA: Detalhe de um microprocessador avançado simbolizando a tecnologia de implantes neurais]

O dispositivo, que possui o tamanho de uma moeda grande, é inserido no córtex motor por um robô cirúrgico de alta precisão. Composto por mais de mil eletrodos distribuídos em fios extremamente finos, o chip detecta picos de atividade elétrica (potenciais de ação) e os traduz em comandos digitais em tempo real. Segundo o paciente, o processo de aprendizado foi intuitivo: "É como tentar mover a mão, mas sem o esforço físico. Em poucos dias, eu já conseguia mover o mouse para onde queria", afirmou Arbaugh em uma transmissão ao vivo.

> LEIA MAIS: [O Fim dos Cookies: Google Inicia Desativação Global do Rastreamento de Terceiros no Chrome](/post/fd65900f-3f32-464c-a789-e313b4e0c001)

No entanto, a inovação levanta questões profundas sobre privacidade neural e segurança de dados. Especialistas em ética digital alertam que, diferentemente de um smartphone que podemos desligar, um implante cerebral cria um fluxo contínuo de dados biométricos sensíveis. A proteção contra "neuro-hacking" e a garantia de que os pensamentos do usuário permaneçam privados são os próximos grandes desafios que a Neuralink e seus concorrentes precisarão enfrentar antes de uma expansão comercial em larga escala.

[IMAGEM: https://images.unsplash.com/photo-1550751827-4bd374c3f58b | LEGENDA: Representação conceitual de segurança cibernética aplicada à proteção de dados biológicos]

Apesar dos desafios regulatórios pendentes com a FDA e órgãos internacionais, o sucesso inicial de Arbaugh abre portas para casos de uso que vão além da paralisia. Musk já expressou sua visão de que a Neuralink poderá, no futuro, permitir a "telepatia digital" e o aprimoramento cognitivo humano. Enquanto o mundo observa o progresso de Noland, a Redação Tech continua acompanhando as implicações técnicas dessa nova fronteira, onde o silício e o neurônio finalmente falam a mesma língua.`,
  autor: "Eduardo Editor-Chefe",
  categoria: "Neurotecnologia",
  imagem_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200",
  publicado_em: new Date().toISOString(),
  views: 0,
  affiliate_data: JSON.stringify([
    {
      productName: "Neuralink Concept Art: O Livro",
      price: "159,00",
      store: "Amazon",
      affiliateUrl: "https://amazon.com",
      productImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      isBestChoice: false
    }
  ])
};

async function publish() {
  console.log("Iniciando publicação da notícia Neuralink...");
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("Erro ao publicar:", JSON.stringify(error, null, 2));
  } else {
    console.log("Sucesso! Notícia publicada: fd65900f-3f32-464c-a789-e313b4e0c002");
  }
}

publish();

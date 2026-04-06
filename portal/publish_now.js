const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "fd65900f-3f32-464c-a789-e313b4e0a7c3",
  titulo: "O Despertar dos Humanoides: Optimus Gen 3 e o Fim da Era Prototipal",
  conteudo_markdown: `A indústria de robótica atingiu um ponto de inflexão nesta semana com o anúncio surpresa das capacidades produtivas do Tesla Optimus Gen 3. O que antes era visto como um projeto de vaidade técnica de Elon Musk transformou-se em uma ameaça real para o setor de logística e manufatura pesada. A nova iteração do humanoide não apenas caminha com maior fluidez, mas introduz um sistema de rede neural ponta a ponta que permite ao robô aprender tarefas complexas apenas por observação visual, eliminando a necessidade de programação manual para cada movimento.

[DETALHE_IMAGEM: Robô humanoide moderno com acabamento branco fosco manipulando componentes eletrônicos delicados em laboratório futurista]

O grande diferencial desta geração reside nos novos atuadores proprietários e na integração de sensores táteis de alta resolução nas pontas dos dedos. Essa "sensibilidade digital" permite que o Optimus manipule objetos frágeis, como ovos ou componentes de silício, com a mesma destreza de um técnico humano. Especialistas do MIT indicam que a redução de custo prevista para a produção em massa pode colocar o preço de uma unidade abaixo dos US$ 20.000 até 2027, um valor disruptivo que forçou concorrentes como a Boston Dynamics e a Figure AI a acelerarem seus cronogramas de lançamento comercial.

A corrida pela automação doméstica e industrial não é apenas uma questão de hardware; é uma batalha de dados. Enquanto a Tesla utiliza a imensa frota de veículos do Direct-to-Consumer para treinar seus modelos de visão computacional, a Figure AI anunciou uma parceria estratégica com a OpenAI para integrar modelos de linguagem de grande escala diretamente no processamento de tomada de decisão dos robôs. Isso significa que, em breve, humanos poderão dar comandos naturais como "organize o estoque priorizando itens de alta rotatividade", e a máquina entenderá o contexto sem supervisão.

[DETALHE_IMAGEM: Visão em perspectiva de uma linha de montagem com robôs humanoides trabalhando em harmonia com humanos em uma fábrica de alta tecnologia]

No entanto, o avanço célere traz consigo debates acalorados sobre a substituição de mão de obra e a segurança cibernética. Com robôs capazes de operar ferramentas elétricas e navegar em ambientes humanos, o risco de falhas de software ou sequestros digitais torna-se uma preocupação de segurança nacional. O Fórum Econômico Mundial estima que, embora a produtividade global possa saltar 30% com a integração de humanoides, o deslocamento de funções operacionais exigirá uma requalificação sem precedentes da força de trabalho global nos próximos cinco anos.

O futuro que antes pertencia apenas à ficção científica de Isaac Asimov está sendo montado agora, parafuso por parafuso, nas Gigafactories ao redor do mundo. A transição da robocortina para a realidade prática é inevitável. Aqueles que ignorarem a densidade técnica desta mudança poderão encontrar um mercado de trabalho irreconhecível antes do fim desta década. A Redação Tech continuará monitorando os próximos passos desta revolução que promete ser o maior salto produtivo desde a invenção da máquina a vapor.`,
  autor: "Eduardo Editor-Chefe",
  categoria: "Robótica & AI",
  imagem_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  publicado_em: new Date().toISOString(),
  views: 0,
  affiliate_data: JSON.stringify([
    {
      productName: "Kit Robótica Arduino Master",
      price: "289,90",
      store: "Amazon",
      affiliateUrl: "https://amazon.com.br",
      productImage: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400",
      isBestChoice: true
    }
  ])
};

async function publish() {
  console.log("Iniciando publicação da notícia de teste...");
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("Erro ao publicar:", JSON.stringify(error, null, 2));
  } else {
    console.log("Notícia publicada com sucesso! ID:", post.id);
  }
}

publish();

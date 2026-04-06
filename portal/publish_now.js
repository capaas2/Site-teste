const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "fd65900f-3f32-464c-a789-e313b4e0bf06", // UUID HEXADECIMAL VÁLIDO
  titulo: "Starship Flight 6: O Salto Ambicioso da SpaceX Rumo a Marte",
  conteudo_markdown: `# Starship Flight 6: O Salto Ambicioso da SpaceX Rumo a Marte

A SpaceX está prestes a realizar o sexto voo de teste do Starship, o maior e mais potente sistema de lançamento já construído pela humanidade. Após os sucessos parciais dos voos anteriores, que conseguiram demonstrar a separação de estágios e a reentrada atmosférica controlada, o Flight 6 focará na captura do booster Super Heavy diretamente na torre de lançamento ("Chopsticks") e na ignição de um dos motores Raptor no vácuo do espaço — uma manobra crítica para futuras missões interplanetárias.

[IMAGEM: https://images.unsplash.com/photo-1541185933-ef5d8ed016c2 | LEGENDA: O foguete Starship iluminado durante preparativos para lançamento noturno em Boca Chica]

A complexidade técnica desta missão é exponencial. Diferente de foguetes descartáveis, o Starship foi projetado para ser totalmente reutilizável, reduzindo drasticamente o custo por quilograma de carga enviada ao espaço. Elon Musk já indicou que, se o Flight 6 for bem-sucedido, a SpaceX poderá iniciar operações comerciais com cargas do Starlink e, possivelmente, as primeiras missões não tripuladas para o solo marciano ainda nesta década.

> LEIA MAIS: [O Fim de uma Era: Por que a OpenAI está Encerrando o Projeto Sora?](/post/fd65900f-3f32-464c-a789-e313b4e0708a)

No entanto, o progresso tecnológico caminha lado a lado com os desafios regulatórios e ambientais. A Administração Federal de Aviação (FAA) e organizações de preservação local continuam a monitorar o impacto dos lançamentos na infraestrutura costeira e na fauna marinha de Brownsville. Enquanto os engenheiros refinam os escudos térmicos e a logística de combustível criogênico, o mundo observa o que pode ser o início oficial da colonização espacial.

[IMAGEM: https://images.unsplash.com/photo-1614728263952-84ea256f9679 | LEGENDA: Detalhe das superfícies de titânio de um motor de foguete simbolizando a resistência aos extremos térmicos do espaço]

Enquanto gigantes do software repensam suas estratégias, a SpaceX mantém o acelerador no hardware pesado. Starship não é apenas um veículo: é o passaporte da humanidade para a multi-planetaridade. A Redação Tech acompanhará cada segundo da contagem regressiva, trazendo análises detalhadas sobre a telemetria e o futuro da economia orbital que este voo promete inaugurar.`,
  autor: "Nando Notícia", // PERSONA DA SQUAD
  categoria: "Exploração Espacial",
  imagem_url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200", // URL ÚNICA (Foguete de Longe)
  publicado_em: new Date().toISOString(),
  views: 0
};

async function publish() {
  console.log("Iniciando publicação v2.7 (Starship Flight 6)...");
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("Erro ao publicar:", JSON.stringify(error, null, 2));
  } else {
    console.log("Sucesso! Post com Selo de Auditoria e Personas publicado: fd65900f-3f32-464c-a789-e313b4e0bf06");
  }
}

publish();

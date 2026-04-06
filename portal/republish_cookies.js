const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "fd65900f-3f32-464c-a789-e313b4e0c001",
  titulo: "O Fim dos Cookies: Google Inicia Desativação Global do Rastreamento de Terceiros no Chrome",
  conteudo_markdown: `# O Fim dos Cookies: Google Inicia Desativação Global do Rastreamento de Terceiros no Chrome

O cenário da publicidade digital está passando por sua maior transformação em décadas. O Google iniciou oficialmente a desativação dos cookies de terceiros para 1% dos usuários globais do Chrome, marcando o começo do fim para a tecnologia que sustentou o rastreamento individualizado na web por mais de 20 anos. O projeto, batizado de Privacy Sandbox, visa substituir os cookies por APIs que agrupam usuários em grandes grupos de interesse sem revelar suas identidades individuais.

[IMAGEM: https://images.unsplash.com/photo-1544253710-b8240f6f4e1f | LEGENDA: Representação visual de segurança de dados e privacidade no ambiente digital]

Para os anunciantes, o desafio é monumental. Sem a capacidade de rastrear conversões precisas e comportamentos granulares, as marcas precisam migrar para estratégias baseadas em dados primários ("first-party data"). Isso significa que a relação direta com o cliente — newsletters, logins e interações conscientes — passará a ser o ativo mais valioso de qualquer empresa de tecnologia.

O impacto não será apenas comercial, mas técnico. Desenvolvedores de todo o mundo estão correndo para adaptar seus sistemas antes que o Google amplie o bloqueio para 100% dos usuários, previsto para os próximos meses. A Redação Tech continuará monitorando as métricas de performance e as novas ferramentas de atribuição que surgirão neste "mundo sem cookies".`,
  autor: "Lucas Linkador",
  categoria: "Segurança Digital",
  imagem_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
  publicado_em: new Date().toISOString(),
  views: 0
};

async function republish() {
  console.log("Forçando republicação estável do post de Cookies...");
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("Erro ao republicar:", error);
  } else {
    console.log("Sucesso! Post de Cookies estabilizado no ID ...c001");
  }
}

republish();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const supabase = createClient(supabaseUrl, supabaseKey);

const post = {
  id: "7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
  titulo: "O Eclipse da Criatividade: A Revolução dos Agentes de IA na Música e no Cinema em 2026",
  conteudo_markdown: `# O Eclipse da Criatividade: A Revolução dos Agentes de IA na Música e no Cinema em 2026

Em abril de 2026, a pergunta "Quem escreveu esta canção?" ou "Quem dirigiu este filme?" tornou-se obsoleta. A FolhaByte investigou como a indústria cultural global está sendo sacudida pelo que alguns chamam de o "Grande Silenciamento Humano" e outros, a "Renascença Sintética".

[IMAGEM: https://images.unsplash.com/photo-1626379953822-bc5652189fb1 | LEGENDA: Projeção holográfica de cinema imersivo gerado por agentes de IA em tempo real]

### O Fim da Pós-Produção
Até 2024, produzir um filme de alta fidelidade exigia anos de renderização e centenas de artistas de efeitos visuais. Hoje, com a integração do Sora v4 e dos motores de difusão quântica, a "Câmera Alpha" da Adobe permite que um único operador dite o cenário, a iluminação e as falas dos atores enquanto a cena é gerada ao vivo.

A tradicional pós-produção morreu. O filme é "assado" no momento em que é sonhado pelo diretor. Mais do que isso, assistimos ao surgimento de filmes que mudam conforme o humor do telespectador, detectado via biometria pelos Smart Glasses que discutimos na semana passada.

### Música: O Som da Entropia Orgânica
Na música, a transição foi ainda mais radical. O sucesso número 1 de 2026 no Spotify (agora rebatizado de AI-Sync) não foi composto por um humano. Foi um fluxo contínuo de som adaptativo chamado "Luminance", que soa diferente para cada um dos seus 150 milhões de ouvintes únicos.

[IMAGEM: https://images.unsplash.com/photo-1614850523296-d8c1af93d400 | LEGENDA: Ondas sonoras geradas por algoritmos de entropia musical, o novo padrão de fidelidade em 2026]

A IA não apenas cria a melodia; ela decodifica a frequência emocional do usuário e ajusta o tom, o tempo e até as letras (quando solicitadas) para maximizar a dopamina. A "música estática" de 2024 agora parece, para os jovens da Geração Alpha, tão arcaica quanto um disco de vinil.

### O Caso de Estudo: 'Synthetica'
O grande marco de 2026 foi a vitória de *Synthetica* no Oscar. O filme, que narra a história de uma IA que tenta entender a solidão, foi integralmente roteirizado, dirigido e "interpretado" por um cluster de agentes de IA operando em servidores no deserto da Arábia Saudita. 

[IMAGEM: https://images.unsplash.com/photo-1544006659-f0821773956f | LEGENDA: Primeiro avatar de IA a receber uma indicação de 'Melhor Atuação' pelo prêmio da Academia em 2026]

O 'Ator' virtual, cujo ID neural é *A-928*, apresentou uma profundidade emocional que desencadeou o debate sobre "Direitos de Propriedade de Entidades Não-Biológicas". Se uma máquina pode nos fazer chorar com uma performance original, ela merece o mérito criativo?

### O Cânone em Crise: Propriedade Intelectual
As leis de copyright de 2024 colapsaram. O novo Tratado de Genebra sobre Criatividade Sintética introduziu a taxa de "Origem Humana", onde conteúdos comprovadamente criados sem assistência de agentes de IA são taxados como "obras de luxo biológico".

[IMAGEM: https://images.unsplash.com/photo-1451187580459-43490279c0fa | LEGENDA: Representação visual da explosão de dados criativos que redefine a autoria na era da IA]

Na FolhaByte, decodificamos este eclipse não como a morte da arte humana, mas como o fim da exclusividade da autoria. Estamos entrando na era da "Criatividade Híbrida", onde o humano é o curador de um infinito de possibilidades geradas pelo silício.

O futuro não será gravado; ele será gerado.`,
  autor: "Nando Notícia",
  categoria: "Cultura",
  imagem_url: "https://images.unsplash.com/photo-1626379953822-bc5652189fb1",
  publicado_em: new Date().toISOString(),
  views: 0
};

async function publish() {
  console.log("🚀 Iniciando publicação do primeiro Long-form FolhaByte (v2.20)...");
  
  const { error } = await supabase.from('posts').upsert([post], { onConflict: 'id' });
  
  if (error) {
    console.error("❌ Erro ao publicar:", JSON.stringify(error, null, 2));
  } else {
    console.log("✅ Sucesso! Masterpiece 'O Eclipse da Criatividade' publicada com ID: 7b8c9d0e...");
    console.log("📡 URL de Verificação: https://site-teste-ne4f.vercel.app/post/7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e");
  }
}

publish();

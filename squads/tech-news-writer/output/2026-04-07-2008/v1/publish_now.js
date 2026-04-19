const fs = require("fs");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

const postData = {
  titulo: "O Triunfo do Edge IA: Por que a Inferência de IA Ultrapassou o Treinamento em 2026",
  autor: "Redação Tech",
  categoria: "Inteligência Artificial",
  conteudo_markdown: `# O Triunfo do Edge IA: Como Chips Locais e NPUs Estão Matando a Dependência da Nuvem em 2026

Estamos vivendo um momento histórico na computação que os analistas agora chamam de "Inference Inversion". Pela primeira vez desde o surgimento dos grandes modelos de linguagem, em março de 2026, o volume de processamento de IA dedicado à inferência cotidiana ultrapassou oficialmente a carga de dados utilizada para o treinamento de modelos. Este divisor de águas não aconteceu por acaso; é o resultado direto de uma migração em massa para o hardware de borda (Edge AI).

A revolução está sendo impulsionada pela maturidade de unidades de processamento neural (NPUs) integradas em tudo, desde óculos inteligentes até eletrodomésticos. Se em 2024 o mundo dependia de GPUs massivas em datacenters remotos, 2026 é o ano em que a inteligência artificial se tornou uma função nativa do hardware local, operando sem latência e, crucialmente, de forma totalmente privada.

## A Morte da Latência: O Triunfo dos Chips ASIC e TinyEngine™

O grande gargalo da inteligência artificial sempre foi o tempo de resposta da rede. Esperar que um servidor a mil quilômetros de distância processe o comando de voz de um usuário era inaceitável para aplicações críticas. A solução veio com o crescimento explosivo de ASICs (Circuitos Integrados de Aplicação Específica), que cresceram mais de 44% este ano. Esses chips não são gerais como as GPUs tradicionais; eles são forjados para uma única missão: executar modelos de IA com consumo de energia ínfimo.

Um exemplo prático dessa mudança é a nova linha de microcontroladores da Texas Instruments, equipada com a arquitetura TinyEngine™. Esses componentes estão permitindo que dispositivos de baixo custo executem modelos de visão computacional e processamento de linguagem natural diretamente no silício. O resultado é uma interação imediata que parece "mágica", onde o dispositivo antecipa a necessidade do usuário antes mesmo do primeiro pacote de dados ser enviado à nuvem.

## Privacidade e Soberania Digital: O Fim do Zero-Cloud-Trust

Além da velocidade, a segurança se tornou o principal argumento de venda para o Edge AI em 2026. Com a implementação do padrão "Zero-Cloud-Trust" por grandes fabricantes, os dados sensíveis dos usuários — como biometria, conversas ambientais e mapeamento espacial de casas — nunca tocam a internet pública. O processamento ocorre em uma "enclave segura" dentro do dispositivo, enviando apenas o metadado resultante (como um agendamento de tarefa ou um resumo de ideia) para os serviços externos.

Essa soberania digital forçou uma reestruturação nas gigantes do software. Empresas que antes lucravam com a centralização de dados agora estão competindo para oferecer os "modelos de borda" mais eficientes. O foco mudou de "quem tem o maior servidor" para "quem tem o código mais otimizado para rodar em NPUs de 2 watts". A computação se tornou distribuída de uma forma que os pioneiros da internet apenas sonhavam.

## Análise de Impacto: O Futuro da Computação Onipresente

A consequência de termos IA em cada chip é o surgimento da computação onipresente e invisível. Não precisamos mais "pedir" para a IA fazer algo através de uma tela; ela está presente no contexto tridimensional em que vivemos. Dispositivos vestíveis como o Fraimic Smart Canvas já utilizam essa tecnologia para transformar ideias em realidade visual instantaneamente, provando que a tecnologia mais poderosa é aquela que desaparece na nossa rotina.

O desafio para o final de 2026 não será mais a capacidade técnica de processar IA, mas sim como gerenciar a orquestração desses bilhões de agentes locais. O mundo agora é um imenso cluster descentralizado, onde a inteligência está na margem, e a nuvem se tornou apenas o repositório de memórias globais, não mais o cérebro que comanda cada movimento nosso.`,
  imagem_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
  views: 0
};

async function publishNews() {
  console.log("🚀 Lançando notícia FolhaByte no portal...");

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(postData)
      });
    
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Erro ao publicar:", err);
        return;
      }
    
      const [insertedPost] = await res.json();
      console.log(`✅ [SUCESSO] Notícia publicada com ID: ${insertedPost.id}`);
    
      const contextPath = "squads/affiliate-monetizer/id_handoff/current_post.json";
      if (!fs.existsSync("squads/affiliate-monetizer/id_handoff")) {
          fs.mkdirSync("squads/affiliate-monetizer/id_handoff", { recursive: true });
      }
      fs.writeFileSync(contextPath, JSON.stringify({ postId: insertedPost.id, topic: "Edge AI" }, null, 2));
      console.log("💾 Contexto de monetização atualizado para @monetizer.");
    
  } catch (e) {
      console.error("❌ Erro fatal:", e.message);
  }
}

publishNews();

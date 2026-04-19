const fs = require("fs");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";
const POST_ID = "46546962-dd04-4c43-bcb2-2ae56ba711ea";

const updatedContentMarkdown = `# Artemis II Supera Desafio de 50 Anos e Estabelece Novo Recorde de Distância Humana no Espaço

A humanidade rompeu hoje, 7 de abril de 2026, uma barreira que permanecia estática desde a era das calculadoras de bolso. A espaçonave Orion, coração da missão **Artemis II**, ultrapassou oficialmente a marca de 400.171 quilômetros (248.655 milhas) de distância da Terra, superando o recorde histórico estabelecido pela tripulação da Apollo 13 em 1970. Este marco não é apenas uma vitória estatística, mas a validação de uma nova arquitetura de exploração profunda que coloca a tripulação composta por Reid Wiseman, Victor Glover, Christina Koch e Jeremy Hansen no ponto mais remoto já alcançado por seres humanos na história.

## Navegação Autônoma: O Triunfo da IA OpNav no Espaço Profundo

Diferente das missões do século passado, que dependiam de triangulações contínuas via rádio com Houston, a Artemis II carrega o **OpNav (Optical Navigation)**, um sistema de inteligência artificial de borda (Edge AI) capaz de processar imagens em tempo real para navegação autônoma. O software utiliza o hardware NPU dedicado da Orion para mapear a posição relativa da espaçonave baseando-se apenas na geometria do disco lunar e das estrelas fixas. Essa redundância técnica permitiu que a missão continuasse com precisão nominal mesmo durante os breves apagões de comunicação planejados enquanto a cápsula transitava pelo lado oculto da Lua.

## A Queda do "Muro de Apollo": Um Marco para a Tripulação

O recorde foi atingido exatamente às 12:56 (horário de Houston), momento em que a equipe no controle da missão celebrou o que chamam de "A Queda do Muro de Apollo". Christina Koch, que já detinha o recorde feminino de permanência contínua no espaço, torna-se agora uma das quatro primeiras pessoas a vislumbrar o relevo do lado oculto da Lua com olhos humanos desde 1972. A imagem capturada hoje revela detalhes sem precedentes das crateras do polo sul lunar, região que será o local de pouso da futura missão Artemis III e a fundação para a primeira **Base Lunar** permanente.

![A tripulação da Artemis II celebra o recorde de distância no interior da cápsula Orion; a missão marca o retorno humano à vizinhança lunar após mais de cinco décadas — Foto: NASA/Handout](https://www.nasa.gov/wp-content/uploads/2026/04/artemis-ii-crew-in-orion-broadcast-screenshot-april-6-2026.png?w=1912)

## Análise de Impacto: Trajetória, Velocidade e Perilúnio

A Análise de Impacto técnico indica que a Orion atingiu uma velocidade de 1.010 km/h em relação à Lua durante sua aproximação máxima (perilúnio), ficando a apenas 6.545 quilômetros (4.067 milhas) da superfície. Esse "estilingue gravitacional" foi executado com perfeição, utilizando a gravidade lunar para redirecionar a trajetória de volta à Terra sem a necessidade de uma queima massiva de combustível. O sucesso desta manobra é o que separa as missões de exploração de curta duração das futuras expedições a Marte, onde a gestão de recursos e a precisão orbital são críticas.

![Visão detalhada do hemisfério lunar capturada pelas câmeras externas da Orion durante a manobra de flyby que estabeleceu o novo recorde humano de distância — Foto: NASA/JSC](https://images-assets.nasa.gov/image/hsc_art02_v01/hsc_art02_v01~large.jpg)

## Exploração In Loco: Propostas de Nomenclatura

A tripulação também aproveitou a posição privilegiada para sugerir nomes a duas crateras recém-mapeadas com alta definição. Em uma transmissão emocional, o astronauta canadense Jeremy Hansen batizou uma delas como **Integrity**, em homenagem ao apelido da própria cápsula Orion, e a segunda como **Carroll**, honrando a falecida esposa do comandante Reid Wiseman. Estas propostas serão enviadas formalmente à União Astronômica Internacional (IAU), marcando a primeira vez em décadas que nomes são sugeridos por exploradores *in loco*.

## Economia Lunar e o Caminho para Marte

Observadores geopolíticos e analistas do setor privado de tecnologia veem no sucesso da Artemis II um sinal de maturidade para a **Economia Lunar**. A estabilidade dos sistemas de suporte à vida e a eficiência do escudo térmico da Orion — que enfrentará uma reentrada a Mach 32 na próxima sexta-feira — abrem caminho para investimentos em mineração de Hélio-3 e infraestrutura de satélites dedicada ao espaço cislunar. O "voto de confiança" dado pelos sistemas autônomos de IA nesta missão reduz drasticamente os riscos para operações comerciais futuras que não podem depender de latência de rádio terrestre.

A jornada de retorno já começou, com a Orion apontando seu bico térmico em direção à Terra para um pouso planejado na costa de San Diego. A equipe médica da Marinha dos EUA e a tripulação do navio USS John P. Murtha já estão em posição, aguardando o splashdown que ocorrerá em 10 de abril. Este retorno encerrará uma missão de 10 dias que redefiniu os limites físicos da nossa espécie e consolidou a parceria internacional entre NASA e CSA como o padrão ouro para a exploração espacial do novo século.

## Legado Tecnológico: O Futuro da Computação no Espaço

Embora o recorde de distância seja o destaque nas manchetes, o verdadeiro legado da Artemis II reside na integração entre a intuição humana e o processamento de IA em ambientes de radiação extrema. A capacidade de resolver falhas de comunicação e glitches de hardware — como o breve problema no sistema de descarte de resíduos ocorrido no dia 4 — demonstra que o futuro do espaço profundo exige naves que pensem e tripulações que ousem. O recorde de 2026 permanecerá como um farol até que as primeiras botas toquem o regolito de Marte na próxima década.`;

const updatedData = {
  titulo: "Artemis II Supera Desafio de 50 Anos e Estabelece Novo Recorde de Distância Humana no Espaço",
  imagem_url: "https://images-assets.nasa.gov/image/art002e0118432/art002e0118432~large.jpg",
  autor: "Redação Tech",
  categoria: "Exploração Espacial",
  conteudo_markdown: updatedContentMarkdown
};

async function fixArticle() {
  console.log(`🛠️ Corrigindo estrutura e mídia do post ${POST_ID}...`);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${POST_ID}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(updatedData)
      });
    
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Erro ao atualizar o post:", err);
        return;
      }
    
      console.log("✅ [SUCESSO] Post reestruturado com H2/H3 e mídia corrigida.");
    
  } catch (e) {
      console.error("❌ Erro fatal durante a correção:", e.message);
  }
}

fixArticle();

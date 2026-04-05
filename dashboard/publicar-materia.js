// Publica a matéria via API do portal
const payload = {
  titulo: "Project Apex: Como a Fusão SpaceX + xAI Criou o Competidor Mais Perigoso da IA",
  conteudo_markdown: `Na última semana de março de 2026, vazou que a SpaceX enviou confidencialmente ao SEC americano um draft de registro para IPO. O codinome interno: **Project Apex**. O sindicato inclui Goldman Sachs, JPMorgan, Morgan Stanley, Bank of America e mais 17 bancos.

Os números são absurdos: valuation-alvo de **US$ 1,75 trilhão**, captação de até **US$ 75 bilhões**.

## O Elefante na Sala: xAI + SpaceX

Em fevereiro de 2026, a SpaceX e a **xAI** de Musk anunciaram fusão integral. A entidade pós-fusão controla uma rede com mais de 9 milhões de assinantes Starlink, infraestrutura de lançamento espacial e um LLM próprio. **Nenhum outro player de IA tem isso.**

## Starlink Como Backhaul de IA

A visão: usar a rede Starlink como infraestrutura de computação distribuída global, cortando dependência de nuvem pública.

## O Que Muda Para o Brasil

O Starlink domina zonas rurais no Brasil. Se a xAI/SpaceX escalar APIs de IA sobre essa rede, o país pode se tornar dependente de infraestrutura crítica controlada por uma única empresa americana privada.

## IPO em Junho de 2026

A corrida da IA sempre foi uma batalha entre gigantes de software. O Project Apex está adicionando foguetes à equação.`,
  categoria: "Mercado & Estratégia",
  autor: "Carlos Copy"
};

try {
  const res = await fetch("http://localhost:5173/api/portal/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  
  if (data.success) {
    console.log("✅ Matéria publicada no Supabase com sucesso!");
  } else {
    console.log("❌ Erro ao publicar:", data.error);
  }
} catch (err) {
  console.error("Falha de rede:", err.message);
}

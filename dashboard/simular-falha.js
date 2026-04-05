async function rodarSimulacao() {
  console.log("🤖 Agente enviando matéria incompleta para o Portal...");
  
  const payloadBruto = {
    // Faltam: titulo e categoria
    conteudo_markdown: "# Escassez de Lítio e o fim dos Carros Elétricos\n\nNesta matéria, discutiremos a falta de minerais essenciais...",
    autor: "Agente Teo"
  };

  try {
    const res = await fetch("http://localhost:5173/api/portal/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBruto)
    });
    
    const resposta = await res.json();
    console.log("🚨 Reação do Servidor Backend:", resposta);
    console.log("\n✅ Verifique agora a Aba vermelha de Admin no Dashboard!");
  } catch (err) {
    console.error("Falha ao comunicar com o servidor. O servidor Vite está ligado?", err);
  }
}

rodarSimulacao();

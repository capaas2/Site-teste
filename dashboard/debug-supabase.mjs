// Script de diagnóstico de conectividade Supabase
import "dotenv/config";

const url = (process.env.SUPABASE_URL || "").replace(/[\r\n"' ]/g, "");
const key = (process.env.SUPABASE_ANON_KEY || "").replace(/[\r\n"' ]/g, "");

console.log("=== DIAGNÓSTICO ===");
console.log("URL lida do .env:", JSON.stringify(url));
console.log("KEY lida do .env:", key ? `${key.slice(0, 20)}...` : "(vazia!)");
console.log("");

if (!url || !key) {
  console.error("PROBLEMA: .env não está sendo lido!");
  process.exit(1);
}

// Teste 1: Ping na URL raiz do Supabase
console.log("Testando conexão com:", url);
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  console.log("✅ Conexão OK! Status HTTP:", res.status);
  const text = await res.text();
  console.log("Resposta:", text.slice(0, 200));
} catch (e) {
  console.error("❌ Falha de conexão:", e.message);
  console.log("\nPossíveis causas:");
  console.log("  1. URL incorreta no .env");
  console.log("  2. Projeto Supabase pausado (plano grátis pausa após inatividade)");
  console.log("  3. Firewall/antivírus bloqueando o Node.js no Windows");
}

// Teste 2: Ping no Google pra ver se a rede funciona de qualquer forma
console.log("\nTestando conexão com a internet (google.com)...");
try {
  const res2 = await fetch("https://www.google.com", { signal: AbortSignal.timeout(5000) });
  console.log("✅ Internet OK! Status:", res2.status);
} catch (e) {
  console.error("❌ Sem acesso à internet pelo Node:", e.message);
}

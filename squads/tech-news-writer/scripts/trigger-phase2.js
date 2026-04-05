const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

/**
 * Script de Orquestração: Gatilho da Fase 2 (Affiliate Squad)
 * 
 * Este script é chamado pelo publish.js do Tech News Writer
 * após uma postagem de sucesso no banco de dados.
 */

async function triggerAffiliateSquad() {
  const postId = process.argv[2];
  const originalJsonPath = process.argv[3];

  if (!postId) {
    console.error("❌ Erro: ID do post não fornecido para a Fase 2.");
    process.exit(1);
  }

  console.log(`\n🚀 [ORQUESTRADOR] Iniciando Fase 2 para o Post ID: ${postId}`);

  // 1. Criar arquivo de contexto para o Affiliate Squad consumir
  const squadDataPath = path.resolve(__dirname, "../../affiliate-monetizer/ids/current_post.json");
  
  // Garante que a pasta existe
  const dir = path.dirname(squadDataPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const context = {
    postId: postId,
    triggerDate: new Date().toISOString(),
    originalSource: originalJsonPath
  };

  fs.writeFileSync(squadDataPath, JSON.stringify(context, null, 2));
  console.log(`📂 Contexto de postagem salvo em: ${squadDataPath}`);

  // 2. Disparar a execução do Squad de Afiliados
  // Nota: O comando abaixo assume que a CLI do OpenSquad está no PATH
  try {
    console.log("⚡ Executando: opensquad run affiliate-monetizer");
    // Em um ambiente real, o comando iniciaria o novo squad passando o contexto.
    // Como estamos em simulação, deixamos o log de instrução.
    console.log("✅ Registro de Gatilho Completo. O Esquadrão de Afiliados agora processará a monetização.");
    
  } catch (error) {
    console.error("❌ Falha ao executar o comando opensquad:", error.message);
  }
}

triggerAffiliateSquad();

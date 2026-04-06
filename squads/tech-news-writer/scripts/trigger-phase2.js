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
  
  // 0. Filtro de Categoria (v2.11): Apenas "Reviews" permite monetização
  let category = "";
  try {
    if (originalJsonPath && fs.existsSync(originalJsonPath)) {
      const originalData = JSON.parse(fs.readFileSync(originalJsonPath, "utf-8"));
      category = originalData.categoria || "";
    }
  } catch (e) {
    console.error("⚠️ Erro ao ler categoria do post original:", e.message);
  }

  const allowedCategories = ["Reviews"];
  if (!allowedCategories.includes(category)) {
    console.log(`⏭️ [SKIP] Categoria "${category}" não elegível para Afiliados. Abortando monetização.`);
    process.exit(0);
  }

  console.log(`✅ Categoria "${category}" aprovada para o Affiliate Squad.`);

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

  // 2. Disparar a execução do Motor Autônomo de Monetização
  try {
    const monetizerScript = path.resolve(__dirname, "../../affiliate-monetizer/scripts/automatic-monetizer.js");
    console.log(`⚡ Executando Motor Autônomo: node "${monetizerScript}"`);
    
    // Execução assíncrona (não bloqueia a resposta do Pedro Página)
    const { spawn } = require("child_process");
    const child = spawn("node", [monetizerScript], {
      detached: true,
      stdio: "inherit"
    });

    child.unref(); // Deixa o processo rodando em segundo plano

    console.log("✅ Registro de Gatilho Completo. O Motor de Afiliados está processando os dados.");
    
  } catch (error) {
    console.error("❌ Falha ao executar o Motor Autônomo:", error.message);
  }
}

triggerAffiliateSquad();

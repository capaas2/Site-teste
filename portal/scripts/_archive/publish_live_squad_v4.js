const squad = require('../lib/squad_mcp_client');
const { createClient } = require('@supabase/supabase-js');

// Configurações Globais
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: Variáveis de ambiente Supabase não detectadas.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * ENGINE SQUAD v4.1 (Ignition)
 * Fluxo: Teo (Trends) -> Beto (WebSearch) -> Fabio (Facts) -> Felipe (Photos) -> Antigravity (Criação)
 */
async function runIgnition(topic) {
  console.log(`\n🚀 [SQUAD v4.0] INICIANDO IGNITION: "${topic}"\n`);

  try {
    // 1. TEO (EXA.AI) - Busca de Tendências
    const trends = await squad.fetchTrends(topic);
    if (trends) {
      console.log("✅ Teo (Exa): Tendências e notícias de última hora capturadas.");
    } else {
      console.warn("⚠️ Teo (Exa): Sem retorno — pipeline seguirá sem dados de tendência.");
    }

    // 2. BETO (BRAVE WEB) - Mineração de Dados Brutos
    const rawData = await squad.searchWeb(`${topic} breaking news technical details specifications 2026`);
    if (rawData) {
      console.log("✅ Beto (Brave Web): Dados brutos e especificações técnicas coletados.");
    } else {
      console.warn("⚠️ Beto (Brave Web): Sem retorno — pipeline seguirá sem dados brutos.");
    }

    // 3. FABIO (TAVILY) - Validação de Fatos
    const research = await squad.validateFacts(topic);
    if (research) {
      console.log("✅ Fabio (Tavily): Fatos técnicos extraídos e purificados.");
    } else {
      console.warn("⚠️ Fabio (Tavily): Sem retorno — pipeline seguirá sem fact-check.");
    }

    // 4. FELIPE (BRAVE IMAGES) - Busca Visual Inédita
    const images = await squad.searchImages(topic, 5);
    if (images && images.length > 0) {
      console.log(`✅ Felipe (Brave Images): ${images.length} imagens inéditas identificadas.`);
    } else {
      console.warn("⚠️ Felipe (Brave Images): Nenhuma imagem encontrada — Gabriel Gerador assume.");
    }

    console.log("\n--- [ BLUEPRINT PARA ANTIGRAVITY ] ---\n");
    console.log("TEO TRENDS:", trends
      ? JSON.stringify(trends, null, 2).substring(0, 500) + "..."
      : "⚠️ INDISPONÍVEL — usar knowledge base interna.");
    console.log("\nBETO RAW DATA:", rawData
      ? JSON.stringify(rawData, null, 2).substring(0, 500) + "..."
      : "⚠️ INDISPONÍVEL — sem dados brutos nesta rodada.");
    console.log("\nFABIO FACTS (Summary):", research?.answer
      ? research.answer
      : "⚠️ INDISPONÍVEL — sem fact-check externo nesta rodada.");
    console.log("\nFELIPE IMAGES:", (images && images.length > 0)
      ? JSON.stringify(images, null, 2)
      : "⚠️ INDISPONÍVEL — aguardando Gabriel Gerador.");
    console.log("\n--- [ FIM DO BLUEPRINT ] ---\n");

    return { trends: trends ?? null, rawData: rawData ?? null, research: research ?? null, images: images ?? [] };
  } catch (error) {
    console.error("❌ Erro na Orquestração V4:", error.message);
    // Retorna estrutura vazia mas válida para não quebrar fluxos dependentes
    return { trends: null, research: null, images: [] };
  }
}

// Se executado diretamente
if (require.main === module) {
    const topic = process.argv[2] || "Baterias de Estado Sólido";
    runIgnition(topic);
}

module.exports = { runIgnition };

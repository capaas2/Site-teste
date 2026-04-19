/**
 * SQUAD MCP CLIENT (v4.0.0)
 * Wrapper unificado para os novos poderes da Squad FolhaByte.
 */

const axios = require('axios');

class SquadMCP {
  constructor() {
    this.exaKey = process.env.EXA_API_KEY;
    this.tavilyKey = process.env.TAVILY_API_KEY;
    this.braveKey = process.env.BRAVE_SEARCH_API_KEY;
    
    // Limites de Créditos (Segurança v4.1)
    this.stats = {
      teo: { calls: 0, limit: 1 },
      beto: { calls: 0, limit: 1 },
      fabio: { calls: 0, limit: 1 },
      felipe: { calls: 0, limit: 3 }
    };
  }

  /**
   * TEO (Tendência) - EXA.ai (Limite: 1)
   */
  async fetchTrends(topic) {
    if (this.stats.teo.calls >= this.stats.teo.limit) {
      console.warn("⚠️ Teo: Limite de chamadas atingido. Usando cache/vibe.");
      return null;
    }
    if (!this.exaKey) throw new Error("Chave EXA.ai ausente.");
    
    console.log(`📡 Teo (Exa): Analisando tendências profundas para "${topic}"...`);
    this.stats.teo.calls++;
    
    try {
      const response = await axios.post('https://api.exa.ai/search', {
        query: `latest breakthroughs and industry trends in ${topic} 2026`,
        type: "neural",
        category: "news",
        num_results: 5,
        contents: { text: { max_characters: 1000 } }
      }, {
        headers: { 'x-api-key': this.exaKey, 'Content-Type': 'application/json' }
      });
      return response.data.results;
    } catch (error) {
      console.error("❌ Teo (Exa): Falha na busca neural.", error.message);
      return null;
    }
  }

  /**
   * BETO (Busca) - Brave Search API (Limite: 1)
   */
  async searchWeb(query) {
    if (this.stats.beto.calls >= this.stats.beto.limit) {
      console.warn("⚠️ Beto: Limite de chamadas atingido.");
      return null;
    }
    if (!this.braveKey) throw new Error("Chave Brave ausente.");
    
    console.log(`🔍 Beto (Brave): Minerando dados brutos para "${query}"...`);
    this.stats.beto.calls++;
    
    try {
      const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
        params: { q: query, count: 5 },
        headers: { 'X-Subscription-Token': this.braveKey, 'Accept': 'application/json' }
      });
      return response.data.web.results;
    } catch (error) {
      console.error("❌ Beto (Brave): Falha na busca web.", error.message);
      return null;
    }
  }

  /**
   * FABIO (Fatos) - Tavily (Limite: 1)
   */
  async validateFacts(query) {
    if (this.stats.fabio.calls >= this.stats.fabio.limit) {
      console.warn("⚠️ Fabio: Limite de chamadas atingido.");
      return null;
    }
    if (!this.tavilyKey) throw new Error("Chave Tavily ausente.");
    
    console.log(`🕵️‍♂️ Fabio (Tavily): Validando fatos de "${query}"...`);
    this.stats.fabio.calls++;
    
    try {
      const response = await axios.post('https://api.tavily.com/search', {
        api_key: this.tavilyKey,
        query: `technical details and specific facts about ${query}`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 5
      });
      return { results: response.data.results, answer: response.data.answer };
    } catch (error) {
      console.error("❌ Fabio (Tavily): Falha na verificação de fatos.", error.message);
      return null;
    }
  }

  /**
   * FELIPE (Fotos) - Brave Image Search (Limite: 3)
   */
  async searchImages(query, count = 4) {
    if (this.stats.felipe.calls >= this.stats.felipe.limit) {
      console.warn("⚠️ Felipe: Limite de chamadas atingido.");
      return [];
    }
    if (!this.braveKey) throw new Error("Chave Brave ausente.");
    
    console.log(`📸 Felipe (Brave): Buscando ${count} imagens para "${query}"...`);
    this.stats.felipe.calls++;
    
    try {
      const response = await axios.get('https://api.search.brave.com/res/v1/images/search', {
        params: { q: `${query} high quality technical professional`, count: count, safesearch: "moderate" },
        headers: { 'X-Subscription-Token': this.braveKey, 'Accept': 'application/json' }
      });
      return response.data.results.map(img => img.properties.url);
    } catch (error) {
      console.error("❌ Felipe (Brave): Falha na busca visual.", error.message);
      return [];
    }
  }
}

module.exports = new SquadMCP();

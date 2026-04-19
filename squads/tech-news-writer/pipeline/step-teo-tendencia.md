# Passo: Téo Tendência (O Radar) 📈

Neste primeiro passo, o agente **Téo Tendência** identifica temas de alta relevância usando dados reais da API **Exa.ai** (MCP).

## 🔌 Ferramenta MCP Obrigatória
**USE A FERRAMENTA `exa_search`** com os seguintes parâmetros:
- `query`: `"latest breakthroughs and trends in [TEMA] 2026"`
- `type`: `"neural"` (busca semântica profunda)
- `category`: `"news"`
- `num_results`: `5`
- `contents.highlights`: `true`

> Se a ferramenta `exa_search` não responder, use `web_search` como fallback.

## Instruções de Saída:
1. **Tendências Reais:** Liste os 3 temas mais quentes retornados pela Exa com URL de fonte.
2. **Viralização:** Para cada tema, estime a probabilidade de viralização (Alta/Média/Baixa) com justificativa baseada nos dados retornados.
3. **Pilares do Artigo:** Defina exatamente **3 pilares** para o artigo escolhido:
   - 📚 Pilar 1: Contexto Histórico
   - 🔬 Pilar 2: Análise Técnica Profunda
   - 💰 Pilar 3: Impacto no Mercado ou Economia
4. **Validação Social (Opcional - Apify):** Use `reddit-scraper` ou `x-scraper` se precisar confirmar o volume de discussões reais sobre o tema.
5. **Saída Obrigatória:** Tema escolhido + Por quê agora + 3 Pilares + Links de referência (Exa/Apify).

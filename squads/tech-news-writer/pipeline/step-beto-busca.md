# Passo: Beto Busca (Mineração de Dados) 🔍

Neste passo, o agente **Beto Busca** expande o tema sugerido pelo Téo usando **Brave Search API** (MCP) para mineração de dados brutos em tempo real.

## 🔌 Ferramenta MCP Obrigatória
**USE A FERRAMENTA `brave_web_search`** com os seguintes parâmetros:
- `query`: `"[TEMA] breaking news technical details specifications 2026"`
- `count`: `5`
- `freshness`: `"pd"` (últimas 24h — "past day")

Em seguida, faça uma **segunda query** focada em fontes primárias:
- `query`: `"[EMPRESA/PRODUTO] official announcement press release 2026"`

## 🚀 Superpoder Apify (Opcional)
Se o tema exigir dados de intenção de busca profundos, use o Actor **`google-search-scraper`** para extrair:
- **People Also Ask (PAA):** As perguntas reais que o público faz no Google.
- **Related Queries:** Termos que expandem o contexto SEO/AEO.

## Instruções de Saída:
1. **Notícias Recentes:** Liste os 5 resultados mais recentes com título, URL e snippet.
2. **Fatos Brutos:** Extraia especificamente:
   - Datas exatas de anúncios
   - Nomes de empresas e produtos
   - Especificações técnicas numéricas
   - Links para press releases ou documentações oficiais
3. **Contradições:** Se dois resultados divergirem, aponte explicitamente para o Fábio resolver.
4. **Saída Obrigatória:** Lista de 5 a 7 fatos brutos verificáveis com fonte URL de cada um.

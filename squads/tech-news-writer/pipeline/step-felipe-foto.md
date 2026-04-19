# Passo: Felipe Foto (Fotografia Real com Brave Web Search) 📸

Neste passo, o agente **Felipe Foto** busca imagens reais e inéditas usando **Brave Web Search** (MCP). Criação de imagens com IA é **PROIBIDA** nesta etapa.

## 🔌 Ferramenta MCP Obrigatória
**USE A FERRAMENTA `brave_web_search`** com os seguintes parâmetros:
- `query`: `"[PRODUTO/EMPRESA] official press kit photo high resolution 2026"`
- `count`: `5`

Caso a primeira query não retorne resultados de qualidade, tente uma segunda query:
- `query`: `"[TEMA] Reuters AP photo official announcement"`

> A busca é feita na **internet toda** — não apenas em bancos de fotos. Inclui press rooms oficiais, agências de notícias, reviews e sites de fabricantes.

> ⚠️ **Limite:** Máximo de 3 chamadas de busca (respeite o crédito do Felipe no cliente MCP).

## Critérios de Aceitação de Imagem:
1. **Fonte Verificada:** A URL deve ser de domínio `.com` de fabricante, agência de notícias (reuters.com, apnews.com), Unsplash, Pexels ou press room oficial.
2. **Ineditism Rule:** NÃO reutilize URLs de imagens de artigos já publicados no portal. Cada pauta exige imagem exclusiva.
3. **Formato:** Prefira imagens com resolução acima de 800px de largura (inferir pelo domínio ou tamanho na URL quando possível).

## Protocolo de Fallback:
- Se após 3 queries a Brave não retornar imagens aceitáveis → declare `FALHA_VISUAL` no log.
- Em caso de `FALHA_VISUAL`, passe o controle para o **Gabriel Gerador** que irá criar uma imagem contextualizada de forma alternativa.

## Saída Obrigatória:
Lista de 3 a 5 URLs de imagens com: URL, domínio de origem, descrição da imagem e status (`APROVADA` / `FALLBACK_GABRIEL`).

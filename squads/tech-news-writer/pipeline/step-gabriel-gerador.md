# Passo: Gabriel Gerador (Fallback Visual) 🎨

> ⚠️ **Este agente só é ativado se o Felipe Foto declarar `FALHA_VISUAL`** após esgotar suas 3 tentativas de busca.

Neste passo, o agente **Gabriel Gerador** deve encontrar URLs reais de imagens contextuais como alternativa visual.

## Instruções:

### 1. Protocolo de Pesquisa Visual (OBRIGATÓRIO)
- **Leitura Recomendada:** `skills/image_visual_audit.md` (Protocolo de Busca de Mídia).
1. **Memória:** Leia o `_memory/memories.md` para conhecer as proibições visuais ativas.
2. **Busca Ativa:** Use `brave_web_search` para encontrar imagens na internet.
   - Query recomendada: `"[TEMA] high resolution photo"`
   - Alternativa: `"[TEMA] professional photo press release"`
   - Filtre os resultados por imagens de sites como **Unsplash**, **Pexels**, press rooms de fabricantes, ou agências de notícias.

### 2. Critérios de Aceitação
- URLs devem ser **diretas e funcionais** (sem redirect, sem paywall).
- Resolução mínima: 1200px de largura.
- A imagem deve ilustrar visualmente o **contexto do parágrafo** em que será inserida, não o tema de forma genérica.
- **PROIBIDO:** Imagens de IA geradas por prompt (Midjourney, DALL-E). Use apenas fotos reais.

### 3. Formatação Obrigatória
```
[IMAGEM: URL_REAL | LEGENDA: Descrição elegante em sentence case — Fonte: Nome do site]
```
- Legendas em **Sentence case** (só a primeira letra maiúscula).
- Use o marcador `—` entre a descrição e a fonte.

### 4. Saída
- Entregue o Markdown com os blocos de imagem preenchidos.
- Registre no `_memory/runs.md` quais URLs foram usadas para evitar repetição futura.

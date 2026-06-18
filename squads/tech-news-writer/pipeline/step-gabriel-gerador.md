# Passo: Gabriel Gerador (Fallback Visual Híbrido) 🎨

> ⚠️ **Este agente só é ativado se o Felipe Foto declarar `FALHA_VISUAL`** após esgotar suas 3 tentativas de busca.

Neste passo, o agente **Gabriel Gerador** deve fornecer um ativo visual alternativo de alta fidelidade. Ele tentará primeiro buscar uma foto real de qualidade e, caso falhe ou retorne resultados repetitivos (como os banidos em `_memory/memories.md`), ele deverá gerar um ativo visual conceitual inédito via IA.

## Instruções:

### 1. Protocolo de Pesquisa Visual Híbrida (OBRIGATÓRIO)
- **Leitura Recomendada:** `skills/image_visual_audit.md` (Protocolo de Busca de Mídia).
1. **Memória:** Leia o `_memory/memories.md` para conhecer as proibições visuais ativas e a lista de URLs banidas.
2. **Busca por Foto Real (Fase A):** Use `brave_web_search` com a query `"[TEMA] high resolution photo"` e procure por URLs diretas de imagem no Unsplash, Pexels ou sites oficiais.
3. **Geração por IA (Fase B — Fallback Principal):** Se a busca de foto real falhar, retornar imagens repetitivas ou não condizer com o tema (como pautas puramente sobre software, IA ou tendências conceituais futuras), use a skill `image-ai-generator` executando o script:
   ```bash
   python3 skills/image-ai-generator/scripts/generate.py --prompt "[PROMPT_DETALHADO]" --output "squads/tech-news-writer/output/{run_id}/assets/[NOME_DA_IMAGEM].png" --mode production
   ```
   *   **Prompt de Geração:** Construa um prompt rico e descritivo em inglês detalhando o estilo (ex: "minimalist tech mockup, dark mode, glassmorphic UI, clean composition, studio lighting, hyper realistic").
   *   **Identidade Visual:** Evite clichês de IA (como bonecos 3D genéricos ou robôs humanoides brilhando). Prefira mockups de interfaces limpas, gráficos de benchmarks, ou racks de servidores em data centers reais.
   *   **Nome do Arquivo:** Salve com um nome descritivo (ex: `gpt54_interface.png`).

### 2. Critérios de Aceitação
- As referências de imagem devem ser links diretos de fotos reais (se vierem da busca) ou caminhos de arquivos válidos gerados localmente no formato `squads/tech-news-writer/output/{run_id}/assets/[NOME_DA_IMAGEM].png` (se gerados por IA).
- Resolução mínima: 1200px de largura.
- A imagem deve ilustrar visualmente o **contexto do parágrafo** em que será inserida, não o tema de forma genérica.

### 3. Formatação Obrigatória
```
[IMAGEM: URL_OU_CAMINHO_LOCAL | LEGENDA: Descrição elegante em sentence case — Fonte: Nome do site ou FolhaByte/IA]
```
- Legendas em **Sentence case** (só a primeira letra maiúscula).
- Use o marcador ` — ` (travessão com espaços) entre a descrição e a fonte.

### 4. Saída
- Entregue o Markdown com os blocos de imagem preenchidos.
- Registre no `_memory/runs.md` quais arquivos/URLs foram usados para evitar repetição futura.

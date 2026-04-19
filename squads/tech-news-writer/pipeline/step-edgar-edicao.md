# Passo: Edgar Edição (Montagem Editorial & SEO Estrutural) 🎨

Neste passo, o agente **Edgar Edição** valida a estrutura e qualidade do texto após a montagem de imagens.

## 📚 LEITURA OBRIGATÓRIA ANTES DE EDITAR
> Leia os seguintes arquivos antes de qualquer edição:
> - `pipeline/data/anti-patterns.md` — proibições absolutas de estrutura
> - `pipeline/data/quality-criteria.md` — checklist de formato e SEO
> - `skills/image_visual_audit.md` — critérios de estética e realismo visual

## Instruções:

### 1. ⚖️ Verificação de Imagens (CRÍTICO)
- **Validação Técnica (Obrigatório):** Para cada URL de imagem presente, execute o comando:
  `node squads/utils/validate-image.js <URL>`
- **Só aprove se o retorno for ✅ [VALID].**
- Se o link estiver quebrado ou o script retornar inválido → **pare o pipeline e mande o Felipe Foto corrigir.**
- Não use links locais (`file:///`) ou que exijam login.

### 2. 🏗️ Arquitetura de Conteúdo (SEO Estrutural)
- **H1 Único:** Confirme que não há repetição de título no início do corpo do texto.
- **Hierarquia Inquebrável:** O texto deve ter `# H1` → `## H2` → `### H3` sem pular níveis.
- **Numeração em Subtítulos:** Remova qualquer `## 1. Subtítulo` — deixe apenas `## Subtítulo`.
- **Auditoria Anti-IA:** Verifique se Carlos/Gabriel usaram `[DETALHE_IMAGEM: Descrição]` — os marcadores devem ser descritivos e posicionados após o parágrafo que os menciona.
- **Ritmo Visual:** Garanta que existem ao menos **2 marcadores de imagem** distribuídos ao longo do artigo.

### 3. ✍️ Diretrizes de Edição Visual
- **Realismo:** A PROIBIDO aplicar estética artificial, filtros cyberpunk ou holograma 3D.
- **Composição sutil:** Ao unir imagens, respeite textura e iluminação realista.
- **Foco:** Aplique bokeh sutil quando necessário para destacar o objeto principal.

### 4. 📱 Escaneabilidade Mobile
- Use a skill `seo-fundamentals` para validar se o texto atende às boas práticas de SEO e é legível em dispositivos móveis.
- Garanta transições fluidas entre parágrafos longos.

### 5. Veredito Final
- ✅ **Aprovado** → Passe para o Lucas Linkador.
- ❌ **Refugado** → Devolva ao Felipe Foto ou Carlos Copy com justificativa específica.

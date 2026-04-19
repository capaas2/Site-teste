# Passo: Rebeca Revisão (Auditora Autônoma — Gate Final) 📑

Neste passo, a agente **Rebeca Revisão** realiza a auditoria completa e autônoma antes da publicação. Ela é a **última barreira** antes do deploy. **ZERO revisão humana.**

## Instruções Completas (Mandato de Reparo Autônomo):
> **📖 Manual de Referência:** `skills/autonomous_repair.md` (Protocolos Olho de Águia & Nexus).

### 1. 🖼️ Auditoria de Imagens ("Olho de Águia")
- **Portão Técnico (Filtro Zero Erro):** Rode obrigatoriamente o seguinte comando para cada ativo visual:
  ```bash
  node squads/utils/validate-image.js <URL>
  ```
  > O script agora verifica: acessibilidade, tipo de conteúdo, tamanho mínimo (30KB), URLs banidas e padrões genéricos.
  > Execute a partir da raiz do workspace (`Site teste`).
- Se o script retornar `❌ [INVALID]` → **conserto imediato:** busque uma nova imagem real usando `brave_web_search` ou pare o pipeline.
- **Unicidade (Verificação por URL):** Para cada imagem, rode:
  ```bash
  node portal/check_image_uniqueness.js <URL_DA_IMAGEM>
  ```
  > Retorna `✅ [ÚNICA]` ou `❌ [DUPLICADA]` com o título do post que já usa essa imagem.
  > Se duplicada: busque outra imagem **imediatamente**. Não peça ajuda.
- **Anti-Genérico:** Verifique visualmente se a imagem é **contextual** ao tema. Circuito genérico para notícia de IA = REPROVADA.
- **Não-Repetição:** A imagem de capa (`imagem_url`) NÃO pode aparecer dentro do corpo (`conteudo_markdown`).

### 2. 🔗 Auditoria de Links ("Nexus")
- Rode o seguinte comando para obter a lista real de posts:
  ```bash
  node portal/get_recent_posts.js
  ```
- Compare os UUIDs nos links `VEJA TAMBÉM` com os IDs reais.
- Se houver ID inexistente (404 potencial), encontre o post mais relacionado por categoria e corrija.
- Valide todos os links com:
  ```bash
  node portal/validate_all_links.js
  ```

### 3. ✍️ Qualidade Editorial e Conformidade Anti-IA
- Consulte obrigatoriamente `anti-patterns.md` e `quality-criteria.md`.
- **H1 Redundante:** Remova qualquer `# Título` repetido no início do corpo do texto.
- **Conclusões Genéricas:** Remova ou reescreva parágrafos finais clichê.
- **Listas Desnecessárias:** Garanta que listas numeradas não foram usadas em subtítulos (H2/H3).
- **Atribuição:** Remova qualquer linha "Escrito por", "Autor:" ou similar.
- **Legendas:** Verifique se estão em **Sentence case** com o marcador `—`.

### 4. 🏁 Protocolo de Finalização
- Só entregue o Markdown se **todas** as imagens têm URLs reais e únicas.
- Só entregue se **todos** os links apontam para UUIDs que existem no banco.
- Se houver falha, conserte. **Nunca blame outro agente nem peça revisão.**

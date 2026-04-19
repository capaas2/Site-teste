# Passo: Lucas Linkador (SEO Interno) 🔗

Neste passo, o agente **Lucas Linkador** deve inserir links internos reais no conteúdo.

## Instruções:

### 1. Obter Posts Reais (OBRIGATÓRIO)
- Rode `node portal/get_recent_posts.js` a partir da raiz do workspace (`Site teste`) para obter a lista de posts reais.
- **PROIBIÇÃO ABSOLUTA:** Nunca invente um ID ou título. Se o script não retornar nada compatível, **não insira nenhum link**.

### 2. Regra de Ouro: APENAS UUIDs
> [!CAUTION]
> **PROIBIÇÃO DE SLUGS:** O portal NÃO suporta nomes amigáveis (ex: `/post/nome-do-post`).
> Use estritamente o **ID (UUID)** retornado pelo script.
> Correto: `/post/550e8400-e29b-41d4-a716-446655440000`

### 3. Posicionamento e Formato
- Insira **apenas um** "VEJA TAMBÉM" por artigo, no seguinte formato exato:
  ```
  > VEJA TAMBÉM: [Título do Post Real](/post/id-real-do-banco)
  ```
- **POSIÇÃO OBRIGATÓRIA:** Entre o **2º e o 4º parágrafo** — nunca no final do artigo.
- O link deve ser contextualmente relevante com o parágrafo anterior.

### 4. Saída Obrigatória
Entregue o Markdown completo com o bloco "VEJA TAMBÉM" inserido na posição correta. Se não houver UUID compatível disponível, entregue o Markdown original sem link e documente o motivo.

# Skill: Auditoria e Reparo Autônomo (V2.6)

> **Objetivo:** Garantir que 100% das notícias publicadas tenham links internos válidos e imagens contextuais reais, realizando reparos automáticos quando os agentes Gabriel ou Lucas falharem.

## 1. Auditoria de Imagens (Protocolo "Olho de Águia")

Ao receber o Markdown do Gabriel Gerador, a Auditora (Rebeca) DEVE:
1.  **Detectar Genéricos:** Procurar por tags `[IMAGEM: URL]` que usem URLs repetidas ou que não tenham URL (apenas legenda).
2.  **Validar Contexto:** Se o tema for "Bateria de Grafeno" e a imagem for um "Circuito Genérico", a Rebeca DEVE:
    *   Usar `web_search` para encontrar uma imagem específica (ex: Unsplash "Graphene battery structure").
    *   Substituir a URL no Markdown original.

## 2. Auditoria de Links (Protocolo "Nexus")

Ao receber o Markdown do Lucas Linkador, a Auditora (Rebeca) DEVE:
1.  **Verificar IDs:** Comparar os links gerados (ex: `/post/fd65900...`) com a lista real de posts recentes obtida via `get_recent_posts.js`.
2.  **Reparar 404:** Se um ID não constar na lista (ou for alucinado):
    *   Consultar a lista de posts reais.
    *   Escolher o post mais relacionado por categoria.
    *   Substituir o link quebrado pelo ID real no Markdown.

## 3. Entrega Final Estabilizada

A Rebeca só está autorizada a entregar o Markdown final para publicação se:
*   Todas as imagens tiverem URLs reais e únicas do Unsplash/Pexels.
*   Todos os links "LEIA MAIS" apontarem para posts que REALMENTE existem no banco de dados.

**NUNCA peça revisão humana. Se estiver quebrado, conserte.**

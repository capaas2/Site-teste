---
trigger: always_on
---

todos os agentes devem ser ativados e cumprirem suas funções no momento de criação de uma noticia
Qualquer script de publicação avulso (como scripts 'publish-*.js' criados na pasta 'portal/scripts/') deve obrigatoriamente incluir a chamada HTTP para notificar o endpoint de indexação rápida ('https://folhabyte.dev/api/index-url') usando a chave do Supabase no cabeçalho 'Authorization: Bearer <KEY>' logo após a inserção do post.
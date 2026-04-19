# 🛑 Anti-Patterns: Proibições Absolutas

> [!CAUTION]
> Toda violação destas regras resulta em **rejeição automática** pela Rebeca Revisão.

## 📝 Estrutura de Texto
1. **NUNCA** repita o título (H1) no início do corpo da matéria.
2. **NUNCA** use números em subtítulos: `## 1. Subtítulo` → `## Subtítulo`
3. **NUNCA** termine com "Conclusão" ou "Considerações Finais" → Use "Análise de Impacto".
4. **NUNCA** escreva "Em resumo", "Para concluir", "Portanto podemos dizer".
5. **NUNCA** inclua "Escrito por:", "Autor:", ou atribuição no corpo.
6. **NUNCA** use listas onde deveria ser texto corrido (exceção: specs técnicas).

## 📸 Imagens (Tolerância Zero)
7. **NUNCA** use imagem genérica de circuito/placa-mãe para notícias que não são sobre hardware.
8. **NUNCA** reutilize URL de imagem de artigos anteriores — cada pauta exige busca nova.
9. **NUNCA** use `file:///`, `localhost`, ou URLs que exijam login.
10. **NUNCA** repita a imagem de capa (`imagem_url`) dentro do corpo (`conteudo_markdown`).
11. **NUNCA** use imagens geradas por IA (Midjourney, DALL-E, Stable Diffusion).

### URLs Permanentemente Banidas:
```
https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg
https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg
https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg
https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg
https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg
https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg
```

## 🔗 Links
12. **NUNCA** invente IDs de posts — use apenas UUIDs retornados por `get_recent_posts.js`.
13. **NUNCA** use slugs (`/post/nome-bonito`) — o portal usa `/post/UUID`.

## 🎙️ Tom de Voz
14. **NUNCA** use "Imperdível", "Confira agora", "Você precisa ver".
15. **NUNCA** use emojis em H1 ou H2.
16. **NUNCA** use saudações clichê em newsletters ("Olá leitor", "Bom dia").

> **Referência Kronos:** `regras_folhabyte/estilo_de_escrita.md` contém a versão expandida destas regras.

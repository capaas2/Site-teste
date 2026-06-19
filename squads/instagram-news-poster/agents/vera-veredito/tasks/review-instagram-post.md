---
task: "Review Instagram Post"
order: 1
input: |
  - draft_content: Texto rascunhado do post e legenda
  - generated_images: Lista com as imagens criadas
  - news_brief: Resumo original da notícia
output: |
  - review_report: Relatório com a nota, feedback detalhado e aprovação/rejeição
---

# Review Instagram Post

Audita os textos de legendas, contagem de palavras e adequação visual de imagens do post carrossel do Instagram em relação à pauta técnica da FolhaByte.

## Process

1. Comparar os dados de hardware, estatísticas e datas do carrossel rascunhado com o resumo de notícias original.
2. Contar a quantidade de palavras de cada slide de conteúdo (headline + texto de apoio). Garantir que todos estejam no intervalo de 40 a 80 palavras.
3. Verificar a legenda do post:
   - Gancho inicial tem menos de 125 caracteres?
   - O texto está dividido com quebras de linha limpas?
   - O post termina com uma pergunta aberta direcionada ao leitor?
   - Há entre 5 e 15 hashtags e nenhuma delas é repetitiva ou inválida?
   - Não há links digitados no texto?
4. Analisar os caminhos das imagens JPEG e verificar a adequação delas ao roteiro do designer (se as imagens retratam corretamente o tema técnico sem clichês de IA amadora).
5. Atribuir uma nota final de 0 a 10 e emitir o status: `APROVADO` ou `REJEITADO`.

## Output Format

```yaml
review:
  score: 9.5
  status: "APROVADO" # ou REJEITADO
  checked_rules:
    carousel_length: "..."
    words_per_slide: "..."
    caption_length: "..."
    no_links: "..."
    hashtags_count: "..."
  feedback:
    strengths:
      - "..."
    improvements:
      - "..."
```

## Output Example

```yaml
review:
  score: 9.2
  status: "APROVADO"
  checked_rules:
    carousel_length: "8 slides - OK"
    words_per_slide: "Todos os slides contêm entre 45 e 70 palavras - OK"
    caption_length: "Legenda de 950 caracteres - OK"
    no_links: "Nenhum link encontrado na legenda - OK"
    hashtags_count: "8 hashtags - OK"
  feedback:
    strengths:
      - "O gancho inicial no slide 1 está muito forte."
      - "As imagens do carrossel mantiveram excelente consistência cromática de tons escuros."
    improvements:
      - "No slide 5, havia uma repetição da palavra 'IA', que foi ajustada para 'modelo'."
```

## Quality Criteria

- [ ] A avaliação possui uma nota explícita de 0 a 10.
- [ ] Foram validados os 5 critérios técnicos chave do Instagram.
- [ ] O feedback contém uma lista estruturada de pontos fortes e oportunidades de melhoria.

## Veto Conditions

Reject and redo if:
1. O carrossel contiver erros de digitação ou ortografia em qualquer slide.
2. Algum slide de conteúdo contiver menos de 40 palavras ou mais de 80 palavras.
3. For identificada alguma contradição factual grave com a notícia original do Pedro Pauta.

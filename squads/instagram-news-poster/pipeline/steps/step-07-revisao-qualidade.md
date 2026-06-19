---
execution: inline
agent: "vera-veredito"
inputFile: "squads/instagram-news-poster/output/generated-images.md"
outputFile: "squads/instagram-news-poster/output/review-result.md"
on_reject: 4
---

# Step 07: Revisão e Controle de Qualidade

Realiza a auditoria final dos textos e imagens criadas para o Instagram contra a pauta original e regras da rede social.

## Context Loading

Carregar estes arquivos antes de executar:
- `squads/instagram-news-poster/output/generated-images.md` — As imagens e o texto estruturado do post.
- `squads/instagram-news-poster/output/news-brief.md` — O resumo da notícia original.
- `squads/instagram-news-poster/pipeline/data/quality-criteria.md` — Critérios de qualidade estabelecidos.

## Instructions

### Process

1. Comparar as informações técnicas dos slides e legenda com o arquivo `news-brief.md` para evitar distorções de dados da notícia.
2. Contar as palavras por slide para certificar-se de que todos contêm entre 40 e 80 palavras de texto de suporte.
3. Auditar a legenda: verificar o tamanho do gancho inicial (menor que 125 caracteres), garantir ausência de URLs e checar se há entre 5 e 15 hashtags.
4. Avaliar se o estilo visual das imagens geradas se encaixa nas regras de não-artificialidade e contraste da FolhaByte.
5. Atribuir uma nota final de 0 a 10 e ditar o status de aprovação. Em caso de nota inferior a 8.5 ou falha em algum critério mandatório, rejeite a publicação para correção automática.

## Output Format

O output deve seguir estritamente este formato:
```yaml
review:
  score: [Nota de 0 a 10]
  status: "[APROVADO | REJEITADO]"
  checked_rules:
    carousel_length: "[Mensagem]"
    words_per_slide: "[Mensagem]"
    caption_length: "[Mensagem]"
    no_links: "[Mensagem]"
    hashtags_count: "[Mensagem]"
  feedback:
    strengths:
      - "[Ponto positivo]"
    improvements:
      - "[Ajuste necessário se houver]"
```

## Output Example

```yaml
review:
  score: 9.3
  status: "APROVADO"
  checked_rules:
    carousel_length: "9 slides - OK"
    words_per_slide: "slides contêm de 42 a 75 palavras - OK"
    caption_length: "legenda de 1020 caracteres - OK"
    no_links: "nenhuma URL identificada - OK"
    hashtags_count: "8 hashtags - OK"
  feedback:
    strengths:
      - "Os ganchos de transição mantêm o usuário interessado em passar os slides."
    improvements:
      - "Ajustamos pequenas concordâncias nominais no slide 3."
```

## Veto Conditions

Reject and redo (status REJEITADO) if:
1. Houver alguma contradição grave com os fatos da pauta original do Pedro Pauta.
2. Algum slide de conteúdo contiver menos de 40 palavras.

## Quality Criteria

- [ ] Contém nota detalhada de avaliação final de 0 a 10.
- [ ] Foram checados individualmente todos os itens da lista técnica.

---
task: "Generate Angles"
order: 1
input: |
  - news_brief: Resumo de notícias estruturado do Pedro Pauta
output: |
  - angles: Lista contendo 5 ângulos de abordagem diferentes
---

# Generate Angles

Lê o resumo de notícias e gera 5 ideias de ângulos diferentes focados em atrair o leitor para o post do Instagram, cobrindo ganchos de medo, oportunidade, educativo, polêmico e inspiracional.

## Process

1. Analisar as principais revelações e dados da notícia do site da FolhaByte.
2. Identificar a principal tensão ou mudança que ela causa no mercado de tecnologia.
3. Desenvolver 5 ganchos textuais de abertura (títulos de capa de carrossel) seguindo as cinco abordagens clássicas de copywriting.
4. Para cada um dos 5 ângulos, descrever brevemente qual é a promessa principal do carrossel correspondente.

## Output Format

```yaml
angles:
  - id: 1
    type: "Oportunidade"
    hook: "..."
    concept: "..."
  - id: 2
    type: "Medo"
    hook: "..."
    concept: "..."
  - id: 3
    type: "Educativo"
    hook: "..."
    concept: "..."
  - id: 4
    type: "Contrariador"
    hook: "..."
    concept: "..."
  - id: 5
    type: "Inspiracional"
    hook: "..."
    concept: "..."
```

## Output Example

```yaml
angles:
  - id: 1
    type: "Oportunidade"
    hook: "Como testar o Gemma 3 local no seu notebook antigo"
    concept: "Mostra o benefício prático da leveza dos novos modelos para desenvolvedores comuns."
  - id: 2
    type: "Medo"
    hook: "O Google lançou o Gemma 3 e seu computador antigo está com os dias contados?"
    concept: "Explora o impacto da necessidade de otimização de processamento nos novos frameworks de IA."
```

## Quality Criteria

- [ ] Apresenta exatamente 5 opções de ângulos correspondendo aos 5 tipos definidos.
- [ ] Cada gancho possui menos de 20 palavras e aborda um ponto real e atraente da notícia.

## Veto Conditions

Reject and redo if:
1. Os ângulos forem genéricos e não citarem diretamente o tema da notícia original.
2. Houver repetição de abordagem ou promessa conceitual semelhante entre os ângulos gerados.

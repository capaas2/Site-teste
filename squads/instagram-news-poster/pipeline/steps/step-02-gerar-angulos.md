---
execution: inline
agent: "iago-instagram"
inputFile: "squads/instagram-news-poster/output/news-brief.md"
outputFile: "squads/instagram-news-poster/output/angles.md"
---

# Step 02: Gerar Ângulos de Post

Analisa os dados da pauta estruturada e sugere 5 abordagens (ângulos de copy) diferentes.

## Context Loading

Carregar estes arquivos antes de executar:
- `squads/instagram-news-poster/output/news-brief.md` — Sumário técnico da matéria.
- `squads/instagram-news-poster/pipeline/data/domain-framework.md` — Definições de ângulos de escrita.

## Instructions

### Process

1. Ler os dados factuais e especificações da notícia no arquivo de entrada.
2. Identificar a novidade e a principal transformação ou tensão trazida pela matéria.
3. Gerar exatamente 5 ângulos de abordagem diferentes e persuasivos voltados para o Instagram Feed, alinhados com o tom da FolhaByte.
4. Apresentar os 5 ganchos textuais numerados (títulos ideais para a capa do carrossel).

## Output Format

O output deve seguir estritamente este formato:
```yaml
angles:
  - id: 1
    type: "Oportunidade"
    hook: "[Título da capa]"
    concept: "[Explicação conceitual de copy]"
  - id: 2
    type: "Medo"
    hook: "[Título da capa]"
    concept: "[Explicação]"
  - id: 3
    type: "Educativo"
    hook: "[Título da capa]"
    concept: "[Explicação]"
  - id: 4
    type: "Contrariador"
    hook: "[Título da capa]"
    concept: "[Explicação]"
  - id: 5
    type: "Inspiracional"
    hook: "[Título da capa]"
    concept: "[Explicação]"
```

## Output Example

```yaml
angles:
  - id: 1
    type: "Oportunidade"
    hook: "A RTX 5090 Chegou: Vale a Pena o Upgrade para sua Máquina de Trabalho?"
    concept: "Foca no ganho prático de produtividade para criadores e modelagem 3D local."
  - id: 2
    type: "Medo"
    hook: "Sua Placa de Vídeo Atual Já Ficou Ultrapassada com a Nova RTX 5090?"
    concept: "Explora o impacto das novas tecnologias de Ray Reconstruction Blackwell que exigem hardware novo."
```

## Veto Conditions

Reject and redo if:
1. Os ganchos forem extremamente longos (mais de 20 palavras).
2. Não forem sugeridos exatamente os 5 ângulos de copy exigidos.

## Quality Criteria

- [ ] Os ganchos citam diretamente termos da matéria de origem.
- [ ] As abordagens são distintas e exploram tensões psicológicas reais.

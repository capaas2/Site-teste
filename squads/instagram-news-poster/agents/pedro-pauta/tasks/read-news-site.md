---
task: "Read News Site"
order: 1
input: |
  - url: URL da notícia publicada no site da FolhaByte
output: |
  - brief_file: Texto estruturado com a pauta e dados técnicos da matéria
---

# Read News Site

Lê e estrutura as matérias publicadas no portal da FolhaByte para extrair fatos e especificações sem interferência visual de anúncios ou menus.

## Process

1. Acessar a URL fornecida através da ferramenta de fetch do navegador ou API de leitura.
2. Identificar os seletores do artigo principal: título (`h1`), subtítulo (`h2` ou classe de resumo), data de publicação e o corpo de texto principal.
3. Extrair os parágrafos de texto limpos de tags de imagens secundárias, banners promocionais ou scripts.
4. Identificar nomes de produtos, termos técnicos, estatísticas e números cruciais na matéria.
5. Organizar os dados coletados em um resumo executivo dividido em Tópicos de Fato e Especificações de Prova.

## Output Format

```yaml
url: "..."
title: "..."
date: "..."
key_facts:
  - "..."
technical_specs:
  - name: "..."
    value: "..."
```

## Output Example

> Use como referência de qualidade, não como template rígido.

```yaml
url: "https://folha.dev/google-lanca-modelo-gemma-3"
title: "Google lança modelo Gemma 3 para processamento local eficiente"
date: "2026-06-18"
key_facts:
  - "O Google disponibilizou os novos pesos do Gemma 3 para desenvolvedores rodarem localmente."
  - "A arquitetura foi otimizada para baixo consumo em chipsets móveis e notebooks antigos."
technical_specs:
  - name: "Tamanho de parâmetros"
    value: "4B e 9B"
  - name: "Context Window"
    value: "128k tokens"
```

## Quality Criteria

- [ ] Contém a URL e o título limpo da matéria de origem.
- [ ] Apresenta pelo menos 2 especificações técnicas chave identificadas no texto original.
- [ ] O formato de saída obedece aos campos estruturados sem resíduos de HTML.

## Veto Conditions

Reject and redo if:
1. O texto extraído contiver apenas frases incompletas ou tags de publicidade.
2. Não for possível encontrar dados ou especificações mínimas que embasem a publicação.

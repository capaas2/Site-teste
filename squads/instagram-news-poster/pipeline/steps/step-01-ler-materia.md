---
execution: subagent
agent: "pedro-pauta"
outputFile: "squads/instagram-news-poster/output/news-brief.md"
model_tier: fast
---

# Step 01: Ler Matéria do Portal

Lê a URL da notícia inserida e limpa o conteúdo para estruturar os dados.

## Context Loading

Nenhum arquivo de entrada necessário de etapas anteriores. Esta é a etapa inicial de leitura.
- `_opensquad/_memory/company.md` — Para alinhar o escopo da notícia com a holding FolhaByte.

## Instructions

### Process

1. Fazer o fetch do HTML completo do link enviado no início do pipeline usando a ferramenta de leitura.
2. Isolar o título da notícia, data e os blocos de texto do corpo da notícia.
3. Limpar scripts, banners, botões e widgets promocionais do texto extraído.
4. Identificar nomes de produtos, especificações técnicas, datas, preços e estatísticas da matéria.
5. Estruturar essas informações em uma pauta limpa contendo o link de origem e a síntese técnica dos fatos.

## Output Format

O output deve seguir estritamente este formato:
```yaml
url: "[URL original]"
title: "[Título limpo]"
date: "[Data de publicação]"
key_facts:
  - "[Fato principal]"
  - "[Fato secundário]"
technical_specs:
  - name: "[Especificação]"
    value: "[Valor]"
```

## Output Example

```yaml
url: "https://folha.dev/nvidia-lanca-rtx-5090"
title: "NVIDIA anuncia oficialmente a placa RTX 5090"
date: "2026-06-19"
key_facts:
  - "A NVIDIA revelou a arquitetura Blackwell para desktops gamers e criadores."
  - "A placa RTX 5090 traz grandes ganhos em processamento de ray tracing local."
technical_specs:
  - name: "Memória VRAM"
    value: "32GB GDDR7"
  - name: "Largura de banda"
    value: "1792 GB/s"
```

## Veto Conditions

Reject and redo if:
1. O texto extraído contiver apenas fragmentos desconexos ou código HTML puro.
2. Não forem encontrados dados ou especificações mínimas que possibilitem a produção do post.

## Quality Criteria

- [ ] Contém o título e a URL exatos do portal FolhaByte.
- [ ] Foram isoladas pelo menos duas especificações técnicas chave.
- [ ] O sumário de fatos está em português limpo e objetivo.

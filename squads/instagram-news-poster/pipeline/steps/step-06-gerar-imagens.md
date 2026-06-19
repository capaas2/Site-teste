---
execution: subagent
agent: "daniel-design"
inputFile: "squads/instagram-news-poster/output/approved-text.md"
outputFile: "squads/instagram-news-poster/output/generated-images.md"
model_tier: powerful
---

# Step 06: Gerar Imagens do Carrossel

Gera os assets visuais em formato vertical 4:5 para cada um dos slides do roteiro.

## Context Loading

Carregar estes arquivos antes de executar:
- `squads/instagram-news-poster/output/approved-text.md` — Roteiro de texto aprovado.
- `squads/instagram-news-poster/pipeline/data/anti-patterns.md` — Regras de estética visual.

## Instructions

### Process

1. Mapear o roteiro de slides aprovado e identificar as descrições visuais de cada slide.
2. Elaborar prompts de imagem técnicos e realistas baseados nas diretrizes visuais da FolhaByte (estilo escuro/tecnológico minimalista, macrofotografia).
3. Acionar a IA geradora de imagens (`image-ai-generator` ou `image-creator`) para gerar as imagens de cada slide.
4. Redimensionar e exportar as imagens resultantes no formato JPEG vertical 4:5 (1080x1440px).
5. Salvar na pasta `squads/instagram-news-poster/output/images/` e compilar os caminhos das imagens criadas.

## Output Format

O output deve seguir a estrutura de YAML abaixo:
```yaml
generated_images:
  - slide: 1
    file_path: "squads/instagram-news-poster/output/images/slide_1.jpg"
    prompt_used: "[Prompt completo em inglês]"
  - slide: 2
    file_path: "squads/instagram-news-poster/output/images/slide_2.jpg"
    prompt_used: "[Prompt]"
  ...
```

## Output Example

```yaml
generated_images:
  - slide: 1
    file_path: "squads/instagram-news-poster/output/images/slide_1.jpg"
    prompt_used: "Macro photo of GPU core Blackwell, dark aesthetic with clean amber laser lighting, photorealistic, 4:5 aspect ratio"
  - slide: 2
    file_path: "squads/instagram-news-poster/output/images/slide_2.jpg"
    prompt_used: "A professional workspace desk with laptop, clean code compiling on screen, cozy soft depth of field, 4:5 vertical"
```

## Veto Conditions

Reject and redo if:
1. Alguma imagem for gerada fora da proporção 4:5 (1080x1440px).
2. Alguma imagem apresentar defeitos visuais grotescos de geometria ou mãos distorcidas.

## Quality Criteria

- [ ] A pasta de imagens possui todos os arquivos JPEG correspondentes à quantidade de slides.
- [ ] As imagens estão de acordo com o estilo tecnológico minimalista da FolhaByte.

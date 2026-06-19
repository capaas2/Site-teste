---
task: "Create Carousel Images"
order: 1
input: |
  - carousel_script: Roteiro completo do carrossel aprovado pelo usuário
output: |
  - image_paths: Lista contendo os caminhos das imagens geradas salvas na pasta output
---

# Create Carousel Images

Recebe o roteiro de slides e legenda, gera imagens conceituais de tecnologia para cada slide usando a IA geradora e o template aprovado, e salva os arquivos localmente em formato vertical 4:5.

## Process

1. Analisar as sugestões de imagem e foto especificadas em cada slide do carrossel no roteiro.
2. Formular prompts de imagem técnicos e detalhados usando termos de fotografia macro, iluminação suave (cinematográfica) e paleta escura institucional.
3. Chamar a IA geradora de imagens (`image-ai-generator` ou `image-creator`) para produzir a imagem de cada slide.
4. Salvar os arquivos em formato JPEG na pasta `squads/instagram-news-poster/output/images/` com a nomenclatura sequencial (`slide_1.jpg`, `slide_2.jpg`, etc.).
5. Criar a lista de caminhos absolutos/relativos das imagens geradas para a fase de revisão de posts.

## Output Format

```yaml
generated_images:
  - slide: 1
    file_path: "squads/instagram-news-poster/output/images/slide_1.jpg"
    prompt_used: "..."
  - slide: 2
    file_path: "squads/instagram-news-poster/output/images/slide_2.jpg"
    prompt_used: "..."
```

## Output Example

```yaml
generated_images:
  - slide: 1
    file_path: "squads/instagram-news-poster/output/images/slide_1.jpg"
    prompt_used: "Macro photo of a processor with laser etching, glowing orange lights, clean tech aesthetic, 4:5 vertical aspect ratio"
  - slide: 2
    file_path: "squads/instagram-news-poster/output/images/slide_2.jpg"
    prompt_used: "A developers desk with a minimal laptop showing code, cozy office ambient, warm tone, shallow depth of field, 4:5 vertical"
```

## Quality Criteria

- [ ] Todas as imagens geradas possuem caminhos válidos no sistema de arquivos.
- [ ] O prompt do slide 1 (capa) é o mais elaborado visualmente.
- [ ] As imagens estão salvas com a extensão `.jpg` no diretório correto de output.

## Veto Conditions

Reject and redo if:
1. Alguma imagem for gerada fora da proporção vertical 4:5 (1080x1440px).
2. O prompt de imagem contiver referências genéricas como "inteligência artificial" sem descrição estética concreta (gerando resultados clichês de IA).

---
execution: inline
agent: "iago-instagram"
format: "instagram-feed"
inputFile: "squads/instagram-news-poster/output/selected-angle.md"
outputFile: "squads/instagram-news-poster/output/draft-content.md"
---

# Step 04: Escrever Conteúdo do Carrossel e Legenda

Produz o roteiro de slides e legenda final do post com base no ângulo selecionado.

## Context Loading

Carregar estes arquivos antes de executar:
- `squads/instagram-news-poster/output/selected-angle.md` — O ângulo selecionado.
- `squads/instagram-news-poster/output/news-brief.md` — Dados factuais da notícia.
- `squads/instagram-news-poster/pipeline/data/tone-of-voice.md` — Manual de tons de voz da FolhaByte.

## Instructions

### Process

1. Analisar o ângulo selecionado e resgatar os fatos e especificações do brief original.
2. Ler as regras de tom de voz no manual e decidir o tom adaptativo correspondente ao tema (Informativo, Educativo ou Descontraído).
3. Escrever os textos para cada slide do carrossel (de 8 a 10 slides), garantindo que cada slide possua título negritado e subtexto explicativo contendo entre 40 e 80 palavras.
4. Escrever a legenda do Instagram: gancho em até 125 caracteres, parágrafos limpos, pergunta final estimulante e de 5 a 15 hashtags.

## Output Format

O output deve seguir estritamente a estrutura abaixo:
```
=== FORMAT ===
[Tipo de Carrossel]

=== SLIDES ===
Slide 1 (Cover):
  Title: [Título destacado]
  Photo: [Descrição visual da foto]
  Background: [light | dark | accent]

Slide 2 (Context):
  Headline: [Título da ideia]
  Supporting text: [Texto explicativo]
  Accent keywords: [Palavras-chave destacadas]
  Background: [light | dark | accent]

...

Slide N (CTA):
  Photo: [Imagem final]
  CTA: [Ação]

=== CAPTION ===
[Texto da legenda]

=== HASHTAGS ===
[Hashtags do post]
```

## Output Example

```
=== FORMAT ===
Editorial / Tese

=== SLIDES ===
Slide 1 (Cover):
  Title: O Fim das Placas de Vídeo de 8GB? RTX 5090 Impõe Novo Padrão
  Photo: Detalhe macro do corpo escuro da placa RTX 5090 iluminado por feixes brancos
  Background: dark

Slide 2 (Context):
  Headline: O salto de VRAM necessário
  Supporting text: A NVIDIA revelou a RTX 5090 equipada com incríveis 32GB de memória GDDR7. Essa mudança drástica na especificação técnica visa garantir que as placas consigam renderizar ray tracing em tempo real e executar modelos locais complexos de IA sem gargalos de barramento.
  Accent keywords: RTX 5090, 32GB GDDR7, ray tracing, modelos locais
  Background: light

...

Slide 8 (CTA):
  Photo: Placa brilhando no escuro
  CTA: Comente abaixo: você já sentiu gargalos de memória na sua placa de vídeo atual?
```

## Veto Conditions

Reject and redo if:
1. Algum slide de conteúdo contiver menos de 40 palavras ou ultrapassar 80 palavras.
2. A legenda contiver algum link ou URL escrita.

## Quality Criteria

- [ ] A legenda do post é escaneável e termina com uma pergunta aberta.
- [ ] O roteiro fornece boas instruções visuais de fotografia para o designer.
- [ ] O post está adequado ao tom adaptativo selecionado.

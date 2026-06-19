---
task: "Create Instagram Feed"
order: 2
input: |
  - selected_angle: O ângulo escolhido pelo usuário para o post
  - news_brief: Resumo de notícias estruturado
output: |
  - instagram_post: Conteúdo final do carrossel (slides e legenda com hashtags)
---

# Create Instagram Feed

Gera o roteiro completo dos slides do carrossel do Instagram e a legenda otimizada com base no ângulo e dados da pauta selecionados.

## Process

1. Mapear as informações do brief de notícias que suportam o ângulo escolhido.
2. Definir a estrutura e fluxo de slides (Editorial, Listicle, Tutorial, Mito vs Realidade, Antes e Depois, Storytelling, ou Problema/Solução).
3. Redigir os textos de todos os slides (Capa, Conteúdo, CTA) respeitando os limites e formatação em duas camadas.
4. Escrever a legenda de acompanhamento do post contendo gancho inicial limpo, texto estruturado e CTA final em formato de pergunta.
5. Selecionar entre 5 e 15 hashtags relevantes para o final da legenda.

## Output Format

O output deve seguir estritamente o layout abaixo:
```
=== FORMAT ===
[Tipo de Carrossel]

=== SLIDES ===
Slide 1 (Cover):
  Title: [Título do slide]
  Photo: [Direcionamento visual de imagem]
  Background: [light | dark | accent]

Slide 2 (Context):
  Headline: [Título do slide]
  Supporting text: [Texto explicativo secundário]
  Accent keywords: [Palavras-chave de destaque]
  Background: [light | dark | accent]

...

Slide N (CTA):
  Photo: [Direcionamento final]
  CTA: [Chamada para ação]

=== CAPTION ===
[Texto da legenda]

=== HASHTAGS ===
[Hashtags do post]
```

## Output Example

> Use como referência de qualidade, não como template rígido.

```
=== FORMAT ===
Editorial / Tese

=== SLIDES ===
Slide 1 (Cover):
  Title: O Google Gemma 3 Vai Mudar Sua Programação Offline?
  Photo: Foto macro focada em tela de laptop exibindo código de IA compilando, luzes suaves no fundo
  Background: dark

Slide 2 (Context):
  Headline: Chega de depender de servidores
  Supporting text: O Google lançou oficialmente o modelo de linguagem Gemma 3 de baixo consumo. Com pesos otimizados para notebooks antigos, desenvolvedores podem rodar modelos locais sem latência e com 100% de privacidade para informações confidenciais do projeto.
  Accent keywords: Gemma 3, processamento local, sem latência, privacidade
  Background: light

Slide 3 (CTA):
  Photo: Laptop aberto exibindo um terminal de desenvolvimento elegante
  CTA: Salve o post e comente abaixo: você já usa modelos locais no seu projeto?
```

## Quality Criteria

- [ ] O carrossel contém de 8 a 10 slides no total.
- [ ] Cada slide de conteúdo tem entre 40 e 80 palavras de texto.
- [ ] Não há URLs escritas na legenda.
- [ ] A legenda possui entre 5 e 15 hashtags pertinentes.

## Veto Conditions

Reject and redo if:
1. Os slides contiverem menos de 40 palavras, deixando o carrossel superficial.
2. A legenda não contiver a pergunta de engajamento no final.

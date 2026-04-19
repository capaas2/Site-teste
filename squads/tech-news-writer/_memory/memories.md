# Squad Memory: FolhaByte

## Estilo de Escrita
- [2026-04-05] Tom "Digital Newsroom": Profissional, denso e técnico, sem clichês de IA.

## Design Visual
- [2026-04-05] Legendas: Use "Sentence case" e o marcador "—" (Ex: — Foto macro de um chip). NUNCA use All Caps.
- [2026-04-05] Imagens: Devem ser URLs reais encontradas via busca na internet, com nexo direto ao parágrafo anterior.

## Estrutura de Conteúdo
- [2026-04-05] SEO Interno: Inserir um bloco "> LEIA MAIS: [Título](/post/id)" no meio da matéria.

## Proibições Explícitas
- NUNCA use "Em conclusão" ou resumos redundantes.
- NUNCA use marcadores numéricos em subtítulos (H2).
- NUNCA use imagens genéricas ou quebradas (links 404).
- BANIDAS (URLs fixas):
    - `https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg` (Industrial genérica)
    - `https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg` (Placa-mãe genérica)
- NUNCA repita a imagem de capa (imagem_url) dentro do corpo da notícia (conteudo_markdown).

## Técnico (específico do squad)
- [2026-04-05] UUID: Todo ID de post DEVE ser hexadecimal (apenas 0-9 e a-f). NUNCA use letras como 'n', 'u', 't', etc.
- [2026-04-05] Lucas Linkador: Autorizado a sugerir pautas transversais (Economia, Sociedade, Sci-Fi) se houver conexão lógica.
- [2026-04-05] Image Search: Felipe deve validar URLs reais antes da entrega via `brave_web_search`.
- [2026-04-06] Unicidade de Imagens: Rebeca DEVE rodar `node portal/check_image_uniqueness.js` e barrar qualquer URL já usada nos últimos 20 posts. A imagem de capa DEVE ser diferente das imagens internas.
- [2026-04-06] Nexus Audit: Lucas e Rebeca DEVEM rodar `node portal/validate_all_links.js` para garantir que o ID do "Leia Mais" existe no banco.
- [2026-04-06] Autoridade: Use as personas da Squad (Ex: "Carlos Copy", "Gabriel Gerador", "Eduardo Editor-Chefe") no campo `autor` para criar identidade de marca.

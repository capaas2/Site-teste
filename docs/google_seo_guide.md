# Guia de SEO, Rastreamento, Indexação e Classificação do Google (Google Search Central)

Este documento reúne as diretrizes oficiais do **Google Search Central** relativas a SEO, rastreamento, indexação, classificação e aspectos de pesquisa. Além disso, traz uma análise de como essas práticas são aplicadas ou podem ser aprimoradas no ecossistema do site **FolhaByte** (Next.js).

---

## 1. Fundamentos da Pesquisa (Search Essentials)

Os **Fundamentos da Pesquisa Google** detalham o que é necessário para que seu conteúdo da Web apareça nos resultados orgânicos.

### Requisitos Técnicos Mínimos
Para ser indexado, um site precisa cumprir três critérios básicos:
*   **Acessibilidade ao Googlebot:** O robô do Google não deve ser impedido de acessar a página por regras restritivas no arquivo `robots.txt` ou cabeçalhos HTTP de bloqueio.
*   **Funcionamento Correto da Página:** A página precisa responder com um código de status HTTP `200 OK` (ou redirecionamentos válidos como `301`). Páginas de erro (5xx ou 4xx) não são mantidas no índice.
*   **Conteúdo Indexável:** O conteúdo deve ser em formato legível para o robô (HTML, texto, PDF, imagens ou vídeos) e estar disponível de forma pública, sem exigir logins ou paywalls.

### Políticas de Spam
Táticas que visam manipular os algoritmos podem levar a penalizações manuais ou automáticas, resultando em rebaixamento de posição ou remoção total. São proibidas práticas como:
*   *Cloaking* (exibir conteúdo diferente para o robô e para o usuário).
*   *Keyword Stuffing* (encher a página de palavras-chave sem contexto).
*   Texto ou links ocultos.
*   Páginas de baixa qualidade geradas em massa exclusivamente para mecanismos de busca (*doorways*).
*   Conteúdo hackeado ou que contenha malwares.

---

## 2. Rastreamento (Crawling) e Indexação

O fluxo de funcionamento do Google divide-se em descobrir URLs (rastreamento), analisar e catalogar (indexação).

### Robots.txt
*   **Função:** Arquivo que dita quais partes do site o robô **não** deve rastrear.
*   **Melhor Prática:** Não deve ser usado para tentar ocultar uma página dos resultados. Para isso, usa-se a metatag `noindex`. Serve primariamente para poupar recursos do servidor (*crawl budget*) bloqueando scripts pesados, painéis administrativos e rotas de API.

### Sitemaps
*   **Função:** Arquivo XML que fornece uma lista organizada das URLs do site, priorizando caminhos e informando datas de última modificação.
*   **Melhor Prática:** Essencial para sites grandes, novos ou dinâmicos. Em aplicações Next.js, é gerado dinamicamente a partir dos bancos de dados e deve ser apontado dentro do arquivo `robots.txt`.

### Canonização (`rel="canonical"`)
*   **Função:** Indica ao robô qual é a URL principal e oficial de um determinado conteúdo, unificando a autoridade de SEO.
*   **Melhor Prática:** Sempre utilize URLs canônicas absolutas (com protocolo e domínio completos) para evitar que parâmetros de busca (como `?utm_source`) criem duplicatas indesejadas.

### Renderização de JavaScript (JavaScript SEO)
*   Como o Googlebot processa o JavaScript em duas ondas (primeiro lê o HTML inicial e depois processa o JavaScript em uma fila de renderização), depender de renderização exclusivamente no lado do cliente (*Client-Side Rendering*) pode atrasar severamente a indexação.
*   **Melhor Prática:** Utilizar abordagens como **Server-Side Rendering (SSR)** ou **Static Site Generation (SSG)** para que o conteúdo textual e estrutural seja entregue de imediato no HTML.

---

## 3. Classificação (Ranking) e Qualidade

O Google usa múltiplos sistemas automatizados que classificam o conteúdo com base em utilidade e relevância.

### O Conceito E-E-A-T
O conteúdo é avaliado sob a ótica de quatro pilares de qualidade:
1.  **Experience (Experiência):** Demonstração de vivência prática e de primeira mão sobre o assunto abordado.
2.  **Expertise (Especialidade):** Demonstração de conhecimentos técnicos aprofundados e credenciais do autor.
3.  **Authoritativeness (Autoridade):** Reconhecimento do site e do autor no setor (citações externas, links de terceiros).
4.  **Trustworthiness (Confiança):** Segurança técnica (HTTPS), clareza sobre quem produz o conteúdo, correção de erros e dados factuais confiáveis.

### Core Web Vitals (Experiência da Página)
Fatores de velocidade e estabilidade visual são determinantes para a usabilidade e classificação:
*   **LCP (Largest Contentful Paint):** Tempo de renderização do maior elemento visual da tela (Ideal: **< 2.5s**).
*   **INP (Interaction to Next Paint):** Tempo de resposta a interações e cliques do usuário (Ideal: **< 200ms**).
*   **CLS (Cumulative Layout Shift):** Estabilidade visual, evitando elementos que se movem de lugar enquanto a página carrega (Ideal: **< 0.1**).

---

## 4. Aspecto da Pesquisa (Search Appearance)

O aspecto da pesquisa engloba os formatos e formas com que seu site é exibido nos resultados de busca (snippets enriquecidos, links de título, etc.).

### Dados Estruturados (Schema Markup)
*   Permitem que o Google entenda de forma semântica e sem margem de erro o que é o seu conteúdo (um post, um produto, uma organização).
*   **Recomendação:** O Google recomenda explicitamente o uso do formato **JSON-LD** inserido em blocos `<script type="application/ld+json">`.
*   **Elegibilidade:** A implementação correta habilita elementos visuais especiais nos resultados de pesquisa (como estrelas de avaliação, preços, carrosséis de artigos), aumentando consideravelmente a taxa de clique (CTR).

### Links de Título (Title Links) e Descrições (Snippets)
*   **Links de Título:** O título visível no resultado é determinado principalmente pela tag `<title>` da página, mas o Google pode reescrevê-lo se achar confuso, excessivamente longo ou repetitivo.
*   **Snippets:** O Google extrai a descrição da metatag `<meta name="description">` ou diretamente do conteúdo da página. A meta descrição deve resumir com precisão e atratividade o conteúdo, idealmente mantendo-se entre 140 e 160 caracteres.

---

## 5. Auditoria de SEO Aplicada ao FolhaByte

Abaixo está o mapeamento técnico das configurações encontradas no projeto:

### Pontos Fortes Encontrados ✅
1.  **Estrutura Multilíngue Limpa:** O [middleware.ts](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/middleware.ts) lida com a internacionalização (`en` e `es`) usando reescritas internas (`NextResponse.rewrite`), evitando pastas duplicadas e mantendo URLs limpas.
2.  **Sitemaps Multilíngues:** O [sitemap.ts](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/sitemap.ts) gera corretamente URLs em português, inglês e espanhol para todos os posts cadastrados no banco de dados Supabase.
3.  **Configuração de Metadados Absolutos:** A propriedade `metadataBase` está devidamente configurada com a URL base em [layout.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/layout.tsx#L22). Isso assegura que caminhos relativos de metadados como `/post/[slug]` sejam renderizados como links absolutos na tag `<link rel="canonical" href="...">`.
4.  **Marcação de Artigos com JSON-LD:** A página individual de posts [page.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/post/[slug]/page.tsx#L240-L266) gera dinamicamente dados estruturados no formato `NewsArticle` com dados do autor, imagens, editora e data de publicação.
5.  **Tag HTML Lang Dinâmica:** O [layout.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/layout.tsx#L61) define dinamicamente a propriedade `<html lang={htmlLang}>` de acordo com a tradução carregada.

### Oportunidades de Melhoria Técnica 💡

1.  **Dados Estruturados Globais (Página Inicial e Sobre):**
    Atualmente, os dados estruturados mais detalhados estão restritos às páginas de posts. Recomenda-se adicionar:
    *   Marcação `Organization` na página inicial.
    *   Marcação `AboutPage` ou `ContactPage` nas respectivas rotas de suporte.

2.  **Especificação Correta do `canonical` e `languages` nas Páginas:**
    Em [page.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/post/[slug]/page.tsx#L55-L62), a propriedade `canonical` está usando `/post/${slug}`. Como Next.js possui a `metadataBase` configurada, isso será resolvido automaticamente em URL absoluta. No entanto, é fundamental garantir que a reescrita do middleware não misture a indexação duplicada.
    No `sitemap.ts`, por exemplo, todas as variações de idioma (`pt`, `en`, `es`) estão expostas e apontadas, o que ajuda o Google a indexá-las simultaneamente.

3.  **Melhoria do Desempenho e Core Web Vitals:**
    *   **Fontes:** Em [layout.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/layout.tsx#L12), o uso do `next/font/google` com a propriedade `display: "swap"` assegura carregamento de fontes sem causar atrasos de renderização de blocos visuais de texto (bloqueio por FOUT/FOIT), ajudando a manter o CLS baixo.
    *   **Imagens de Artigo:** O componente `PostImage` utilizado em [page.tsx](file:///c:/Users/gusta/OneDrive/Documentos/Site-teste/portal/app/post/[slug]/page.tsx#L322) deve fazer uso do elemento `<Image>` do Next.js com as propriedades de `priority` na imagem de destaque (*Hero Image*) de forma a acelerar o tempo de **LCP**.

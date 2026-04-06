# 🤖 Funções e Ordem de Execução dos Agentes (Squad Redação Tech)

Este documento detalha o fluxo de trabalho dos agentes de IA para a criação, revisão e monetização automática de notícias no portal.

---

## 🚀 FASE 1: Squad de Conteúdo (Tech News Writer)
*Estes agentes rodam em sequência linear conforme definido no `pipeline.yaml`.*

| Ordem | Agente | Função Principal |
| :--- | :--- | :--- |
| **01** | **Teo (Tendência)** | Identifica as notícias mais "quentes" e virais do mundo tech nas últimas 24h. |
| **02** | **Beto (Busca)** | Realiza pesquisas profundas em fontes internacionais (The Verge, TechCrunch, Engadget). |
| **03** | **Fabio (Fatos)** | Valida os dados técnicos, especificações e evita alucinações de hardware. |
| **04** | **Caio (Concorrência)** | Analisa como outros portais estão cobrindo o tema para encontrar um ângulo único. |
| **05** | **Ivan (Ideia)** | Gera o conceito criativo e a estrutura narrativa da reportagem. |
| **06** | **Tina (Título)** | Cria 5 opções de títulos magnéticos (Click-Through Rate otimizado). |
| **07** | **Carlos (Copy)** | Escreve o rascunho completo da notícia em Markdown seguindo a voz da marca. |
| **08** | **Rebeca (Revisão)** | Ajusta o tom, gramática e garante a fluidez da leitura. |
| **09** | **Felipe (Foto)** | Define as metatags da imagem principal e busca sugestões visuais. |
| **10** | **Gabriel (Gerador)** | Gera prompts e metadados para as mídias sociais e imagens de IA. |
| **11** | **Edgar (Edição)** | Formata o Markdown final, adicionando negritos e listas para escaneabilidade. |
| **12** | **Lucas (Linkador)** | Injeta links internos para outras matérias do portal (Estratégia de SEO). |
| **13** | **Nico (Newsletter)** | Cria a versão compacta da notícia para o disparo matinal de e-mail. |
| **14** | **Eduardo (Editor-Chefe)** | Realiza a aprovação final e garante que a notícia cumpre os padrões editoriais. |
| **15** | **Pedro (Página)** | Executa a injeção via API no banco de dados e gera a URL pública do post. |

---

## 💰 FASE 2: Squad Comercial (Affiliate Monetizer)
*Gatilho automático disparado após a conclusão da Fase 1.*

| Agente / Motor | Função Principal |
| :--- | :--- |
| **Automatic Monetizer** | Escaneia o texto do Eduardo em busca de produtos (ex: iPhone, Meta Glasses). Se encontrar, busca o preço real no catálogo 2026, gera o link de afiliado e **injeta o widget de compra (`[DEAL:X]`)** diretamente no corpo da notícia. |

---

### 🛠️ Resumo Técnico
- **Tecnologia:** Node.js + Supabase (PostgreSQL).
- **Formatos:** Markdown (Conteúdo) + JSON (Metadados de Afiliados).
- **Objetivo:** Autonomia total da descoberta da notícia até a venda do produto.

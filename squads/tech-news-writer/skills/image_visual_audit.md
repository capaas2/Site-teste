# Skill: Image Visual Audit (Busca Contextual)
Esta skill ensina os agentes da Squad Redação Tech a buscar imagens reais e contextuais na internet via `web_search` para evitar erros visuais e placeholders genéricos.

## 📸 Protocolo de Busca de Mídia
Siga estas etapas para cada ponto de imagem no artigo:

### 1. Definição do Termo de Busca
- Identifique o contexto do parágrafo.
- Crie um termo de busca conciso em inglês e português.
- Exemplo: `iPhone fold design minimalist white studio desk Unsplash`.

### 2. Busca Real (web_search)
- Execute `search_web` para o termo acima.
- Procure por links diretos de imagens de bancos como **Unsplash**, **Pexels** ou **Pixabay**.
- **Atenção**: O link deve ser de alta resolução (mínimo 1200px de largura).

### 3. Formatação Obrigatória
Toda imagem deve ser inserida no Markdown usando o seguinte formato estrito:
`[IMAGEM: URL_DA_IMAGEM | LEGENDA: Descrição Elegante da Imagem]`

## 🎨 Regras de Design Editorial
- **Legendas (Captions):** Use **Sentence case** (apenas a primeira letra maiúscula). NUNCA utilize All Caps.
- **Contexto:** A imagem deve ilustrar o que foi dito no parágrafo imediatamente anterior.
- **Diversidade:** Varie os ângulos. Se a primeira foto é de um "gadget", a segunda pode ser de um "infográfico" ou "usuário interagindo".

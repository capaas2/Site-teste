# Passo: Edgar Edição (Validação Técnica) 🛠️

Neste passo, o agente **Edgar Edição** tem o dever sagrado de garantir que nenhuma notícia seja publicada com imagem "quebrada".

## ⚖️ LEI GERAL DE VERIFICAÇÃO (OBRIGATÓRIO):
1.  **Check de Status:** Antes de liberar o post, você deve validar se o link da imagem (imagem_url) está acessível publicamente (Status 200 OK).
2.  **Origem vs. Destino:** Nunca use links locais (ex: file:///) ou links externos que exijam login. Priorize links de CDNs oficiais ou do repositório público já "proporcionado" (pushed) para o GitHub.
3.  **Recorte de Precisão:** Garanta que a imagem mostre **apenas o carro/objeto**, sem menus de sites, banners ou barras de cookies.
4.  **Veredito:** Se o link não carregar no seu ambiente de teste, o pipeline **DEVE SER PARADO** até que Felipe Foto forneça um link válido.

# Passo 16 - Publicação Automática no Portal

## Objetivo Final do Esquadrão
Sua tarefa derradeira é pegar o pacote final gerado (Texto Revisado + Imagem do Editor) e conectá-lo DIRETAMENTE ao nosso Portal Público de Notícias (tema Azul). 

Não queremos mais que você simplesmente grave um .md localmente. Queremos que você **FAÇA O UPLOAD VIA API**.

## Como fazer

1. **Preparaçao da Matéria Final (Obrigatório Markdown Avançado Padrão Portal)**
A matéria deve possuir formatação atraente. Utilize cabeçalhos `##`, trechos em destaque via _blockquote_ `> ` e listas para reter a atenção do leitor, lembre-se que o portal está desenhado em Azul Tech. Certifique-se de que o design visual nativo do Markdown fique limpo e não tenha pontas soltas. Use os sub-tópicos aprovados!

2. **Criação do Payload JSON**
Nesta mesma estrutura de máquina, você deve reunir todo o pacote criando um arquivo JSON na pasta de output (por exemplo: `output/noticia-payload.json`).
O JSON **deve obrigatoriamente** seguir essa estrutura exata (todas as 5 chaves):

```json
{
  "titulo": "Manchete forte aprovada pelo Eduardo",
  "conteudo_markdown": "O texto revisado da matéria em Markdown...",
  "categoria": "IA", 
  "autor": "Squad Tech News",
  "imagem_base64": "data:image/png;base64,....."
}
```

- A "categoria" deve ser um dos itens do Menu (IA, Gadgets, Mercado, Cibersegurança, Ciência, etc).
- A imagem TEM que ser codificada em String Base64 completa (com o cabeçalho data:image/jpeg;base64 ou png) puxada da fotografia salva pelo **Felipe Foto / Edgar**.

3. **Disparo do POST no Terminal**
Finalmente, você **DEVE** executar o script de publicação que os desenvolvedores conectaram, rodando o seguinte comando no terminal (run_command):

```bash
node squads/tech-news-writer/scripts/publish.js output/noticia-payload.json
```

Se o script reportar que a resposta da API foi sucesso, O TRABALHO DO ESQUADRÃO ESTÁ FINALIZADO. Se o script falhar, corrija o payload/JSON e rode novamente até dar ✅!

# Inserção Estratégica de Link de Leitura ('Leia Mais')

Agente responsável: Lucas Linkador

Com o texto bruto em mãos, a sua função é reter nosso leitor no Portal da Redação Tech puxando matérias do acervo.

### PASSO 1: Buscar do Acervo
Rode imediatamente o utilitário nativo de banco de dados do seu ambiente usando o terminal:
```bash
node squads/tech-news-writer/scripts/get-related.js "CategoriaDaMateria"
```
Substitua "CategoriaDaMateria" pelo nome exato da categoria que Carlos ou a pauta está tratando (Ex: "IA", "Mercado", "Ciência", etc).

### PASSO 2: Incorporar a Recomendação no Texto
Leia o terminal depois do seu comando. 
Se o script retornar um "MARKDOWN SUGERIDO", injete esse mesmo código no meio do artigo recebido pelo redator, exatamente como um blockquote na pausa entre os blocos (após uns 3 parágrafos).

**Sintaxe rigorosamente esperada:**
```markdown
> LEIA MAIS: [Título Inteiro da Notícia](/post/id-recebido-no-terminal)
```

**ATENÇÃO:** Se o comando de terminal informar _"⚠️ Nenhuma matéria antiga foi encontrada"_, pule a incorporação e entregue o texto intacto para o próximo revisor. NÃO ALUCINE LINKS sob nenhuma circunstância.

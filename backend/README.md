# Backend - Estrutura de Lógica e Suporte

Este diretório contém a lógica de "lado do servidor", scripts de manutenção e definições de banco de dados que foram separados do projeto frontend para melhor organização e segurança.

## Estrutura

- **`database/`**: Contém arquivos SQL de migração e definições de esquema do Supabase.
- **`scripts/`**: Scripts Node.js para tarefas administrativas e testes.
    - `insert.js`: Publica uma matéria de exemplo manualmente.
    - `insert_mock.js`: Gera 10 matérias de teste para validar o layout.
    - `test-subscribe.js`: Testa a funcionalidade de Newsletter.

## Como Executar os Scripts

Os scripts estão configurados para ler as variáveis de ambiente do arquivo `portal/.env.local`. Certifique-se de que as dependências (`@supabase/supabase-js`, `dotenv`) estão instaladas (geralmente via `npm install` na pasta root ou portal).

Para rodar um script:
```bash
node backend/scripts/insert_mock.js
```

## Benefícios da Separação
1. **Clareza**: O portal (`portal/`) agora contém apenas o código da interface e rotas Next.js.
2. **Segurança**: Scripts que manipulam dados sensíveis ou realizam operações de "escrita" pesada estão isolados.
3. **Escalabilidade**: Facilita a transição para um servidor de backend independente no futuro, se necessário.

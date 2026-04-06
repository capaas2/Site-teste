# Skill: Squad Memory Management
Esta skill ensina os agentes da Squad Redação Tech a gerenciar o conhecimento coletivo através dos arquivos `_memory/memories.md` e `_memory/runs.md`.

## 🧠 Protocolo de Ativação
Todo agente DEVE seguir este fluxo no início e no fim de sua tarefa:

### 1. Início da Tarefa: Sincronização
- Leia o arquivo `_memory/memories.md`.
- Verifique as seções de **Estilo**, **Proibições** e **Técnico**.
- **Atenção Especial**: Se houver uma regra sobre design (ex: "Sem All Caps nas legendas"), ela SOBRESCREVE qualquer instrução padrão do seu arquivo de agente.

### 2. Durante a Tarefa: Contextualização
- Use as informações de `runs.md` para evitar repetir pautas ou abordagens de notícias publicadas nos últimos 2 dias.

### 3. Fim da Tarefa: Atualização
- Se você aprendeu algo novo sobre a preferência do usuário (ex: um erro que o usuário apontou), adicione uma linha curta e atômica na seção correspondente do `memories.md`.
- Registre o sucesso da sua etapa no `runs.md` (Data, Run ID, Tema, Seu Nome, Resultado).

## 📝 Regras de Escrita na Memória
- Seja **atômico**: Uma linha por aprendizado.
- Use a data: `[2026-04-05] Nova regra: Legendas minimalistas com hífen.`
- Não apague o histórico anterior, apenas acrescente no topo da seção.

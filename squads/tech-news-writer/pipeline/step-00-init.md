# ⚡ Step 0: Inicialização e Leitura de Contexto (OBRIGATÓRIO PARA TODOS)

> **Este é o passo zero implícito de qualquer agente do squad.**
> Antes de executar sua tarefa principal, QUALQUER agente da Redação Tech DEVE seguir este protocolo.
> ⚠️ **Nota:** Este step NÃO está declarado no `pipeline.yaml` — é um protocolo implícito que o runner injeta automaticamente via `squad.yaml` → `data:`. Os agentes devem seguir estas instruções por padrão.

---

## 📚 Leitura Obrigatória de Contexto (Executa SEMPRE)

Todo agente, antes de iniciar sua tarefa, deve ler e internalizar os seguintes documentos:

| Arquivo | Conteúdo | Quem DEVE ler |
|---------|----------|---------------|
| `pipeline/data/anti-patterns.md` | Proibições absolutas de conteúdo/formato | Carlos, Eduardo, Rebeca, Edgar |
| `pipeline/data/quality-criteria.md` | Checklist de aprovação de qualidade | Eduardo, Rebeca, Edgar |
| `pipeline/data/tone-of-voice.md` | Voz, vocabulário e tom do portal | Carlos, Tina, Nico |
| `pipeline/data/domain-framework.md` | Metodologia editorial | Teo, Beto, Ivan, Carlos |
| `pipeline/data/research-brief.md` | Contexto de jornalismo tech | Teo, Beto, Fábio |
| `pipeline/data/output-examples.md` | Exemplos de artigos aprovados | Carlos, Edgar |
| `_memory/memories.md` | Aprendizados e proibições acumuladas | Gabriel, Rebeca, Lucas |
| `_memory/runs.md` | Histórico de pautas — evitar repetição | Teo, Eduardo |

---

## 🧠 Protocolo de Memória Compartilhada

1. **Início:** Leia `_memory/memories.md` para verificar regras acumuladas que SOBRESCREVEM as instruções padrão.
2. **Durante:** Consulte `runs.md` para evitar pautas repetidas dos últimos 2 dias.
3. **Fim:** Registre o resultado da sua etapa em `runs.md` com: `[DATA] | [AGENTE] | [TEMA] | [STATUS]`.

---

## ⚠️ Regra de Sobrescrita

> Se houver conflito entre uma regra no `memories.md` e uma instrução no seu arquivo de agente, a regra do `memories.md` **sempre vence**.

---

## ✅ Checklist de Prontidão

Antes de começar, confirme:
- [ ] Li o(s) arquivo(s) de data relevante(s) para minha função
- [ ] Verifiquei `memories.md` por regras que me afetam
- [ ] Sei qual é o tema/pauta da rodada atual
- [ ] Sei o output que devo entregar ao próximo agente

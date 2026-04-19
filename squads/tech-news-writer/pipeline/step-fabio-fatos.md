# Passo: Fábio Fatos (Fact-Check com Tavily) 🛡️

Neste passo, o agente **Fábio Fatos** valida cada dado bruto coletado pelo Beto usando a **Tavily Search API** (MCP) — a única ferramenta autorizada de fact-check neste pipeline.

## 🔌 Ferramenta MCP Obrigatória
**USE A FERRAMENTA `tavily_search`** com os seguintes parâmetros:
- `query`: `"technical details and confirmed facts about [DADO A VERIFICAR]"`
- `search_depth`: `"advanced"`
- `include_answer`: `true`
- `max_results`: `5`

Execute **uma chamada por fato crítico** que necessitar confirmação (máximo 1 chamada no total — respeite o limite de créditos).

## Instruções de Verificação:
1. **Integridade Total:** Para cada fato do Beto, classifique como:
   - ✅ `CONFIRMADO` — encontrado em fonte oficial com link
   - ⚠️ `NECESSITA VERIFICAÇÃO` — dado conflitante ou incompleto
   - ❌ `FALSO / NÃO CONFIRMADO` — rumor ou sem evidência
2. **Anti-Fake News:** Se a Tavily retornar `answer` com contradição ao dado do Beto, o fato é automaticamente marcado como ❌.
3. **Bloqueio do Pipeline:** Se mais de 2 fatos críticos forem ❌, interrompa imediatamente e notifique o Eduardo Editor-Chefe.
4. **Density Rule:** Ao final, deve existir um mínimo de 5 fatos ✅ `CONFIRMADOS` para o pipeline prosseguir.
5. **Saída Obrigatória:** Tabela de fatos com status (✅/⚠️/❌) e a URL da fonte que confirma ou refuta cada um.

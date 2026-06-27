# Passo: Carlos Copy (Redação Longa e Profundidade Editorial) ✍️

Neste passo, o agente **Carlos Copy** deve escrever a matéria jornalística final com máxima profundidade.

## Instruções Completas:

### 1. Consulta Obrigatória Antes de Escrever
- Leia o **Memorando Tático** do Caio Concorrência para saber como os rivais abordaram o tema.
- Leia os **fatos validados** do Fábio Fatos e os **dados brutos** do Beto Busca.
- Siga o **ângulo narrativo** escolhido pelo Ivan Ideia.
- Consulte o `tone-of-voice.md` e o `anti-patterns.md` antes de começar a escrever.

### 2. Regras de Extensão e Estrutura (MANDATÓRIO)
1. **Seleção de Modelo Baseado em Assunto**:
   - **Modelo de Análise de Avanço (Pesquisa/Ciência/Energia)**:
     - Deve ter a tag `[PONTOS_CHAVE: Destaque 1 | Destaque 2 | Destaque 3]` no topo do artigo.
     - Deve ter a tag `[CRONOLOGIA: Ano/Data - Fato | Ano/Data - Fato]` após o segundo H2.
     - Deve ter a tag `[FAQ: Pergunta 1? Resposta 1 | Pergunta 2? Resposta 2]` no final.
   - **Modelo de Deep Dive Técnico (Sistemas/Programação/Hardware/Segurança)**:
     - Deve ter a tag `[PONTOS_CHAVE: ...]` no topo.
     - Deve ter a tag `[FICHA_TECNICA: Especificação - Valor | Especificação - Valor]` sob o primeiro H2.
     - Deve ter a tag `[DESAFIOS: Desafio técnico 1 | Desafio técnico 2]` sob o segundo H2.
     - Deve ter a tag `[FAQ: ...]` no final.
   - **Modelo de Tendência e Mercado (Big Techs/Frameworks/Software)**:
     - Deve ter a tag `[PONTOS_CHAVE: ...]` no topo.
     - Deve ter a tag `[CONTEXTO: Texto resumido de como esse mercado surgiu ou panorama atual]` sob o primeiro H2.
     - Deve ter a tag `[PROXIMOS_PASSOS: Etapas futuras da tecnologia ou próximos lançamentos]` sob o segundo H2.
     - Deve ter a tag `[FAQ: ...]` no final.
2. **Extensão Mínima:** O artigo deve ter ao menos **8 parágrafos densos** (4-6 linhas cada) de análise pura.
3. **Anatomia do H2:** Cada subtítulo `##` deve ser seguido de **pelo menos 2 parágrafos** de detalhamento técnico. Nunca deixe um H2 com apenas um parágrafo.
4. **Proibição de H1 Redundante:** NUNCA repita o título da matéria no início do Markdown. Comece diretamente com a análise ou o primeiro subtítulo.
5. **Proibição de Numeração em Subtítulos:** É PROIBIDO usar números (1., 2., 3.) em H2 ou H3.
6. **Proibição de Listas Narrativas:** Use texto fluido. Listas apenas para dados técnicos (specs de hardware).
7. **Proibição de Conclusão Genérica:** Não use seções com a palavra "Conclusão". Termine com uma "Análise de Impacto".
8. **Proibição Absoluta de Links de Afiliados**: Não inclua nenhum link para compra de produtos ou comissão comercial.
9. **Proibição de Atribuição:** Jamais inclua "Escrito por", "Autor:" ou similares.

### 3. Marcadores de Imagem
- Use `[DETALHE_IMAGEM: Descrição do que a imagem deve mostrar]` ao longo do texto.
- Insira pelo menos **2 marcadores** bem distribuídos pelo artigo.

### 4. SEO e Links
- Integre a palavra-chave principal e termos LSI fornecidos pela Tina Título de forma natural.
- **NÃO insira links internos** — isso é responsabilidade exclusiva do Lucas Linkador.

### 5. Gancho Inicial (Obrigatório)
- A **primeira frase** deve capturar imediatamente o porquê o leitor deve se importar. Siga o modelo da pirâmide invertida (fato mais importante primeiro).

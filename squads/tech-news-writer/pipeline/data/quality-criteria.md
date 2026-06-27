# 🏁 Critérios de Qualidade — Checklist Final

> Checklist obrigatório antes de aprovar qualquer matéria para publicação.
> Referência: `regras_folhabyte/checklist_final.md` (Kronos).

## 📝 Estrutura
- [ ] **H1 Único:** Não há título repetido no corpo do texto?
- [ ] **Hierarquia:** H1 → H2 → H3 sem pular níveis?
- [ ] **Sem Numeração:** Nenhum H2/H3 começa com "1.", "2.", etc.?
- [ ] **Extensão Mínima:** Pelo menos 8 parágrafos densos (4-6 linhas cada)?
- [ ] **Anatomia H2:** Cada H2 tem pelo menos 2 parágrafos de detalhamento?
- [ ] **Sem Conclusão Genérica:** Última seção é "Análise de Impacto" (não "Conclusão")?
- [ ] **Gancho Inicial:** Primeira frase captura a atenção imediatamente?

## 📸 Imagens
- [ ] **Acessibilidade:** Todas as URLs de imagem retornam `✅ [VALID]` no `validate-image.js`?
- [ ] **Ineditismo:** A imagem é nova e não foi usada nos últimos 20 posts? (rodar `check_image_uniqueness.js <URL>`)
- [ ] **Contextualização:** A imagem reflete o tema real da notícia (sem circuitos genéricos)?
- [ ] **Formato:** Legendas em Sentence case com marcador `—`?
- [ ] **Não-Repetição:** A imagem de capa NÃO aparece dentro do corpo do texto?
- [ ] **Mínimo:** Pelo menos 2 marcadores de imagem distribuídos no artigo?

## 🔗 Links
- [ ] **UUIDs Válidos:** Todos os links "VEJA TAMBÉM" usam IDs que existem no banco?
- [ ] **Posição:** O bloco "VEJA TAMBÉM" está entre o 2º e 4º parágrafo?
- [ ] **Sem Slugs:** Nenhum link usa `/post/nome-bonito` (apenas UUID)?

## 🎙️ Tom
- [ ] **Anti-IA:** Nenhuma frase soa como "gerada por IA" (clichês, saudações genéricas)?
- [ ] **Sem Atribuição:** Nenhuma linha "Escrito por" ou "Autor:"?
- [ ] **Sem Emojis nos Títulos:** Nenhum emoji em H1 ou H2?

## 🏆 E-E-A-T (Google AdSense Compliance)
- [ ] **Autor Atribuído:** O artigo tem um dos 3 autores definidos no frontmatter (Rafael, Camila ou Bruno)? (Nota: nunca inclua no corpo do texto para não quebrar a regra de atribuição manual).
- [ ] **Voz do Autor:** O texto soa como o autor atribuído ou é genérico?
- [ ] **Posicionamento Editorial:** Existe pelo menos 1 parágrafo com a opinião/análise da FolhaByte?
- [ ] **Ângulo Diferenciado:** O artigo cobre algo que os concorrentes não cobriram?

## 📱 SEO e Mobile
- [ ] **Meta Keywords:** Palavra-chave principal e termos LSI integrados naturalmente?
- [ ] **Escaneabilidade:** Texto legível em tela de celular (parágrafos não muito longos)?
- [ ] **Categoria Válida:** Uma das: IA, Gadgets, Mercado, Cibersegurança, Ciência, Mobilidade, Sustentabilidade?


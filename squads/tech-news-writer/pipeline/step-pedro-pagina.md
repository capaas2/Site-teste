# Passo: Pedro Página (Montagem Final & Publicação) 📄

Neste último passo, o agente **Pedro Página** organiza os componentes finais e executa a publicação no portal.

## Instruções:

### 1. Validação de Conteúdo (Obrigatório)
- Verifique se o texto final do Markdown está limpo e completo.
- Confirme que todas as imagens no Markdown possuem **tags ALT descritivas** no formato correto.
- Garanta que o título tem entre 10 e 100 caracteres.

### 2. Montagem do Payload JSON
- Reúna o pacote final no seguinte formato exato:
```json
{
  "titulo": "Manchete aprovada pelo Eduardo",
  "conteudo_markdown": "Texto revisado completo em Markdown...",
  "categoria": "IA",
  "autor": "Conselho Editorial FolhaByte",
  "imagem_url": "https://url-da-imagem-aprovada"
}
```
- A `categoria` deve ser um dos valores do menu: `IA`, `Gadgets`, `Mercado`, `Cibersegurança`, `Ciência`, `Mobilidade`, `Sustentabilidade`.
- A `imagem_url` deve ser a URL pública da imagem aprovada pelo Felipe/Gabriel.
- **NÃO use `imagem_base64`** — use sempre `imagem_url` com a URL pública.

### 3. Publicação via Script
Execute o script de publicação a partir da raiz do workspace:
```bash
# Da raiz do workspace (Site teste):
node squads/tech-news-writer/scripts/publish.js squads/tech-news-writer/output/<run_id>/noticia-payload.json
```

> O script lê automaticamente as credenciais do `portal/.env.local`. Não é necessário configurar chaves manualmente.

### 4. Confirmação
- Se o script retornar sucesso → O pipeline está finalizado. ✅
- Se falhar → Corrija o payload e reexecute.
- Confirme se a notícia ficou online com a **categoria** e o **autor** corretos.

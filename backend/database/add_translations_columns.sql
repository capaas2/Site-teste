-- 1. Adicionar colunas de tradução para a tabela posts (Multi-idiomas)
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS titulo_en text;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS conteudo_markdown_en text;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS titulo_es text;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS conteudo_markdown_es text;

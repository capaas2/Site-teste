-- migrations para o Portal de Notícias (Opensquad)

-- 1. Tabela: posts (Matérias principais do Portal)
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  conteudo_markdown text NOT NULL,
  categoria text NOT NULL,
  autor text NOT NULL,
  imagem_url text,
  publicado_em timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela: failed_imports (Cofre de Segurança / Erros da IA)
CREATE TABLE IF NOT EXISTS public.failed_imports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  raw_payload jsonb NOT NULL,
  error_reason text NOT NULL,
  data_tentativa timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configurando proteção padrão (Segurança RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.failed_imports ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura e Escrita
CREATE POLICY "Permitir leitura pública de posts" ON public.posts
  FOR SELECT TO public USING (true);

CREATE POLICY "Permitir inserção via anon_key posts" ON public.posts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir inserção de erros anon_key" ON public.failed_imports
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir leitura via anon_key failed_imports" ON public.failed_imports
  FOR SELECT TO anon USING (true);

CREATE POLICY "Permitir deletar erros via anon_key" ON public.failed_imports
  FOR DELETE TO anon USING (true);

-- 3. Bucket de Storage para Imagens
-- Execute no painel do Supabase: Storage → New Bucket → Name: capas_noticias → Public: ON
-- Ou via SQL (requer extensão pg_storage habilitada):
-- SELECT storage.create_bucket('capas_noticias', '{"public": true}');

-- Se preferir criar via SQL direto, use:
INSERT INTO storage.buckets (id, name, public)
VALUES ('capas_noticias', 'capas_noticias', true)
ON CONFLICT (id) DO NOTHING;

-- Política de upload anônimo no Storage
CREATE POLICY "Permitir upload anon capas" ON storage.objects
  FOR INSERT TO anon WITH CHECK (bucket_id = 'capas_noticias');

CREATE POLICY "Permitir leitura pública capas" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'capas_noticias');

-- (Opcional) Se a tabela posts já existia sem a coluna imagem_url, adicione-a:
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS imagem_url text;


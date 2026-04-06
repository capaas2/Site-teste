-- 1. Criar ou Garantir existência da tabela subscribers
CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Adicionar Colunas de Segurança (Double Opt-in)
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS confirmed boolean DEFAULT false;
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS confirmation_token uuid DEFAULT gen_random_uuid();

-- 3. Marcar usuários existentes como "Confirmados" 
-- (Migration para não perder inscritos antigos)
UPDATE public.subscribers SET confirmed = true WHERE confirmed IS NULL OR confirmed = false;

-- 4. Habilitar RLS (Segurança de Linha)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acesso
DROP POLICY IF EXISTS "Permitir inserção anônima" ON public.subscribers;
DROP POLICY IF EXISTS "Leitura apenas para admin" ON public.subscribers;

-- Permitir qualquer um se inscrever (inserir com status confirmed=false)
CREATE POLICY "Permitir inserção anônima"
ON public.subscribers
FOR INSERT
TO anon
WITH CHECK (confirmed = false);

-- Apenas o servidor (Admin Role) pode ler ou confirmar e-mails
-- (Configuração padrão: access denial para anon/auth)

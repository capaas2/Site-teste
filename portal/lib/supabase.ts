import { createClient } from "@supabase/supabase-js";

// CLIENTE PÚBLICO (Frontend/Browser)
// Usa ANON_KEY - Seguro para o navegador
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * CLIENTE ADMINISTRATIVO (Backend/Server)
 * Usa SERVICE_ROLE_KEY - NUNCA EXPOR NO NAVEGADOR
 * Use apenas em Server Components, Route Handlers ou Server Actions.
 */
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada no servidor.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

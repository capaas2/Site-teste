import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/newsletter/error?reason=missing_token", request.url));
  }

  try {
    // 1. Verificar se o token existe e confirmar usuário
    const { data, error } = await supabase
      .from("subscribers")
      .update({ confirmed: true })
      .eq("confirmation_token", token)
      .select();

    if (error || !data || data.length === 0) {
      console.error("Erro ao confirmar e-mail:", error?.message || "Token inválido.");
      return NextResponse.redirect(new URL("/newsletter/error?reason=invalid_token", request.url));
    }

    // 2. Redirecionar para página de sucesso
    return NextResponse.redirect(new URL("/newsletter/success", request.url));
  } catch (err) {
    console.error("Erro fatal na confirmação:", err);
    return NextResponse.redirect(new URL("/newsletter/error", request.url));
  }
}

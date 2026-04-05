import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validação básica
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    // Inserção no Supabase
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }])
      .select();

    if (error) {
      console.error("Erro do Supabase na inscrição:", error);
      // Caso já exista o e-mail, Supabase retorna erro de unicidade (code: 23505)
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Você já está inscrito!" },
          { status: 200 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!", data },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Erro fatal na inscrição:", err);
    return NextResponse.json(
      { 
        error: "Erro de execução.", 
        details: err.message || "Erro desconhecido",
        supabaseError: err.status || "N/A"
      },
      { status: 500 }
    );
  }
}

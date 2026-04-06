import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { Resend } from "resend";
import { subscribeSchema } from "@/lib/schemas/newsletter";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validação Zod (Camada 4)
    const result = subscribeSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const token = crypto.randomUUID();

    // 2. Cliente Administrativo (Ignora RLS com segurança no servidor)
    const adminClient = createAdminClient();

    // 3. Inserção no Supabase
    const { data, error } = await adminClient
      .from("subscribers")
      .insert([{ 
        email, 
        confirmed: false, 
        confirmation_token: token 
      }])
      .select();

    if (error) {
      if (error.code === "23505") {
        // Privacidade: Retornamos o mesmo sucesso para não revelar que o e-mail já existe
        return NextResponse.json(
          { message: "Quase pronto! Enviamos um link de confirmação para o seu e-mail." },
          { status: 201 }
        );
      }
      throw error;
    }

    // 4. Enviar E-mail de Confirmação (Double Opt-in)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://site-teste-ne4f.vercel.app";
    const confirmLink = `${baseUrl}/api/newsletter/confirm?token=${token}`;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Redação Tech <onboarding@resend.dev>",
      to: [email],
      subject: "Falta pouco! Confirme sua inscrição na Redação Tech 🗞️",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #1e293b;">
          <h2 style="color: #0f172a;">Quase lá!</h2>
          <p>Obrigado por se interessar pela <b>Redação Tech</b>. Para começar a receber nossos resumos diários e alertas de última hora, precisamos que você confirme seu e-mail.</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${confirmLink}" 
               style="background: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
               CONFIRMAR MINHA INSCRIÇÃO
            </a>
          </div>
          <p style="font-size: 14px; color: #64748b;">Se você não solicitou esta inscrição, pode ignorar este e-mail com segurança.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">Redação Tech - O seu portal de notícias de alta performance.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Erro do Resend:", emailError);
      throw new Error(`Falha no envio do e-mail: ${emailError.message}`);
    }

    return NextResponse.json(
      { message: "Quase pronto! Enviamos um link de confirmação para o seu e-mail." },
      { status: 201 }
    );
  } catch (err: any) {
    // Privacidade e Segurança: Nunca retornamos detalhes do erro para o cliente
    console.error("Newsletter Subscribe Error (Rastreio):", Date.now()); 
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua inscrição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

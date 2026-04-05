import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Verificação de segurança para o Cron
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    // 1. Buscar inscritos
    const { data: subscribers, error: subError } = await supabase
      .from("subscribers")
      .select("email");

    if (subError || !subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "Nenhum inscrito para enviar." });
    }

    const emails = subscribers.map((s) => s.email);

    // 2. Tentar encontrar uma NOTÍCIA NOVA (last_sent_at is null)
    const { data: newPost, error: postError } = await supabase
      .from("posts")
      .select("*")
      .is("last_sent_at", null)
      .order("publicado_em", { ascending: false })
      .limit(1)
      .single();

    if (!postError && newPost) {
      // ENVIAR NOTÍCIA NOVA
      await resend.emails.send({
        from: "Redação Tech <onboarding@resend.dev>",
        to: emails,
        subject: `🚨 NOVO: ${newPost.titulo}`,
        html: renderEmailTemplate(newPost, "NOVA_NOTICIA"),
      });

      // Atualizar last_sent_at
      await supabase.from("posts").update({ last_sent_at: new Date().toISOString() }).eq("id", newPost.id);

      // Logar o envio
      await supabase.from("newsletter_logs").insert([{ type: "NEW_POST", post_id: newPost.id }]);

      return NextResponse.json({ message: "Notícia nova enviada com sucesso!" });
    }

    // 3. Se não houver nova, verificar se já enviamos um RECAPITULADO hoje
    const today = new Date().toISOString().split("T")[0];
    const { data: lastRecap } = await supabase
      .from("newsletter_logs")
      .select("*")
      .eq("type", "RECAP")
      .gte("sent_at", `${today}T00:00:00Z`)
      .limit(1);

    if (lastRecap && lastRecap.length > 0) {
      return NextResponse.json({ message: "Resumo de hoje já foi enviado. Aguardando produção de novas notícias." });
    }

    // 4. ENVIAR RECAPITULADO (Resumo do que você perdeu)
    const { data: recentPosts } = await supabase
      .from("posts")
      .select("*")
      .order("publicado_em", { ascending: false })
      .limit(3);

    if (recentPosts && recentPosts.length > 0) {
      await resend.emails.send({
        from: "Redação Tech <onboarding@resend.dev>",
        to: emails,
        subject: `🗞️ Resumo: O que você perdeu nas últimas horas`,
        html: renderRecapTemplate(recentPosts),
      });

      // Logar o recap
      await supabase.from("newsletter_logs").insert([{ type: "RECAP" }]);

      return NextResponse.json({ message: "Resumo diário enviado com sucesso!" });
    }

    return NextResponse.json({ message: "Nada para enviar no momento." });

  } catch (err: any) {
    console.error("Erro no despacho da newsletter:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Templates Helper
function renderEmailTemplate(post: any, type: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #334155;">
      <h1 style="color: #0f172a;">${post.titulo}</h1>
      <img src="${post.imagem_url}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;" />
      <div style="font-size: 16px; line-height: 1.6;">
        ${post.conteudo_markdown.slice(0, 500)}...
      </div>
      <a href="https://site-teste-gustavo.vercel.app/post/${post.id}" 
         style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
         LER MATÉRIA COMPLETA
      </a>
      <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Você recebeu este e-mail porque se inscreveu na Redação Tech.</p>
    </div>
  `;
}

function renderRecapTemplate(posts: any[]) {
  const postsHtml = posts.map(p => `
    <li style="margin-bottom: 15px;">
      <a href="https://site-teste-gustavo.vercel.app/post/${p.id}" style="color: #2563eb; font-weight: bold; font-size: 16px;">
        ${p.titulo}
      </a>
      <p style="margin: 5px 0; font-size: 14px; color: #64748b;">${p.categoria}</p>
    </li>
  `).join("");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #334155;">
      <h1 style="color: #0f172a;">🗞️ Resumo: O que você perdeu</h1>
      <p>A produção não para na Redação Tech. Aqui estão os destaques das últimas horas:</p>
      <ul style="list-style: none; padding: 0;">
        ${postsHtml}
      </ul>
      <a href="https://site-teste-gustavo.vercel.app" 
         style="display: inline-block; background: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
         ACESSAR PORTAL
      </a>
      <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Este é o seu resumo diário. Fique por dentro!</p>
    </div>
  `;
}

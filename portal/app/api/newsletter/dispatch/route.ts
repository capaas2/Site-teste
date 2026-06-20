import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { Resend } from "resend";
import { slugify } from "@/lib/slugify";
import { Post } from "@/types/post";

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
    // 1. Usar Admin Client para ler e despachar (bypassa RLS)
    const adminClient = createAdminClient();

    // Buscar inscritos CONFIRMADOS (Double Opt-in)
    const { data: subscribers, error: subError } = await adminClient
      .from("subscribers")
      .select("email")
      .eq("confirmed", true);

    if (subError || !subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "Nenhum inscrito confirmado para enviar." });
    }

    const emails = subscribers.map((s) => s.email);

    // 2. Tentar encontrar uma NOTÍCIA NOVA (last_sent_at is null)
    const { data: newPost, error: postError } = await adminClient
      .from("posts")
      .select("*")
      .is("last_sent_at", null)
      .order("publicado_em", { ascending: false })
      .limit(1)
      .single();

    if (!postError && newPost) {
      // ENVIAR NOTÍCIA NOVA
      await resend.emails.send({
        from: "FolhaByte <onboarding@resend.dev>",
        to: emails,
        subject: `🚨 NOVO: ${newPost.titulo}`,
        html: renderEmailTemplate(newPost as Post),
      });

      // Atualizar last_sent_at
      await adminClient.from("posts").update({ last_sent_at: new Date().toISOString() }).eq("id", newPost.id);

      // Logar o envio
      await adminClient.from("newsletter_logs").insert([{ type: "NEW_POST", post_id: newPost.id }]);

      return NextResponse.json({ message: "Notícia nova enviada com sucesso!" });
    }

    // 3. Se não houver nova, verificar se já enviamos um RECAPITULADO hoje
    const today = new Date().toISOString().split("T")[0];
    const { data: lastRecap } = await adminClient
      .from("newsletter_logs")
      .select("*")
      .eq("type", "RECAP")
      .gte("sent_at", `${today}T00:00:00Z`)
      .limit(1);

    if (lastRecap && lastRecap.length > 0) {
      return NextResponse.json({ message: "Resumo de hoje já foi enviado. Aguardando produção de novas notícias." });
    }

    // 4. ENVIAR RECAPITULADO (Resumo do que você perdeu)
    const { data: recentPosts } = await adminClient
      .from("posts")
      .select("*")
      .order("publicado_em", { ascending: false })
      .limit(3);

    if (recentPosts && recentPosts.length > 0) {
      await resend.emails.send({
        from: "FolhaByte <onboarding@resend.dev>",
        to: emails,
        subject: `🗞️ Resumo: O que você perdeu nas últimas horas`,
        html: renderRecapTemplate(recentPosts as Post[]),
      });

      // Logar o recap
      await adminClient.from("newsletter_logs").insert([{ type: "RECAP" }]);

      return NextResponse.json({ message: "Resumo diário enviado com sucesso!" });
    }

    return NextResponse.json({ message: "Nada para enviar no momento." });

  } catch {
    // Privacidade: Não exibimos o e-mail ou dados sensíveis em caso de erro fatal
    console.error("Erro no despacho da newsletter (Rastreio):", Date.now());
    return NextResponse.json({ error: "Erro interno no processamento do despacho." }, { status: 500 });
  }
}

// Helper para limpar a sintaxe de Markdown e extrair um resumo limpo para o e-mail
function cleanMarkdownExcerpt(markdown: string, limit: number = 400): string {
  if (!markdown) return "";

  // 1. Remover o título principal (# Título) no início
  let clean = markdown.replace(/^# .*\n/g, "");

  // 2. Remover outras linhas de cabeçalho completas (##, ###)
  clean = clean.replace(/^#+ .*\n/gm, "");

  // 3. Remover tags customizadas de imagens [IMAGEM: ...]
  clean = clean.replace(/\[(?:IMAGEM|IMAGE|IMAGEN|DETALHE_IMAGEM|IMAGE_DETAIL|DETALLE_IMAGEN|DETALLE DE IMAGEN|INFO_GRAFICO|INFOGRAPHIC|INFOGRAFÍA|INFOGRAFIA|INFO GRAPHIC)[^\]]*\]/gi, "");

  // 4. Remover blocos de "VEJA TAMBÉM:"
  clean = clean.replace(/>\s*VEJA TAMBÉM:[^\n]*\n?/gi, "");

  // 5. Remover links markdown [Texto](URL) mantendo apenas o texto
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // 6. Remover formatação de negrito, itálico e outros caracteres do markdown
  clean = clean.replace(/[*_`~>]/g, "");

  // 7. Substituir múltiplas quebras de linha e espaços por um único espaço
  clean = clean.replace(/\s+/g, " ").trim();

  // 8. Cortar no limite de caracteres de forma limpa (cortando em espaço se possível)
  if (clean.length <= limit) return clean;
  
  const excerpt = clean.slice(0, limit);
  const lastSpace = excerpt.lastIndexOf(" ");
  if (lastSpace > 0) {
    return excerpt.slice(0, lastSpace) + "...";
  }
  return excerpt + "...";
}

// Templates Helper
function renderEmailTemplate(post: Post) {
  const cleanExcerpt = cleanMarkdownExcerpt(post.conteudo_markdown, 400);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #334155;">
      <h1 style="color: #0f172a;">${post.titulo}</h1>
      <img src="${post.imagem_url || ''}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;" />
      <div style="font-size: 16px; line-height: 1.6;">
        ${cleanExcerpt}
      </div>
      <a href="https://site-teste-ne4f.vercel.app/post/${slugify(post.titulo)}" 
         style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
         LER MATÉRIA COMPLETA
      </a>
      <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Você recebeu este e-mail porque se inscreveu na FolhaByte.</p>
    </div>
  `;
}

function renderRecapTemplate(posts: Post[]) {
  const postsHtml = posts.map(p => `
    <li style="margin-bottom: 15px;">
      <a href="https://site-teste-ne4f.vercel.app/post/${slugify(p.titulo)}" style="color: #2563eb; font-weight: bold; font-size: 16px;">
        ${p.titulo}
      </a>
      <p style="margin: 5px 0; font-size: 14px; color: #64748b;">${p.categoria}</p>
    </li>
  `).join("");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #334155;">
      <h1 style="color: #0f172a;">🗞️ Resumo: O que você perdeu</h1>
      <p>A produção não para na FolhaByte. Aqui estão os destaques das últimas horas:</p>
      <ul style="list-style: none; padding: 0;">
        ${postsHtml}
      </ul>
      <a href="https://site-teste-ne4f.vercel.app" 
         style="display: inline-block; background: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
         ACESSAR PORTAL
      </a>
      <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Este é o seu resumo diário. Fique por dentro!</p>
    </div>
  `;
}

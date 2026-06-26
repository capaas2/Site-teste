const { Resend } = require("resend");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Carregar .env.local
const envPath = path.resolve(__dirname, "../.env.local");
const envFile = fs.readFileSync(envPath, "utf8");
const env = Object.fromEntries(
  envFile.split("\n")
    .filter(line => line.includes("="))
    .map(line => line.split("=").map(s => s.trim()))
);

const resendKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!resendKey) {
  console.error("Erro: RESEND_API_KEY não configurada.");
  process.exit(1);
}

const resend = new Resend(resendKey);
const supabase = createClient(supabaseUrl, supabaseKey);

function cleanMarkdownExcerpt(markdown, limit = 400) {
  if (!markdown) return "";
  let clean = markdown.replace(/^# .*\n/g, "");
  clean = clean.replace(/^#+ .*\n/gm, "");
  clean = clean.replace(/\[(?:IMAGEM|IMAGE|IMAGEN|DETALHE_IMAGEM|IMAGE_DETAIL|DETALLE_IMAGEN|DETALLE DE IMAGEN|INFO_GRAFICO|INFOGRAPHIC|INFOGRAFÍA|INFOGRAFIA|INFO GRAPHIC)[^\]]*\]/gi, "");
  clean = clean.replace(/>\s*VEJA TAMBÉM:[^\n]*\n?/gi, "");
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  clean = clean.replace(/[*_`~>]/g, "");
  clean = clean.replace(/\s+/g, " ").trim();

  if (clean.length <= limit) return clean;
  const excerpt = clean.slice(0, limit);
  const lastSpace = excerpt.lastIndexOf(" ");
  if (lastSpace > 0) {
    return excerpt.slice(0, lastSpace) + "...";
  }
  return excerpt + "...";
}

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function sendTestEmail() {
  console.log("Buscando o último post publicado para teste...");
  
  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("*")
    .order("publicado_em", { ascending: false })
    .limit(1);

  if (postError || !posts || posts.length === 0) {
    console.error("Nenhum post encontrado para enviar:", postError);
    return;
  }

  const post = posts[0];
  const cleanExcerpt = cleanMarkdownExcerpt(post.conteudo_markdown, 400);
  const baseUrl = env.NEXT_PUBLIC_SITE_URL || "https://folhabyte.dev";

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #334155;">
      <h1 style="color: #0f172a;">${post.titulo}</h1>
      <img src="${post.imagem_url || ''}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;" />
      <div style="font-size: 16px; line-height: 1.6;">
        ${cleanExcerpt}
      </div>
      <a href="${baseUrl}/post/${slugify(post.titulo)}" 
         style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
         LER MATÉRIA COMPLETA
      </a>
      <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8;">Você recebeu este e-mail de teste da FolhaByte.</p>
    </div>
  `;

  // Defina o e-mail de destino do teste.
  // Como a conta do Resend em desenvolvimento envia apenas para o e-mail de onboarding do proprietário da conta,
  // ou e-mails autorizados, vamos disparar para um e-mail. Se for onboarding@resend.dev,
  // normalmente ele vai direto para o e-mail cadastrado na conta do Resend do criador da chave.
  const targetEmail = "gustavocapaz06@gmail.com"; 

  console.log(`Disparando envio de teste do post "${post.titulo}" para ${targetEmail}...`);

  const { data, error } = await resend.emails.send({
    from: "FolhaByte <onboarding@resend.dev>",
    to: [targetEmail],
    subject: `🧪 TESTE DE NEWSLETTER: ${post.titulo}`,
    html: html
  });

  if (error) {
    console.error("❌ Erro ao enviar e-mail de teste:", error);
  } else {
    console.log("✅ E-mail de teste disparado com sucesso! ID:", data.id);
  }
}

sendTestEmail();

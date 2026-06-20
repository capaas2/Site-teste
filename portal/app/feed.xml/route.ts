import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://folhabyte.dev";

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, titulo, publicado_em, categoria, autor, conteudo_markdown, imagem_url")
    .order("publicado_em", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Erro ao buscar posts para o feed RSS:", error.message);
    return new Response("<error>Erro ao carregar o feed</error>", {
      status: 500,
      headers: { "Content-Type": "application/xml" },
    });
  }

  const itemsXml = (posts || [])
    .map((post) => {
      const slug = slugify(post.titulo);
      const postUrl = `${baseUrl}/post/${slug}`;
      const publishedDate = new Date(post.publicado_em).toUTCString();
      
      // Limpa sintaxe de markdown para a descrição plana do RSS
      const cleanDescription = post.conteudo_markdown
        .replace(/[#*\[\]()_`>]/g, "")
        .substring(0, 300)
        .trim() + "...";

      return `
    <item>
      <title><![CDATA[${post.titulo}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${publishedDate}</pubDate>
      <author><![CDATA[${post.autor || "Redação FolhaByte"}]]></author>
      <category><![CDATA[${post.categoria}]]></category>
      <description><![CDATA[${cleanDescription}]]></description>
      ${
        post.imagem_url
          ? `<enclosure url="${post.imagem_url}" length="0" type="image/jpeg" />`
          : ""
      }
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FolhaByte — Tecnologia de Alta Performance</title>
    <link>${baseUrl}</link>
    <description>As melhores notícias de tecnologia, IA, gadgets e mercado digital.</description>
    <language>pt-BR</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}

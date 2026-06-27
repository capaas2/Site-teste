import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { ViewCounter } from "@/components/ViewCounter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryStream } from "@/components/StoryStream";
import PostImage from "@/components/PostImage";
import { Newspaper } from "lucide-react";
import { formatPostDate, formatPostTime } from "@/lib/date-utils";
import { slugify } from "@/lib/slugify";
import { headers } from "next/headers";
import { translatePosts } from "@/lib/posts";
import { getTranslation } from "@/lib/translations";

import { PostLayoutMagazine } from "@/components/PostLayoutMagazine";
import { PostLayoutAnalysis } from "@/components/PostLayoutAnalysis";
import { PostLayoutQuickNews } from "@/components/PostLayoutQuickNews";

export const revalidate = 120;

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";

// Categories that trigger each layout
const ANALYSIS_CATEGORIES = ["ciência", "ciencia", "biotecnologia", "nanotecnologia", "saúde", "saude", "pesquisa", "energia"];
const QUICKNEWS_CATEGORIES = ["mercado", "lançamento", "lancamento", "gadgets", "reviews", "review", "produto", "produtos"];

function getLayoutType(categoria: string): "magazine" | "analysis" | "quicknews" {
  const cats = categoria.toLowerCase().split(',').map(c => c.trim());
  
  if (cats.some(c => ANALYSIS_CATEGORIES.includes(c))) return "analysis";
  if (cats.some(c => QUICKNEWS_CATEGORIES.includes(c))) return "quicknews";
  return "magazine";
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const postRaw = await getPost(slug);

  if (!postRaw) {
    return {
      title: 'Post não encontrado | FolhaByte',
    };
  }

  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const [post] = translatePosts([postRaw], locale);

  const plainTextDescription = post.conteudo_markdown
    .replace(/[#*\[\]()_`>]/g, "")
    .substring(0, 150)
    .trim() + "...";

  return {
    title: `${post.titulo} | FolhaByte`,
    description: plainTextDescription,
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      title: post.titulo,
      description: plainTextDescription,
      url: `/post/${slug}`,
      images: [post.imagem_url || PLACEHOLDER],
      type: "article",
      publishedTime: post.publicado_em,
      authors: [post.autor || "Redação FolhaByte"]
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: plainTextDescription,
      images: [post.imagem_url || PLACEHOLDER],
    }
  };
}


async function getPost(slugOrId: string): Promise<Post | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
  
  if (isUuid) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", slugOrId)
      .single();
    if (error || !data) return null;
    return data as Post;
  }

  const { data: allPosts, error: listError } = await supabase
    .from("posts")
    .select("id, titulo");

  if (listError || !allPosts) return null;

  const matched = allPosts.find((p) => slugify(p.titulo) === slugOrId);
  if (!matched) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", matched.id)
    .single();

  if (error || !data) return null;
  return data as Post;
}

async function getSidebarPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, categoria, publicado_em, imagem_url, autor, views")
    .order("views", { ascending: false })
    .limit(5);

  return (data as Post[]) || [];
}

async function getLatestPlantao(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, publicado_em, categoria, imagem_url")
    .order("publicado_em", { ascending: false })
    .limit(10);
  return (data as Post[]) || [];
}

async function getRelatedPosts(category: string, currentId: string): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, categoria, publicado_em, imagem_url, views")
    .ilike("categoria", `%${category.trim()}%`)
    .neq("id", currentId)
    .order("publicado_em", { ascending: false })
    .limit(3);
  return (data as Post[]) || [];
}


export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [postRaw, sidebarPostsRaw, latestPlantaoRaw] = await Promise.all([
    getPost(slug),
    getSidebarPosts(),
    getLatestPlantao(),
  ]);

  if (!postRaw) notFound();

  const locale = "pt";

  // Tradução do post e listagens secundárias
  const [post] = translatePosts([postRaw], locale);
  const sidebarPosts = translatePosts(sidebarPostsRaw, locale);
  const latestPlantao = translatePosts(latestPlantaoRaw, locale);

  const getLocalizedHref = (path: string) => {
    return path;
  };

  const primaryCategory = post.categoria.split(',')[0].trim();
  const relatedPostsRaw = await getRelatedPosts(primaryCategory, post.id);
  const relatedPosts = translatePosts(relatedPostsRaw, locale);

  // Calcular Tempo de Leitura
  const wordCount = post.conteudo_markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = formatPostDate(post.publicado_em, locale);
  const formattedTime = formatPostTime(post.publicado_em);

  // Processamento de Conteúdo
  const processedMarkdown = post.conteudo_markdown
    .replace(/^# .*\n/g, '')
    .replace(/^## (\d+)\. /gm, '## ')
    .replace(/\[(IMAGEM|IMAGE|IMAGEN|DETALHE_IMAGEM|IMAGE_DETAIL|DETALLE_IMAGEN|DETALLE DE IMAGEN|INFO_GRAFICO|INFOGRAPHIC|INFOGRAFÍA|INFOGRAFIA|INFO GRAPHIC)\s*:\s*([^|\]\n\r]+)(?:\s*\|\s*([^:]+)\s*:\s*([^\]\n\r]+))?\]?/gi, (match, type, firstPart, secondPart, thirdPart) => {
        const url = firstPart.trim();
        const caption = thirdPart ? thirdPart.trim() : '';
        return `<post-image src="${url}" caption="${caption}"></post-image>`;
    })
    .replace(/\[PONTOS_CHAVE:\s*([^\]]+)\]/gi, (match, content) => {
        return `<key-points content="${content.trim().replace(/"/g, '&quot;')}"></key-points>`;
    })
    .replace(/\[CRONOLOGIA:\s*([^\]]+)\]/gi, (match, content) => {
        return `<post-timeline content="${content.trim().replace(/"/g, '&quot;')}"></post-timeline>`;
    })
    .replace(/\[FAQ:\s*([^\]]+)\]/gi, (match, content) => {
        return `<faq-accordion content="${content.trim().replace(/"/g, '&quot;')}"></faq-accordion>`;
    })
    .replace(/\[FICHA_TECNICA:\s*([^\]]+)\]/gi, (match, content) => {
        return `<technical-specs content="${content.trim().replace(/"/g, '&quot;')}"></technical-specs>`;
    })
    .replace(/\[CONTEXTO:\s*([^\]]+)\]/gi, (match, content) => {
        return `<content-callout variant="context" content="${content.trim().replace(/"/g, '&quot;')}"></content-callout>`;
    })
    .replace(/\[DESAFIOS:\s*([^\]]+)\]/gi, (match, content) => {
        return `<content-callout variant="challenges" content="${content.trim().replace(/"/g, '&quot;')}"></content-callout>`;
    })
    .replace(/\[PROXIMOS_PASSOS:\s*([^\]]+)\]/gi, (match, content) => {
        return `<content-callout variant="milestones" content="${content.trim().replace(/"/g, '&quot;')}"></content-callout>`;
    });

  const optimizedFeaturedImage = post.imagem_url?.includes('unsplash.com') 
    ? `${post.imagem_url.split('?')[0]}?auto=format&fit=crop&q=80&w=1200`
    : post.imagem_url || PLACEHOLDER;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.titulo,
    "image": [optimizedFeaturedImage],
    "datePublished": post.publicado_em,
    "dateModified": post.publicado_em,
    "author": [{
      "@type": "Person",
      "name": post.autor || getTranslation(locale, "author_redacao"),
    }],
    "publisher": {
      "@type": "Organization",
      "name": "FolhaByte",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://folhabyte.dev'}/favicon.ico`
      }
    }
  };

  // Select layout based on category
  const layoutType = getLayoutType(post.categoria);

  const layoutProps = {
    post, sidebarPosts, relatedPosts, processedMarkdown,
    readingTime, formattedDate, formattedTime, locale, getLocalizedHref
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <ReadingProgress />
      <ViewCounter postId={post.id} />

      {/* Layout Selection */}
      {layoutType === "analysis" && <PostLayoutAnalysis {...layoutProps} />}
      {layoutType === "quicknews" && <PostLayoutQuickNews {...layoutProps} />}
      {layoutType === "magazine" && <PostLayoutMagazine {...layoutProps} />}

      {/* Plantão Tech — shared across all layouts */}
      <section className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-lg animate-pulse">
                  <Newspaper className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
                  {getTranslation(locale, "tech_alert_title")} <span className="text-red-600">Tech</span>
               </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{getTranslation(locale, "breaking_news")}</span>
         </div>
         
         <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory">
            {latestPlantao.map((p) => (
               <StoryStream key={p.id} post={p} variant="horizontal" locale={locale} />
            ))}
         </div>
      </section>
    </div>
  );
}

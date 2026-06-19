import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { Sidebar } from "@/components/Sidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { ViewCounter } from "@/components/ViewCounter";
import { AdBanner } from "@/components/AdBanner";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryStream } from "@/components/StoryStream";
import AffiliateWidget from "@/components/AffiliateWidget";
import PostImage from "@/components/PostImage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, Tag, Clock, Newspaper, ShieldCheck } from "lucide-react";
import { formatPostDate, formatPostTime } from "@/lib/date-utils";
import rehypeRaw from "rehype-raw";
import { slugify } from "@/lib/slugify";
import { headers } from "next/headers";
import { translatePosts } from "@/lib/posts";
import { getTranslation } from "@/lib/translations";

export const revalidate = 120;

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";

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
      languages: {
        "pt-BR": `/post/${slug}`,
        "en": `/en/post/${slug}`,
        "es": `/es/post/${slug}`,
      }
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

  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  // Tradução do post e listagens secundárias
  const [post] = translatePosts([postRaw], locale);
  const sidebarPosts = translatePosts(sidebarPostsRaw, locale);
  const latestPlantao = translatePosts(latestPlantaoRaw, locale);

  const getLocalizedHref = (path: string) => {
    if (locale === "pt") return path;
    return `/${locale}${path}`;
  };

  const primaryCategory = post.categoria.split(',')[0].trim();
  const relatedPostsRaw = await getRelatedPosts(primaryCategory, post.id);
  const relatedPosts = translatePosts(relatedPostsRaw, locale);

  // Calcular Tempo de Leitura
  const wordCount = post.conteudo_markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = formatPostDate(post.publicado_em, locale);
  const formattedTime = formatPostTime(post.publicado_em);

  // REGRA: Processamento de Conteúdo FolhaByte (v2.20.16)
  // Substituímos as tags customizadas por componentes HTML que o ReactMarkdown processará via rehypeRaw
  const processedMarkdown = post.conteudo_markdown
    .replace(/^# .*\n/g, '')         // Remove o título redundante no topo do MD
    .replace(/^## (\d+)\. /gm, '## ') // Remove numeração "1. ", "2. " de H2
    .replace(/\[(IMAGEM|IMAGE|IMAGEN|DETALHE_IMAGEM|IMAGE_DETAIL|DETALLE_IMAGEN|DETALLE DE IMAGEN|INFO_GRAFICO|INFOGRAPHIC|INFOGRAFÍA|INFOGRAFIA|INFO GRAPHIC)\s*:\s*([^|\]\n\r]+)(?:\s*\|\s*([^:]+)\s*:\s*([^\]\n\r]+))?\]?/gi, (match, type, firstPart, secondPart, thirdPart) => {
        const url = firstPart.trim();
        const caption = thirdPart ? thirdPart.trim() : '';
        return `<post-image src="${url}" caption="${caption}"></post-image>`;
    });

  // Função para renderizar componentes customizados
  const renderers = {
    'post-image': (props: { src: string; caption?: string; alt?: string }) => <PostImage {...props} />,
    p: (props: React.ComponentProps<'p'>) => {
      const { children } = props;
      const rawText = Array.isArray(children) 
        ? children.map(c => typeof c === 'string' ? c : '').join('')
        : typeof children === 'string' ? children : '';

      const trimmed = rawText.trim();

      if (trimmed.startsWith('[DEAL:') && trimmed.endsWith(']')) {
        try {
          const dealIndex = parseInt(trimmed.match(/\d+/)?.[0] || "0");
          const affiliateData = post.affiliate_data;
          
          if (!affiliateData) return null;

          const deals = typeof affiliateData === 'string' 
            ? JSON.parse(affiliateData) 
            : affiliateData;
            
          const dealData = Array.isArray(deals) ? deals[dealIndex] : null;
          
          if (dealData) {
            return (
              <AffiliateWidget 
                productName={dealData.productName}
                price={dealData.price}
                store={dealData.store}
                affiliateUrl={dealData.affiliateUrl}
                productImage={dealData.productImage}
                isBestChoice={dealData.isBestChoice}
              />
            );
          }
        } catch (e) {
          console.error("Erro ao renderizar AffiliateWidget:", e);
          return null;
        }
      }
      return <p className="mb-8 leading-relaxed text-slate-700 dark:text-slate-300 text-lg">{children}</p>;
    }
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <ReadingProgress />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <ViewCounter postId={post.id} />
          
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.categoria.split(',').map((cat) => {
                const trimmedCat = cat.trim();
                const lowerCat = trimmedCat.toLowerCase();
                const isIA = ["ia", "inteligencia artificial", "inteligência artificial"].includes(lowerCat);
                const hrefSlug = isIA ? "ia" : lowerCat;
                return (
                  <Link
                    key={trimmedCat}
                    href={getLocalizedHref(`/categoria/${hrefSlug}`)}
                    className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black underline uppercase px-3 py-1.5 rounded-lg tracking-tighter hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {trimmedCat}
                  </Link>
                );
              })}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 italic">
              {post.titulo}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                 <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 leading-none mb-1">{getTranslation(locale, "authority")}</span>
                 <span className="font-black uppercase tracking-tight text-slate-900 dark:text-white text-xs leading-none">{post.autor}</span>
              </div>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-300" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
               {formattedTime}
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" /> {readingTime} {getTranslation(locale, "min_read")}
            </span>
          </div>

          <div className="mb-8">
            <ShareButtons titulo={post.titulo} />
          </div>

          <PostImage
            src={optimizedFeaturedImage}
            alt={post.titulo}
            priority
            className="!my-0 !mb-12"
          />

          <div className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-img:rounded-3xl prose-img:shadow-xl
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:rounded-r-2xl prose-blockquote:p-6 prose-blockquote:italic">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              components={renderers} 
              rehypePlugins={[rehypeRaw]}
            >
              {processedMarkdown}
            </ReactMarkdown>

            {/* Seção Mais em [Categoria] v2.9.3 */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                  {getTranslation(locale, "more_in")} <span className="text-blue-600 italic">{primaryCategory}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPosts.map((p) => (
                    <Link key={p.id} href={getLocalizedHref(`/post/${p.original_titulo ? slugify(p.original_titulo) : slugify(p.titulo)}`)} className="group flex flex-col gap-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <Image 
                          src={p.imagem_url || PLACEHOLDER} 
                          alt={p.titulo} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 33vw, 300px"
                        />
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {p.titulo}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 mb-8 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 not-prose">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                   <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white uppercase italic mb-1">{getTranslation(locale, "editorial_standard")}</h4>
                  <p className="leading-relaxed m-0 text-xs sm:text-sm">
                    {getTranslation(locale, "editorial_standard_desc")} <strong>{post.autor || getTranslation(locale, "our_editorial")}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <AdBanner className="mt-8" format="fluid" />
          </div>
        </article>

        {/* Sidebar Limpa */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
          <Sidebar posts={sidebarPosts} />
          <AdBanner className="my-0" format="rectangle" />
        </div>
      </div>

      {/* Novo Rodapé Dinâmico: Plantão Tech Horizontal */}
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
         
         {/* Carrossel Horizontal de Notícias */}
         <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory">
            {latestPlantao.map((p) => (
               <StoryStream key={p.id} post={p} variant="horizontal" locale={locale} />
            ))}
         </div>
      </section>
    </div>
  );
}

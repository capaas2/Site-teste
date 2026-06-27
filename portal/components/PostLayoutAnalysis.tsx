import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Calendar, User, Tag, Clock, BarChart3 } from "lucide-react";
import { Post } from "@/types/post";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBio } from "@/components/AuthorBio";
import PostImage from "@/components/PostImage";
import { buildRenderers, RelatedPostsSection, EditorialBadge } from "@/components/PostLayoutMagazine";
import { getTranslation } from "@/lib/translations";

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";

interface LayoutProps {
  post: Post;
  sidebarPosts: Post[];
  relatedPosts: Post[];
  processedMarkdown: string;
  readingTime: number;
  formattedDate: string;
  formattedTime: string;
  locale: string;
  getLocalizedHref: (path: string) => string;
}

export function PostLayoutAnalysis({
  post, relatedPosts, processedMarkdown,
  readingTime, formattedDate, formattedTime, locale, getLocalizedHref
}: LayoutProps) {
  const optimizedFeaturedImage = post.imagem_url?.includes('unsplash.com')
    ? `${post.imagem_url.split('?')[0]}?auto=format&fit=crop&q=80&w=1400`
    : post.imagem_url || PLACEHOLDER;

  const primaryCategory = post.categoria.split(',')[0].trim();
  const renderers = buildRenderers(post);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Accent bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
          <BarChart3 className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
          Análise em Profundidade
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {post.categoria.split(',').map((cat) => {
          const trimmedCat = cat.trim();
          const lowerCat = trimmedCat.toLowerCase();
          const isIA = ["ia", "inteligencia artificial", "inteligência artificial"].includes(lowerCat);
          const hrefSlug = isIA ? "ia" : lowerCat;
          return (
            <Link key={trimmedCat} href={getLocalizedHref(`/categoria/${hrefSlug}`)}
              className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black underline uppercase px-3 py-1.5 rounded-lg tracking-tighter hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
              <Tag className="w-3 h-3" />{trimmedCat}
            </Link>
          );
        })}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
        {post.titulo}
      </h1>

      {/* Author & Meta — horizontal card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight leading-none">{post.autor}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedTime}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" /> {readingTime} {getTranslation(locale, "min_read")}
          </span>
        </div>
      </div>

      <div className="mb-8"><ShareButtons titulo={post.titulo} /></div>

      {/* Full-width hero */}
      <PostImage src={optimizedFeaturedImage} alt={post.titulo} priority className="!my-0 !mb-14" />

      {/* Content — wider prose */}
      <div className="prose prose-lg prose-emerald dark:prose-invert max-w-none
        prose-headings:font-black prose-headings:tracking-tight
        prose-a:text-emerald-600 dark:prose-a:text-emerald-400
        prose-img:rounded-3xl prose-img:shadow-xl
        prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-950/20 prose-blockquote:rounded-r-2xl prose-blockquote:p-6 prose-blockquote:italic
        prose-li:marker:text-emerald-500">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers} rehypePlugins={[rehypeRaw]}>
          {processedMarkdown}
        </ReactMarkdown>

        {relatedPosts.length > 0 && (
          <RelatedPostsSection posts={relatedPosts} primaryCategory={primaryCategory} locale={locale} getLocalizedHref={getLocalizedHref} />
        )}

        <EditorialBadge post={post} locale={locale} />
        <AuthorBio authorName={post.autor} />
      </div>
    </article>
  );
}

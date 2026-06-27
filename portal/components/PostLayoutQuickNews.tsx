import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Calendar, User, Tag, Clock, Zap } from "lucide-react";
import { Post } from "@/types/post";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBio } from "@/components/AuthorBio";
import { buildRenderers, RelatedPostsSection, EditorialBadge } from "@/components/PostLayoutMagazine";
import { slugify } from "@/lib/slugify";
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

export function PostLayoutQuickNews({
  post, relatedPosts, processedMarkdown,
  readingTime, formattedDate, formattedTime, locale, getLocalizedHref
}: LayoutProps) {
  const optimizedFeaturedImage = post.imagem_url?.includes('unsplash.com')
    ? `${post.imagem_url.split('?')[0]}?auto=format&fit=crop&q=80&w=800`
    : post.imagem_url || PLACEHOLDER;

  const primaryCategory = post.categoria.split(',')[0].trim();
  const renderers = buildRenderers(post);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Flash badge */}
      <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-red-500/20">
        <Zap className="w-3.5 h-3.5" /> Flash News
      </div>

      {/* Compact header with image side-by-side */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1 min-w-0">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.categoria.split(',').map((cat) => {
              const trimmedCat = cat.trim();
              const lowerCat = trimmedCat.toLowerCase();
              const isIA = ["ia", "inteligencia artificial", "inteligência artificial"].includes(lowerCat);
              const hrefSlug = isIA ? "ia" : lowerCat;
              return (
                <Link key={trimmedCat} href={getLocalizedHref(`/categoria/${hrefSlug}`)}
                  className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[9px] font-black uppercase px-2 py-1 rounded tracking-tighter hover:bg-red-200 transition-colors">
                  <Tag className="w-2.5 h-2.5" />{trimmedCat}
                </Link>
              );
            })}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4 italic">
            {post.titulo}
          </h1>

          {/* Compact meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> <strong className="text-slate-900 dark:text-white">{post.autor}</strong>
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
              <Clock className="w-3.5 h-3.5" /> {readingTime} min
            </span>
          </div>
        </div>

        {/* Compact image */}
        <div className="relative w-full md:w-72 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex-shrink-0 shadow-lg">
          <Image
            src={optimizedFeaturedImage}
            alt={post.titulo}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>
      </div>

      <div className="mb-6"><ShareButtons titulo={post.titulo} /></div>

      {/* Content — compact prose */}
      <article className="prose prose-blue dark:prose-invert max-w-none
        prose-headings:font-black prose-headings:tracking-tight prose-headings:italic prose-headings:text-lg
        prose-p:text-base prose-p:leading-relaxed
        prose-a:text-blue-600 dark:prose-a:text-blue-400
        prose-img:rounded-2xl prose-img:shadow-lg
        prose-blockquote:border-red-500 prose-blockquote:bg-red-50 dark:prose-blockquote:bg-red-950/20 prose-blockquote:rounded-r-xl prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers} rehypePlugins={[rehypeRaw]}>
          {processedMarkdown}
        </ReactMarkdown>

        {relatedPosts.length > 0 && (
          <RelatedPostsSection posts={relatedPosts} primaryCategory={primaryCategory} locale={locale} getLocalizedHref={getLocalizedHref} />
        )}

        <EditorialBadge post={post} locale={locale} />
        <AuthorBio authorName={post.autor} />
      </article>
    </div>
  );
}

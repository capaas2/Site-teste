import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Calendar, User, Tag, Clock } from "lucide-react";
import { Post } from "@/types/post";
import { Sidebar } from "@/components/Sidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBio } from "@/components/AuthorBio";
import PostImage from "@/components/PostImage";
import AffiliateWidget from "@/components/AffiliateWidget";
import KeyPoints from "@/components/KeyPoints";
import Timeline from "@/components/Timeline";
import FAQAccordion from "@/components/FAQAccordion";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import ContentCallout from "@/components/ContentCallout";
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

export function PostLayoutMagazine({
  post, sidebarPosts, relatedPosts, processedMarkdown,
  readingTime, formattedDate, formattedTime, locale, getLocalizedHref
}: LayoutProps) {
  const optimizedFeaturedImage = post.imagem_url?.includes('unsplash.com')
    ? `${post.imagem_url.split('?')[0]}?auto=format&fit=crop&q=80&w=1200`
    : post.imagem_url || PLACEHOLDER;

  const primaryCategory = post.categoria.split(',')[0].trim();

  const renderers = buildRenderers(post);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <article className="lg:col-span-2">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categoria.split(',').map((cat) => {
              const trimmedCat = cat.trim();
              const lowerCat = trimmedCat.toLowerCase();
              const isIA = ["ia", "inteligencia artificial", "inteligência artificial"].includes(lowerCat);
              const hrefSlug = isIA ? "ia" : lowerCat;
              return (
                <Link key={trimmedCat} href={getLocalizedHref(`/categoria/${hrefSlug}`)}
                  className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black underline uppercase px-3 py-1.5 rounded-lg tracking-tighter hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  <Tag className="w-3 h-3" />{trimmedCat}
                </Link>
              );
            })}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 italic">
            {post.titulo}
          </h1>
        </div>

        {/* Meta */}
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
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-300" /> {formattedDate}</span>
          <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{formattedTime}</span>
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" /> {readingTime} {getTranslation(locale, "min_read")}
          </span>
        </div>

        <div className="mb-8"><ShareButtons titulo={post.titulo} /></div>

        <PostImage src={optimizedFeaturedImage} alt={post.titulo} priority className="!my-0 !mb-12" />

        {/* Content */}
        <div className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-img:rounded-3xl prose-img:shadow-xl
          prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:rounded-r-2xl prose-blockquote:p-6 prose-blockquote:italic">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers} rehypePlugins={[rehypeRaw]}>
            {processedMarkdown}
          </ReactMarkdown>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <RelatedPostsSection posts={relatedPosts} primaryCategory={primaryCategory} locale={locale} getLocalizedHref={getLocalizedHref} />
          )}

          <AuthorBio authorName={post.autor} />
        </div>
      </article>

      <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
        <Sidebar posts={sidebarPosts} />
      </div>
    </div>
  );
}

// Shared sub-components
function RelatedPostsSection({ posts, primaryCategory, locale, getLocalizedHref }: { posts: Post[]; primaryCategory: string; locale: string; getLocalizedHref: (p: string) => string }) {
  return (
    <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
        {getTranslation(locale, "more_in")} <span className="text-blue-600 italic">{primaryCategory}</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link key={p.id} href={getLocalizedHref(`/post/${p.original_titulo ? slugify(p.original_titulo) : slugify(p.titulo)}`)} className="group flex flex-col gap-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <Image src={p.imagem_url || PLACEHOLDER} alt={p.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 33vw, 300px" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{p.titulo}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
}



export function buildRenderers(post: Post) {
  return {
    'post-image': (props: { src: string; caption?: string; alt?: string }) => {
      // Ignora a imagem de corpo se ela for a mesma imagem de destaque (capa) do post
      if (
        props.src === post.imagem_url ||
        (post.imagem_url && props.src.includes(post.imagem_url)) ||
        (props.src && post.imagem_url && post.imagem_url.includes(props.src))
      ) {
        return null;
      }
      return <PostImage {...props} />;
    },
    'key-points': (props: { content: string }) => <KeyPoints rawContent={props.content} />,
    'post-timeline': (props: { content: string }) => <Timeline rawContent={props.content} />,
    'faq-accordion': (props: { content: string }) => <FAQAccordion rawContent={props.content} />,
    'technical-specs': (props: { content: string }) => <TechnicalSpecs rawContent={props.content} />,
    'content-callout': (props: { content: string; variant: "context" | "challenges" | "milestones" }) => <ContentCallout rawContent={props.content} variant={props.variant} />,
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
          const deals = typeof affiliateData === 'string' ? JSON.parse(affiliateData) : affiliateData;
          const dealData = Array.isArray(deals) ? deals[dealIndex] : null;
          if (dealData) {
            return (
              <AffiliateWidget
                productName={dealData.productName} price={dealData.price}
                store={dealData.store} affiliateUrl={dealData.affiliateUrl}
                productImage={dealData.productImage} isBestChoice={dealData.isBestChoice}
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
}

export { RelatedPostsSection };

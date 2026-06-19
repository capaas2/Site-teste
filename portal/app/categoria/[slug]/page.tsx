import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslation } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  let title = `Notícias sobre ${decodedSlug} | FolhaByte`;
  let description = `Fique atualizado com as últimas matérias, análises e novidades sobre ${decodedSlug} no portal FolhaByte.`;

  if (locale === "en") {
    title = `News about ${decodedSlug} | FolhaByte`;
    description = `Stay updated with the latest articles, analysis, and news about ${decodedSlug} on FolhaByte.`;
  } else if (locale === "es") {
    title = `Noticias sobre ${decodedSlug} | FolhaByte`;
    description = `Mantente actualizado con los últimos artículos, análisis y novedades sobre ${decodedSlug} en el portal FolhaByte.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/categoria/${slug}`,
      languages: {
        "pt-BR": `/categoria/${slug}`,
        "en": `/en/categoria/${slug}`,
        "es": `/es/categoria/${slug}`,
      }
    },
  };
}

export const revalidate = 60;

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
  };

  const decodedSlug = decodeURIComponent(slug);
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 12;

  const { posts, count } = await getPostsByCategory(decodedSlug, currentPage, pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              {getTranslation(locale, "category_label")} <span className="text-indigo-600">{decodedSlug}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {getTranslation(locale, "explore_archive")} {decodedSlug}
            </p>
          </div>
        </div>

        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href={getLocalizedHref("/")} className="hover:text-indigo-600">{getTranslation(locale, "home")}</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">{decodedSlug}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} locale={locale} />
            {(index + 1) % 6 === 0 && (
              <div className="col-span-full py-8">
                <AdBanner format="fluid" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalCount={count}
        pageSize={pageSize}
        baseUrl={getLocalizedHref(`/categoria/${slug}`)}
      />

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">{getTranslation(locale, "no_category_posts")}</p>
          <Link href={getLocalizedHref("/")} className="mt-4 inline-block text-indigo-600 font-bold uppercase tracking-widest text-xs">{getTranslation(locale, "back_to_home")}</Link>
        </div>
      )}
    </div>
  );
}

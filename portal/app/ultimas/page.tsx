import { getLatestPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslation } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  let title = "Últimas Notícias | FolhaByte";
  let description = "Acompanhe as últimas notícias, lançamentos e análises do mundo da tecnologia, inteligência artificial e gadgets em tempo real.";

  if (locale === "en") {
    title = "Latest News | FolhaByte";
    description = "Follow the latest news, releases and analysis of the tech world, artificial intelligence and gadgets in real time.";
  } else if (locale === "es") {
    title = "Últimas Noticias | FolhaByte";
    description = "Sigue las últimas noticias, lanzamientos y análisis del mundo de la tecnología, inteligencia artificial y dispositivos en tiempo real.";
  }

  return {
    title,
    description,
    alternates: {
      canonical: "/ultimas",
      languages: {
        "pt-BR": "/ultimas",
        "en": "/en/ultimas",
        "es": "/es/ultimas",
      }
    },
  };
}

export const revalidate = 60;

export default async function LatestPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 12;

  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
  };

  const { posts, count } = await getLatestPosts(currentPage, pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              {getTranslation(locale, "latest")} <span className="text-blue-600">{getTranslation(locale, "news")}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{getTranslation(locale, "latest_news_desc")}</p>
          </div>
        </div>

        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href={getLocalizedHref("/")} className="hover:text-blue-600">{getTranslation(locale, "home")}</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">{getTranslation(locale, "latest")}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} locale={locale} />
            {/* AdSense Intercalado a cada 6 posts */}
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
        baseUrl={getLocalizedHref("/ultimas")}
      />

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">{getTranslation(locale, "no_page_posts")}</p>
          <Link href={getLocalizedHref("/ultimas")} className="mt-4 inline-block text-blue-600 font-bold uppercase tracking-widest text-xs">{getTranslation(locale, "back_to_page1")}</Link>
        </div>
      )}
    </div>
  );
}

import { PostFeed } from "@/components/PostFeed";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { Metadata } from "next";
import { headers } from "next/headers";
import { translatePosts } from "@/lib/posts";
import { getTranslation } from "@/lib/translations";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || "";
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  let title = query ? `Resultados para "${query}" | FolhaByte` : "Busca | FolhaByte";
  let description = `Resultados da busca no portal FolhaByte para o termo: "${query}".`;

  if (locale === "en") {
    title = query ? `Results for "${query}" | FolhaByte` : "Search | FolhaByte";
    description = `Search results on the FolhaByte portal for the term: "${query}".`;
  } else if (locale === "es") {
    title = query ? `Resultados para "${query}" | FolhaByte` : "Buscar | FolhaByte";
    description = `Resultados de la búsqueda en el portal FolhaByte para el término: "${query}".`;
  }

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export const revalidate = 0;

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  let posts: Post[] = [];

  if (query) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .or(`titulo.ilike.%${query}%,conteudo_markdown.ilike.%${query}%`)
      .order("publicado_em", { ascending: false });

    if (!error && data) {
      posts = translatePosts(data as Post[], locale);
    }
  }

  const feedbackText = posts.length === 1 
    ? `${posts.length} ${getTranslation(locale, "news_found_single")}` 
    : `${posts.length} ${getTranslation(locale, "news_found_plural")}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[60vh]">
      <div className="pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTranslation(locale, "results_for")} <span className="text-blue-600 dark:text-blue-500">&quot;{query}&quot;</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          {feedbackText}
        </p>
      </div>

      <PostFeed posts={posts} locale={locale} />
    </div>
  );
}

import { PostFeed } from "@/components/PostFeed";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";

export const revalidate = 0;

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  let posts: Post[] = [];

  if (query) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .or(`titulo.ilike.%${query}%,conteudo_markdown.ilike.%${query}%`)
      .order("publicado_em", { ascending: false });

    if (!error && data) {
      posts = data as Post[];
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[60vh]">
      <div className="pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Resultados para: <span className="text-blue-600 dark:text-blue-500">"{query}"</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          {posts.length} {posts.length === 1 ? "notícia encontrada" : "notícias encontradas"} em nossa redação.
        </p>
      </div>

      <PostFeed posts={posts} />
    </div>
  );
}

import { PostFeed } from "@/components/PostFeed";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";

export const revalidate = 60;

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("categoria", `%${decodedSlug}%`)
    .order("publicado_em", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  const posts = (data as Post[]) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[60vh]">
      <div className="pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight">
          Categoria: <span className="text-blue-600 dark:text-blue-500">{decodedSlug}</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Veja as últimas notícias publicadas nesta categoria.
        </p>
      </div>

      <PostFeed posts={posts} />
    </div>
  );
}

import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";

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
              Categoria: <span className="text-indigo-600">{decodedSlug}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Explore todo o nosso acervo sobre {decodedSlug}
            </p>
          </div>
        </div>

        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">{decodedSlug}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} />
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
        baseUrl={`/categoria/${slug}`}
      />

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">Não encontramos notícias para esta categoria ou página.</p>
          <Link href="/" className="mt-4 inline-block text-indigo-600 font-bold uppercase tracking-widest text-xs">Voltar para a Home</Link>
        </div>
      )}
    </div>
  );
}

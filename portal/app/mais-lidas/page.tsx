import { getTopPosts } from "@/lib/posts";
import { FeaturedRanking } from "@/components/FeaturedRanking";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";

export const revalidate = 120;

export default async function MostReadPage() {
  // Pegamos o ranking semanal (Top 20)
  const posts = await getTopPosts(7, 21);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              Mais <span className="text-red-600">Lidas</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Os hits da semana na FolhaByte</p>
          </div>
        </div>
        
        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">Mais Lidas</span>
        </nav>
      </div>

      {/* Destaques (Top 3) */}
      <section className="mb-16">
        <FeaturedRanking posts={posts.slice(0, 3)} />
      </section>

      {/* Outras mais lidas intercaladas com anúncios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(3).map((post, index) => (
          <div key={post.id} className="relative group">
             <div className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-xs font-black text-white italic">
               #{index + 4}
             </div>
             <PostCard post={post} />
             {/* AdSense Intercalado a cada 6 posts */}
             {(index + 1) % 6 === 0 && (
               <div className="col-span-full py-8">
                 <AdBanner format="fluid" />
               </div>
             )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">Ainda sem dados de visualização para o ranking semanal.</p>
        </div>
      )}
    </div>
  );
}

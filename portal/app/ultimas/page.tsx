import { getLatestPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

export const revalidate = 60;

export default async function LatestPostsPage() {
  const posts = await getLatestPosts(30);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              Últimas <span className="text-blue-600">Notícias</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">O que acaba de acontecer no mundo tech</p>
          </div>
        </div>
        
        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">Últimas</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id}>
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
          <p className="text-slate-400">Nenhuma notícia encontrada no momento.</p>
        </div>
      )}
    </div>
  );
}

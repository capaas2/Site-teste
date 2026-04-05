import Link from "next/link";
import { Clock } from "lucide-react";
import { Post } from "@/types/post";

interface StoryStreamProps {
  posts: Post[];
}

export function StoryStream({ posts }: StoryStreamProps) {
  if (!posts.length) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-8">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white italic">
          Plantão <span className="text-red-500">Tech</span>
        </h3>
      </div>

      <div className="relative space-y-8 pl-4 border-l border-slate-100 dark:border-slate-800">
        {posts.map((post) => {
          const pubDate = new Date(post.publicado_em);
          const timeStr = pubDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={post.id} className="relative group">
              {/* Dot on Timeline */}
              <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-900 group-hover:bg-red-500 group-hover:scale-125 transition-all" />
              
              <Link href={`/post/${post.id}`} className="block space-y-1">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                   <Clock className="w-3 h-3" /> {timeStr}
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 italic">
                  {post.titulo}
                </p>
              </Link>
            </div>
          );
        })}
      </div>

      <Link 
        href="/ultimas" 
        className="mt-8 flex items-center justify-center w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 transition-all border border-slate-100 dark:border-slate-800 border-dashed"
      >
        Ver Todas as Últimas
      </Link>
    </div>
  );
}

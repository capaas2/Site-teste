import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { Clock } from "lucide-react";
import { formatPostTime } from "@/lib/date-utils";
import { slugify } from "@/lib/slugify";

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";

interface HeroGridProps {
  featuredPosts: Post[];
  latestPosts: Post[];
}

export function HeroGrid({ featuredPosts, latestPosts }: HeroGridProps) {
  if (featuredPosts.length === 0) return null;

  const [main, second, third] = featuredPosts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[420px]">
      {/* Notícia Principal — spans 2 cols */}
      {main && (
        <Link
          href={`/post/${slugify(main.titulo)}`}
          className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden group min-h-[420px] block shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800"
        >
          <Image
            src={main.imagem_url || PLACEHOLDER}
            alt={main.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <div className="flex items-center gap-3">
               <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {main.categoria}
               </span>
               <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {formatPostTime(main.publicado_em)}
               </span>
            </div>
            <h2 className="text-white font-black text-3xl sm:text-4xl leading-tight tracking-tighter group-hover:text-blue-200 transition-colors italic">
              {main.titulo}
            </h2>
            <div className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
               Por <span className="text-blue-400">{main.autor}</span>
            </div>
          </div>
        </Link>
      )}

      {/* Notícias secundárias empilhadas */}
      <div className="flex flex-col gap-6">
        {[second, third].filter(Boolean).map((post) => post && (
          <Link
            key={post.id}
            href={`/post/${slugify(post.titulo)}`}
            className="relative rounded-[2rem] overflow-hidden group flex-1 min-h-[200px] block shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <Image
              src={post.imagem_url || PLACEHOLDER}
              alt={post.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 p-6 space-y-2">
              <div className="flex items-center gap-2">
                 <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {post.categoria}
                 </span>
                 <span className="text-white/80 text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" /> {formatPostTime(post.publicado_em)}
                 </span>
              </div>
              <h3 className="text-white font-black text-sm leading-snug group-hover:text-blue-200 transition-colors italic tracking-tight">
                {post.titulo}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Sidebar — Últimas */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white italic">
                Últimas <span className="text-red-600">News</span>
              </h3>
           </div>
           <div className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
        </div>
        <div className="space-y-6">
          {latestPosts.slice(0, 6).map((post) => (
            <Link key={post.id} href={`/post/${slugify(post.titulo)}`} className="flex flex-col gap-1 group">
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                 <span className="text-blue-600">{formatPostTime(post.publicado_em)}</span>
                 <span className="h-1 w-1 rounded-full bg-slate-300" />
                 {post.categoria}
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug italic">
                {post.titulo}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

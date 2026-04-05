import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { TrendingUp } from "lucide-react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";

interface HeroGridProps {
  featuredPosts: Post[];
  latestPosts: Post[];
}

export function HeroGrid({ featuredPosts, latestPosts }: HeroGridProps) {
  if (featuredPosts.length === 0) return null;

  const [main, second, third] = featuredPosts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[420px]">
      {/* Notícia Principal — spans 2 cols */}
      {main && (
        <Link
          href={`/post/${main.id}`}
          className="lg:col-span-2 relative rounded-xl overflow-hidden group min-h-[420px] block"
        >
          <Image
            src={main.imagem_url || PLACEHOLDER}
            alt={main.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block">
              {main.categoria}
            </span>
            <h2 className="text-white font-extrabold text-2xl leading-tight tracking-tight group-hover:text-blue-200 transition-colors">
              {main.titulo}
            </h2>
            <p className="text-white/70 text-sm mt-1">{main.autor}</p>
          </div>
        </Link>
      )}

      {/* Notícias secundárias empilhadas */}
      <div className="flex flex-col gap-4">
        {[second, third].filter(Boolean).map((post) => post && (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="relative rounded-xl overflow-hidden group flex-1 min-h-[200px] block"
          >
            <Image
              src={post.imagem_url || PLACEHOLDER}
              alt={post.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
                {post.categoria}
              </span>
              <h3 className="text-white font-bold text-sm leading-snug group-hover:text-blue-200 transition-colors">
                {post.titulo}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Sidebar — Mais Lidas */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
           <TrendingUp className="w-4 h-4 text-blue-600 animate-pulse" />
           <h3 className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
             Bombando Hoje
           </h3>
        </div>
        <div className="space-y-4">
          {latestPosts.slice(0, 6).map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="flex items-start gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                {post.titulo}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { slugify } from "@/lib/slugify";
import { TrendingUp } from "lucide-react";

interface FeaturedRankingProps {
  posts: Post[];
}

export function FeaturedRanking({ posts }: FeaturedRankingProps) {
  if (posts.length === 0) return null;

  // Pegamos apenas as top 3 ordenadas por visualizações
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
          Os Mais <span className="text-blue-600">Lidos</span> do Dia
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/post/${slugify(post.titulo)}`}
            className="group relative flex flex-col h-full bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)] shadow-sm"
          >
            {/* Numeral Gigante (Artístico) */}
            <div className="absolute top-4 right-4 pointer-events-none select-none">
              <span className="text-8xl font-black text-slate-100 dark:text-slate-800/40 italic leading-none transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 group-hover:text-blue-500/10">
                0{index + 1}
              </span>
            </div>

            {/* Imagem com Overlay */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.imagem_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"}
                alt={post.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60" />
            </div>

            {/* Conteúdo */}
            <div className="p-6 pt-2 flex-1 flex flex-col relative z-10">
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-600 mb-3 block">
                {post.categoria}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                {post.titulo}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Por {post.autor}
                </span>
                <div className="h-0.5 w-0 group-hover:w-12 bg-blue-600 transition-all duration-500 rounded-full" />
              </div>
            </div>

            {/* Efeito Neon Decorativo no final */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}

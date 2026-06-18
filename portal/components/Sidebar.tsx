"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import { formatPostTime } from "@/lib/date-utils";
import { Clock, TrendingUp } from "lucide-react";
import { slugify } from "@/lib/slugify";

interface SidebarProps {
  posts: Post[];
}

export function Sidebar({ posts }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Mais Lidas - Design de Alta Performance */}
      <div className="bg-blue-600 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-400">
        <div className="px-8 py-6 border-b border-blue-500/50 flex items-center justify-between">
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] italic flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Em Alta
          </h3>
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
             <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75" />
          </div>
        </div>
        <div className="p-8 space-y-8">
          {posts.slice(0, 5).map((post: Post, index: number) => (
            <Link key={post.id} href={`/post/${slugify(post.titulo)}`} className="flex gap-5 group items-start">
              <span className="text-5xl font-black text-blue-300/20 leading-none w-12 flex-shrink-0 italic group-hover:text-white/40 transition-all group-hover:scale-110">
                {index + 1}
              </span>
              <div className="space-y-1.5">
                <span className="text-[9px] font-black text-blue-100 uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                   <Clock className="w-3 h-3 text-blue-300" /> {formatPostTime(post.publicado_em)}
                </span>
                <span className="text-base font-bold text-white group-hover:text-blue-100 transition-colors line-clamp-3 leading-snug italic tracking-tight">
                  {post.titulo}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Adicional: Exploração Rápida (Opcional, para não deixar vazio) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 border-dashed">
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">
            Continue explorando o futuro da tecnologia
         </p>
      </div>
    </aside>
  );
}

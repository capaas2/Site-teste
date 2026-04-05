import Link from "next/link";
import { Post } from "@/types/post";

interface SidebarProps {
  posts: Post[];
}

export function Sidebar({ posts }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Mais Lidas */}
      <div className="bg-blue-600 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-blue-500">
          <h3 className="text-white font-extrabold text-sm uppercase tracking-widest">
            🔥 Mais Lidas
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {posts.slice(0, 5).map((post, index) => (
            <Link key={post.id} href={`/post/${post.id}`} className="flex gap-3 group">
              <span className="text-3xl font-black text-blue-400/60 leading-none w-8 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors line-clamp-3 leading-snug">
                {post.titulo}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <h3 className="font-extrabold text-slate-900 dark:text-white mb-1">Newsletter</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Receba as principais notícias de tech toda manhã.
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            Assinar Grátis
          </button>
        </div>
      </div>
    </aside>
  );
}

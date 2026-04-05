import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { Calendar, User } from "lucide-react";

interface PostCardProps {
  post: Post;
  variant?: "default" | "horizontal";
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const formattedDate = new Date(post.publicado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (variant === "horizontal") {
    return (
      <Link href={`/post/${post.id}`} className="flex gap-3 group">
        <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={post.imagem_url || PLACEHOLDER}
            alt={post.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {post.categoria}
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
            {post.titulo}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/post/${post.id}`}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.imagem_url || PLACEHOLDER}
          alt={post.titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {post.categoria}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-snug">
          {post.titulo}
        </h3>
        <div className="mt-auto pt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.autor}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

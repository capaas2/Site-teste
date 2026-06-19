import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { Calendar, User, Clock } from "lucide-react";
import { formatPostDate, formatPostTime } from "@/lib/date-utils";
import { slugify } from "@/lib/slugify";

interface PostCardProps {
  post: Post;
  variant?: "default" | "horizontal";
  locale?: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";

export function PostCard({ post, variant = "default", locale = "pt" }: PostCardProps) {
  const formattedDate = formatPostDate(post.publicado_em, locale);
  const formattedTime = formatPostTime(post.publicado_em);

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
  };

  if (variant === "horizontal") {
    return (
      <Link href={getLocalizedHref(`/post/${post.original_titulo ? slugify(post.original_titulo) : slugify(post.titulo)}`)} className="flex gap-4 group items-center">
        <div className="relative w-32 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <Image
            src={post.imagem_url || PLACEHOLDER}
            alt={post.titulo}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            {post.categoria.split(',').map((cat) => (
              <span key={cat.trim()} className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                {cat.trim()}
              </span>
            ))}
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
               <Clock className="w-2.5 h-2.5" /> {formattedTime}
            </span>
          </div>
          <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug italic tracking-tight">
            {post.titulo}
          </h3>
          <p className="text-[10px] font-medium text-slate-400">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={getLocalizedHref(`/post/${post.original_titulo ? slugify(post.original_titulo) : slugify(post.titulo)}`)}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.imagem_url || PLACEHOLDER}
          alt={post.titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          {post.categoria.split(',').map((cat) => (
            <span key={cat.trim()} className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              {cat.trim()}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 shadow-sm">
           <Clock className="w-3 h-3 text-blue-600" /> {formattedTime}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <h3 className="font-black text-xl text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-snug italic">
          {post.titulo}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-500" />{post.autor}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ReadMoreBoxProps {
  titulo: string;
  href: string;
  descricao?: string;
}

export function ReadMoreBox({ titulo, href, descricao }: ReadMoreBoxProps) {
  return (
    <Link
      href={href}
      className="block my-8 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/30 rounded-r-xl p-5 group hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
        📖 Leia também
      </p>
      <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug">
        {titulo}
      </h4>
      {descricao && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{descricao}</p>
      )}
      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold mt-2 group-hover:gap-2 transition-all">
        Ler matéria completa <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}

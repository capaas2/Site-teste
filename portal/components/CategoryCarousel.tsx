import Link from "next/link";
import { Hash } from "lucide-react";

interface Category {
  name: string;
  count: number;
}

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Explorar por Tópico
        </h2>
        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800 ml-6"></div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mask-fade-right">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categoria/${cat.name.toLowerCase()}`}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 text-xs font-bold whitespace-nowrap group"
          >
            <Hash className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            {cat.name}
            <span className="ml-1 text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded-md font-black group-hover:bg-blue-500 group-hover:text-white transition-colors">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

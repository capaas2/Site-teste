"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTranslation } from "@/lib/translations";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalCount, pageSize, baseUrl }: PaginationProps) {
  const pathname = usePathname() || "";
  const locale = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/es') ? 'es' : 'pt';

  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  };

  // Lógica para mostrar apenas algumas páginas (ex: 1, 2, 3 ... 13)
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex flex-col items-center gap-6 py-12" aria-label="Navegação de páginas">
      <div className="flex items-center gap-2">
        {/* Botão Anterior */}
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
            currentPage === 1 
              ? "pointer-events-none opacity-20 text-slate-400" 
              : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{getTranslation(locale, "previous")}</span>
        </Link>

        {/* Números das Páginas */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {startPage > 1 && (
             <>
               <Link href={getPageUrl(1)} className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold text-slate-500 hover:text-blue-600 transition-all">1</Link>
               {startPage > 2 && <span className="text-slate-400 px-1">...</span>}
             </>
          )}

          {pages.map((page) => (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110"
                  : "text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              {page}
            </Link>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="text-slate-400 px-1">...</span>}
              <Link href={getPageUrl(totalPages)} className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold text-slate-500 hover:text-blue-600 transition-all">{totalPages}</Link>
            </>
          )}
        </div>

        {/* Botão Próximo */}
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
            currentPage === totalPages 
              ? "pointer-events-none opacity-20 text-slate-400" 
              : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
        >
          <span className="hidden sm:inline">{getTranslation(locale, "next")}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
        {getTranslation(locale, "page")} <span className="text-blue-600">{currentPage}</span> {getTranslation(locale, "page_of")} <span className="text-slate-900 dark:text-white">{totalPages}</span>
      </div>
    </nav>
  );
}

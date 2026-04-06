"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { 
  Search, Sun, Moon, ExternalLink, AtSign, Rss, 
  Menu, X, ChevronRight, 
  Globe, Shield, TrendingUp, Smartphone, Rocket, Zap, 
  Car, Code, Palette, Leaf, Cpu, Mail
} from "lucide-react";

const mainNavItems = [
  { label: "Últimas", href: "/ultimas" },
  { label: "Mais Lidas", href: "/mais-lidas" },
  { label: "Eletrificação", slug: "eletrificacao" },
  { label: "Mobilidade", slug: "mobilidade" },
  { label: "IA & Software", slug: "ia-software" },
  { label: "Mercado", slug: "mercado" },
  { label: "Produtos", slug: "produtos" },
  { label: "Segurança", slug: "cibersegurança" },
  { label: "Sustentabilidade", slug: "sustentabilidade" },
];

interface NavbarProps {
  allCategories?: { name: string; count: number }[];
}

export function Navbar({ allCategories = [] }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query)}`);
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        {/* Top bar (Main Area) */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
          {/* Menu de Três Pontinhos (Hambúrguer) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
            <span className="hidden md:inline text-xs font-black uppercase tracking-widest mt-1">Mais</span>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-white font-black text-2xl tracking-tighter">
            Redação<span className="text-blue-500">Tech</span>
          </Link>

          {/* Search (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 w-4 h-4 transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no portal..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-500 border border-slate-800 focus:border-blue-500/50 focus:outline-none focus:ring-0 text-sm transition-all"
            />
          </form>

          {/* Social Icons & Theme (Desktop) */}
          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden lg:flex items-center gap-4 border-r border-slate-800 pr-4 mr-2">
              <Link href="#" className="hover:text-white transition-colors"><AtSign className="w-4 h-4" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Rss className="w-4 h-4" /></Link>
            </div>
            
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:text-white transition-colors"
                aria-label="Alternar tema"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            
            {/* Search (Mobile Toggle - Hidden for now as input is better) */}
            <button className="md:hidden hover:text-white">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation (Secondary Bar) */}
        <nav className="border-t border-slate-800 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto py-3 no-scrollbar">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href || `/categoria/${item.slug}`}
                className="flex-shrink-0 text-xs font-black uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-all hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Sidebar Sidebar "Drill-down" drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Drawer */}
          <div className="relative w-full max-w-sm bg-slate-900 h-full shadow-2xl flex flex-col border-r border-slate-800 animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <span className="text-white font-black text-xl tracking-tighter uppercase italic">Explorar <span className="text-blue-500">Portal</span></span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar pt-6">
              {/* Seção Principal (Copied from Navbar) */}
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-4 border-l-2 border-blue-500 pl-4">Menu Principal</div>
                <div className="grid grid-cols-1 gap-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href || `/categoria/${item.slug}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 group transition-all"
                    >
                      <span className="text-slate-200 text-sm font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Seção Dinâmica v2.9 */}
              {allCategories.length > 0 && (
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-4 border-l-2 border-emerald-500 pl-4">Todos os Tópicos</div>
                  <div className="grid grid-cols-2 gap-2">
                    {allCategories.slice(0, 16).map((cat) => (
                      <Link
                        key={cat.name}
                        href={`/categoria/${cat.name.toLowerCase()}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex flex-col p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800 border border-slate-800/50 transition-all group"
                      >
                        <span className="text-slate-300 text-[10px] font-bold truncate group-hover:text-emerald-400">{cat.name}</span>
                        <span className="text-[9px] text-slate-600 font-black mt-1 uppercase tracking-tighter">{cat.count} matérias</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Social */}
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-4 border-l-2 border-slate-700 pl-4">Siga a Redação</div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link href="#" className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 hover:text-white bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50 transition-all">
                    <AtSign className="w-4 h-4" /> Instagram
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 hover:text-white bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50 transition-all">
                    <ExternalLink className="w-4 h-4" /> Twitter (X)
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
               <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest text-center">Redação Tech · © 2026</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

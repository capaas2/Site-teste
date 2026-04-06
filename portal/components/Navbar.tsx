"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Sun, Moon, ExternalLink, AtSign, Rss, 
  Menu, X, ChevronRight, 
  Globe, Shield, TrendingUp, Smartphone, Rocket, Zap, 
  Car, Code, Palette, Leaf, Cpu, Mail, Loader2
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

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ posts: any[]; categories: string[] }>({ posts: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => setMounted(true), []);

  // Busca Preditiva Live v2.9.5
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          // Busca Posts
          const { data: posts } = await supabase
            .from("posts")
            .select("id, titulo, categoria")
            .ilike("titulo", `%${query}%`)
            .limit(3);

          // Busca Categorias (Baseado em posts existentes)
          const { data: categoriesData } = await supabase
            .from("posts")
            .select("categoria")
            .ilike("categoria", `%${query}%`)
            .limit(10);

          const uniqueCategories = Array.from(new Set(categoriesData?.map(c => c.categoria))).slice(0, 2);

          setSuggestions({ 
            posts: posts || [], 
            categories: uniqueCategories as string[] 
          });
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ posts: [], categories: [] });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

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
          <div className="hidden md:block flex-1 max-w-lg mx-auto relative group">
            <form onSubmit={handleSearch} className="relative">
              {isSearching ? (
                <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4 animate-spin" />
              ) : (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 w-4 h-4 transition-colors" />
              )}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Buscar no portal..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-500 border border-slate-800 focus:border-blue-500/50 focus:outline-none focus:ring-0 text-sm transition-all"
              />
            </form>

            {/* Dropdown de Resultados v2.9.5 */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {query.length < 2 ? (
                  <div className="p-4">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">Tópicos em Alta</div>
                    <div className="flex flex-wrap gap-2">
                      {["IA", "Mercado", "Cibersegurança", "Reviews", "Eletrificação"].map((topic) => (
                        <Link
                          key={topic}
                          href={`/categoria/${topic.toLowerCase()}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 hover:text-blue-400 text-xs font-bold text-slate-400 transition-all border border-slate-800"
                        >
                          {topic}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    {/* Exibe Categorias Encontradas */}
                    {suggestions.categories.length > 0 && (
                      <div className="px-2 mb-2">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-3 mb-1">Categorias</div>
                        {suggestions.categories.map((cat) => (
                          <Link
                            key={cat}
                            href={`/categoria/${cat.toLowerCase().trim()}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors group"
                          >
                            <div className="bg-slate-800 p-1.5 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-colors">
                              <ChevronRight className="w-3 h-3" />
                            </div>
                            <span className="text-xs font-bold text-slate-200">{cat}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Exibe Posts Encontrados */}
                    {suggestions.posts.length > 0 ? (
                      <div className="px-2">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-3 mb-1">Notícias</div>
                        {suggestions.posts.map((post) => (
                          <Link
                            key={post.id}
                            href={`/post/${post.id}`}
                            className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors group"
                          >
                            <span className="text-xs font-bold text-slate-200 group-hover:text-blue-500 transition-colors line-clamp-1">{post.titulo}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">{post.categoria}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      !isSearching && (
                        <div className="p-6 text-center text-slate-500 text-xs">
                          Nenhum resultado para "<span className="text-slate-300 italic">{query}</span>"
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

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

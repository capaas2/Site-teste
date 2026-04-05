"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Search, Sun, Moon, ExternalLink, AtSign, Rss, Menu, X } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  };

  const categories = ["Todas", "IA", "Gadgets", "Mercado", "Cibersegurança", "Ciência"];

  return (
    <header className="sticky top-0 z-50 bg-blue-600 shadow-lg">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-white font-extrabold text-xl tracking-tight">
          Redação<span className="text-blue-200">Tech</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-4 h-4 cursor-pointer" onClick={handleSearch} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar notícias..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-blue-500/50 text-white placeholder:text-blue-300 border border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm transition-all"
          />
        </form>

        {/* Icons Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-blue-200 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></a>
          <a href="#" className="text-blue-200 hover:text-white transition-colors"><AtSign className="w-4 h-4" /></a>
          <a href="#" className="text-blue-200 hover:text-white transition-colors"><Rss className="w-4 h-4" /></a>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-blue-200 hover:text-white transition-colors ml-1"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Category nav */}
      <nav className="hidden md:block border-t border-blue-500/50">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto py-1 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "Todas" ? "/" : `/categoria/${cat.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-1.5 text-sm text-blue-100 hover:text-white hover:bg-blue-500/50 rounded-full transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 flex flex-col gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "Todas" ? "/" : `/categoria/${cat.toLowerCase()}`}
              className="text-blue-100 hover:text-white py-1 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <div className="flex gap-4 mt-2 pt-2 border-t border-blue-600">
            <a href="#" className="text-blue-200"><ExternalLink className="w-4 h-4" /></a>
            <a href="#" className="text-blue-200"><AtSign className="w-4 h-4" /></a>
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-blue-200">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

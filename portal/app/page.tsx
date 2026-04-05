import { supabase } from "@/lib/supabase";
import { HeroGrid } from "@/components/HeroGrid";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { PostFeed } from "@/components/PostFeed";
import { FeaturedRanking } from "@/components/FeaturedRanking";
import { AdBanner } from "@/components/AdBanner";
import { Post } from "@/types/post";
import Link from "next/link";
import { Shield, TrendingUp, Zap, Smartphone, ChevronRight } from "lucide-react";

export const revalidate = 60;

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("publicado_em", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }
  return data as Post[];
}

export default async function HomePage() {
  const posts = await getPosts();
  
  // Destaques: Top 3 Mais Lidas (em memória)
  const featuredPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  
  // Últimas Notícias: Já vem por data do SQL
  const latestPosts = posts.slice(0, 6);

  // Feed Geral: O restante
  const feedPosts = posts.slice(6);

  const shortcuts = [
    { label: "Segurança", icon: Shield, color: "bg-indigo-600", slug: "ciberseguranca" },
    { label: "Mercado", icon: TrendingUp, color: "bg-emerald-600", slug: "mercado" },
    { label: "Elétricos", icon: Zap, color: "bg-amber-500", slug: "eletrificacao" },
    { label: "Reviews", icon: Smartphone, color: "bg-rose-600", slug: "produtos" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* 1. Hero Grid — Destaques e Últimas Notícias */}
      <section id="hero">
        <HeroGrid featuredPosts={featuredPosts} latestPosts={latestPosts} />
      </section>

      {/* 2. Atalhos Rápidos (Estilo TecMundo, mas c/ Design Redação Tech) */}
      <section id="shortcuts" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shortcuts.map((s) => (
          <Link
            key={s.slug}
            href={`/categoria/${s.slug}`}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${s.color} text-white shadow-lg`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="font-black uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">
                {s.label}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        ))}
      </section>

      {/* 3. Ranking Artístico das Mais Lidas */}
      <section id="ranking" className="pt-8">
        <FeaturedRanking posts={featuredPosts} />
      </section>

      {/* 3.1 Banner de Anúncio Central */}
      <AdBanner className="mt-4" />

      {/* 4. Carrossel de Categorias Adicional */}
      <CategoryCarousel />

      {/* 5. Divisor Visual */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-slate-50 dark:bg-slate-950 px-4 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Mais Conteúdo
          </span>
        </div>
      </div>

      {/* 6. Feed Geral de Notícias */}
      <PostFeed posts={feedPosts.length > 0 ? feedPosts : posts} />
    </div>
  );
}

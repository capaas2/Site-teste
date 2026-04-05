import { getTopPosts, getLatestPosts } from "@/lib/posts";
import { HeroGrid } from "@/components/HeroGrid";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { FeaturedRanking } from "@/components/FeaturedRanking";
import { AdBanner } from "@/components/AdBanner";
import Link from "next/link";
import { Shield, TrendingUp, Zap, Smartphone, ChevronRight, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  // 1. Destaques do Dia (Mais lidas das últimas 48h)
  const dailyTop = await getTopPosts(2, 3);
  
  // 2. Últimas Notícias para a Sidebar do Hero
  const { posts: latestPosts } = await getLatestPosts(1, 6);
  
  // 3. Ranking da Semana (Top 3 histórico)
  const weeklyTop = await getTopPosts(7, 3);

  // 4. Atalhos Rápidos (Seção Visual)
  const shortcuts = [
    { label: "Segurança", icon: Shield, color: "bg-indigo-600", slug: "ciberseguranca" },
    { label: "Mercado", icon: TrendingUp, color: "bg-emerald-600", slug: "mercado" },
    { label: "Elétricos", icon: Zap, color: "bg-amber-500", slug: "eletrificacao" },
    { label: "Reviews", icon: Smartphone, color: "bg-rose-600", slug: "produtos" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* 1. Hero Grid — Banner Destaque Dia + Sidebar Últimas */}
      <section id="hero">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 italic">
            Bombando Hoje
          </h2>
          <Link href="/mais-lidas" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
            Ver Ranking Completo <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <HeroGrid featuredPosts={dailyTop} latestPosts={latestPosts} />
      </section>

      {/* 2. Atalhos Rápidos */}
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

      {/* 3. Ranking Artístico — Sucesso da Semana */}
      <section id="ranking" className="pt-8 bg-slate-100/50 dark:bg-slate-900/30 -mx-4 px-4 py-16 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
           <FeaturedRanking posts={weeklyTop} />
        </div>
      </section>

      {/* 4. Banner de Anúncio Central */}
      <AdBanner className="mt-4" />

      {/* 5. Carrossel de Categorias e Feed de Exploração */}
      <section className="space-y-10">
        <CategoryCarousel />

        <div className="flex flex-col items-center justify-center py-12 px-6 bg-blue-600 rounded-[2rem] text-white text-center space-y-6 shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
           {/* Efeito Visual de Fundo */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
           
           <h3 className="text-2xl md:text-3xl font-black italic tracking-tight relative z-10">
             QUER VER TODAS AS <span className="text-blue-200">ÚLTIMAS NOTÍCIAS?</span>
           </h3>
           <p className="text-blue-100 max-w-md text-sm font-medium relative z-10">
             Não perca nada do que acontece no mundo da tecnologia. Acesse nosso feed completo e atualizado em tempo real.
           </p>
           <Link 
             href="/ultimas"
             className="relative z-10 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 hover:shadow-xl transition-all active:scale-95"
           >
             Acessar Feed Completo <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      {/* 6. Divisor Visual Minimalista no final */}
      <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-30">
            Fim do Destaques
          </span>
      </div>
    </div>
  );
}

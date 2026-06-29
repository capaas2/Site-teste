import { getTopPosts, getLatestPosts } from "@/lib/posts";
import { HeroGrid } from "@/components/HeroGrid";
import { FeaturedRanking } from "@/components/FeaturedRanking";
import { AdBanner } from "@/components/AdBanner";
import Link from "next/link";
import { Shield, Zap, Laptop, ChevronRight, ArrowRight, Cpu } from "lucide-react";
import { headers } from "next/headers";
import { getTranslation } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
  };

  // Executa todas as consultas de banco de dados em paralelo para evitar o waterfall e reduzir o TTFB/LCP no mobile
  const [dailyTopRaw, latestResult, weeklyTopRaw] = await Promise.all([
    getTopPosts(2, 3, locale),
    getLatestPosts(1, 12, locale),
    getTopPosts(7, 6, locale)
  ]);
  
  // Deduplicação: remove posts que já aparecem em seções anteriores
  const dailyTop = dailyTopRaw;
  const usedIds = new Set(dailyTop.map(p => p.id));
  
  const latestPosts = latestResult.posts
    .filter(p => !usedIds.has(p.id))
    .slice(0, 6);
  latestPosts.forEach(p => usedIds.add(p.id));
  
  const weeklyTop = weeklyTopRaw
    .filter(p => !usedIds.has(p.id))
    .slice(0, 3);

  // 4. Atalhos Rápidos (Seção Visual)
  const shortcuts = [
    { 
      label: locale === "pt" ? "Segurança" : locale === "en" ? "Security" : "Seguridad", 
      icon: Shield, 
      color: "bg-indigo-600", 
      slug: "cibersegurança" 
    },
    { 
      label: locale === "pt" ? "Ciência" : locale === "en" ? "Science" : "Ciencia", 
      icon: Cpu, 
      color: "bg-emerald-600", 
      slug: "ciencia" 
    },
    { 
      label: locale === "pt" ? "Elétricos" : locale === "en" ? "Electrics" : "Eléctricos", 
      icon: Zap, 
      color: "bg-amber-500", 
      slug: "eletrificacao" 
    },
    { 
      label: locale === "pt" ? "Hardware" : locale === "en" ? "Hardware" : "Hardware", 
      icon: Laptop, 
      color: "bg-rose-600", 
      slug: "hardware" 
    },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://folhabyte.dev";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "FolhaByte",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/busca?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "FolhaByte",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.ico`
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {/* 1. Hero Grid — Banner Destaque Dia + Sidebar Últimas */}
      <section id="hero">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 italic">
            {getTranslation(locale, "hot_today")}
          </h2>
          <Link href={getLocalizedHref("/mais-lidas")} className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
            {getTranslation(locale, "view_full_ranking")} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <HeroGrid featuredPosts={dailyTop} latestPosts={latestPosts} locale={locale} />
      </section>

      {/* 2. Atalhos Rápidos */}
      <section id="shortcuts" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shortcuts.map((s) => (
          <Link
            key={s.slug}
            href={getLocalizedHref(`/categoria/${s.slug}`)}
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

      {/* 5. Feed de Exploração */}
      <section className="space-y-10">
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-blue-600 rounded-[2rem] text-white text-center space-y-6 shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
           {/* Efeito Visual de Fundo */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
           
           <h3 className="text-2xl md:text-3xl font-black italic tracking-tight relative z-10 uppercase">
             {getTranslation(locale, "want_to_see_all")} <span className="text-blue-200">{getTranslation(locale, "latest_news_caps")}</span>
           </h3>
           <p className="text-blue-100 max-w-md text-sm font-medium relative z-10">
             {getTranslation(locale, "feed_desc")}
           </p>
           <Link 
             href={getLocalizedHref("/ultimas")}
             className="relative z-10 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 hover:shadow-xl transition-all active:scale-95"
           >
             {getTranslation(locale, "access_full_feed")} <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      {/* 6. Divisor Visual Minimalista no final */}
      <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-30">
            {getTranslation(locale, "end_of_highlights")}
          </span>
      </div>
    </div>
  );
}

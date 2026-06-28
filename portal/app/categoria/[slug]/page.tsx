import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Metadata } from "next";
import { getTranslation } from "@/lib/translations";
import { notFound } from "next/navigation";

const categoryMetadataMap: Record<string, { titlePt: string; descPt: string }> = {
  "ia-software": {
    titlePt: "IA & Software: O Futuro do Desenvolvimento",
    descPt: "Acompanhe as últimas inovações em Inteligência Artificial, redes neurais, grandes modelos de linguagem (LLMs) e o impacto do software no futuro da sociedade."
  },
  "ia": {
    titlePt: "Inteligência Artificial (IA): Tecnologia e Futuro",
    descPt: "Acompanhe as últimas inovações em Inteligência Artificial, redes neurais, grandes modelos de linguagem (LLMs) e o impacto do software no futuro da sociedade."
  },
  "eletrificacao": {
    titlePt: "Eletrificação: Baterias e Mobilidade Elétrica",
    descPt: "Descubra o futuro da mobilidade elétrica: baterias de estado sólido, infraestrutura de recarga, carros elétricos inovadores e transição energética."
  },
  "mobilidade": {
    titlePt: "Mobilidade: O Futuro dos Transportes",
    descPt: "Tudo sobre o futuro dos transportes, veículos autônomos, aviação sustentável, micromobilidade urbana e inovações logísticas de alta tecnologia."
  },
  "ciencia": {
    titlePt: "Ciência: Computação Quântica, Medicina e Espaço",
    descPt: "Explore as fronteiras do conhecimento humano: computação quântica, avanços na medicina, biotecnologia, exploração espacial e descobertas científicas revolucionárias."
  },
  "cibersegurança": {
    titlePt: "Segurança e Cibersegurança: Proteção na Era Digital",
    descPt: "Análises aprofundadas sobre proteção de dados, ameaças cibernéticas, criptografia quântica, segurança de redes e a privacidade na era da superinteligência."
  },
  "sustentabilidade": {
    titlePt: "Sustentabilidade e Tecnologias Verdes",
    descPt: "Tecnologia a favor do planeta: painéis solares de perovskita, hidrogênio verde, captura de carbono e inovações industriais ecológicas de alta performance."
  },
  "tecnologia": {
    titlePt: "Tecnologia, Processadores e Semicondutores",
    descPt: "A cobertura definitiva do ecossistema de hardware, novos processadores, semicondutores e as grandes tendências que movimentam o mercado tecnológico global."
  },
  "hardware": {
    titlePt: "Hardware: Processadores, Placas de Vídeo e Gadgets",
    descPt: "Acompanhe as últimas novidades, análises e tendências sobre computadores, processadores, placas de vídeo, dispositivos móveis e inovações em hardware."
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const normalizedSlug = slug.toLowerCase().trim();

  const customMeta = categoryMetadataMap[normalizedSlug];

  let title = "";
  let description = "";

  if (customMeta) {
    title = `${customMeta.titlePt} | FolhaByte`;
    description = customMeta.descPt;
  } else {
    title = `Notícias sobre ${decodedSlug} | FolhaByte`;
    description = `Fique atualizado com as últimas matérias, análises e novidades sobre ${decodedSlug} no portal FolhaByte.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/categoria/${slug}`,
    },
  };
}

export const revalidate = 60;

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  
  const locale = "pt";

  const getLocalizedHref = (href: string) => {
    return href;
  };

  const decodedSlug = decodeURIComponent(slug);
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 12;

  const { posts, count } = await getPostsByCategory(decodedSlug, currentPage, pageSize);

  if (count === 0) {
    notFound();
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              {getTranslation(locale, "category_label")} <span className="text-indigo-600">{decodedSlug}</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {getTranslation(locale, "explore_archive")} {decodedSlug}
            </p>
          </div>
        </div>

        <nav className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href={getLocalizedHref("/")} className="hover:text-indigo-600">{getTranslation(locale, "home")}</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-slate-900 dark:text-white">{decodedSlug}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} locale={locale} />
            {(index + 1) % 6 === 0 && (
              <div className="col-span-full py-8">
                <AdBanner format="fluid" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalCount={count}
        pageSize={pageSize}
        baseUrl={getLocalizedHref(`/categoria/${slug}`)}
      />

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">{getTranslation(locale, "no_category_posts")}</p>
          <Link href={getLocalizedHref("/")} className="mt-4 inline-block text-indigo-600 font-bold uppercase tracking-widest text-xs">{getTranslation(locale, "back_to_home")}</Link>
        </div>
      )}
    </div>
  );
}

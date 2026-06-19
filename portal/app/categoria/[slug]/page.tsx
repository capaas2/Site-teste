import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslation } from "@/lib/translations";
import { notFound } from "next/navigation";

const categoryMetadataMap: Record<string, { titlePt: string; titleEn: string; titleEs: string; descPt: string; descEn: string; descEs: string }> = {
  "ia-software": {
    titlePt: "IA & Software: O Futuro do Desenvolvimento",
    titleEn: "AI & Software: The Future of Development",
    titleEs: "IA y Software: El Futuro del Desarrollo",
    descPt: "Acompanhe as últimas inovações em Inteligência Artificial, redes neurais, grandes modelos de linguagem (LLMs) e o impacto do software no futuro da sociedade.",
    descEn: "Follow the latest innovations in Artificial Intelligence, neural networks, LLMs, and the impact of software on the future of society.",
    descEs: "Siga las últimas innovaciones en Inteligencia Artificial, redes neuronales, modelos de lenguaje (LLM) y el impacto del software en el futuro."
  },
  "ia": {
    titlePt: "Inteligência Artificial (IA): Tecnologia e Futuro",
    titleEn: "Artificial Intelligence (AI): Technology & Future",
    titleEs: "Inteligencia Artificial (IA): Tecnología y Futuro",
    descPt: "Acompanhe as últimas inovações em Inteligência Artificial, redes neurais, grandes modelos de linguagem (LLMs) e o impacto do software no futuro da sociedade.",
    descEn: "Follow the latest innovations in Artificial Intelligence, neural networks, LLMs, and the impact of software on the future of society.",
    descEs: "Siga las últimas innovaciones en Inteligencia Artificial, redes neuronales, modelos de lenguaje (LLM) y el impacto del software en el futuro."
  },
  "eletrificacao": {
    titlePt: "Eletrificação: Baterias e Mobilidade Elétrica",
    titleEn: "Electrification: Batteries & Electric Mobility",
    titleEs: "Electrificación: Baterías y Movilidad Eléctrica",
    descPt: "Descubra o futuro da mobilidade elétrica: baterias de estado sólido, infraestrutura de recarga, carros elétricos inovadores e transição energética.",
    descEn: "Discover the future of electric mobility: solid-state batteries, charging infrastructure, innovative EVs, and the energy transition.",
    descEs: "Descubra el futuro de la movilidad eléctrica: baterías de estado sólido, infraestructura de carga, vehículos eléctricos innovadores y transición energética."
  },
  "mobilidade": {
    titlePt: "Mobilidade: O Futuro dos Transportes",
    titleEn: "Mobility: The Future of Transportation",
    titleEs: "Movilidad: El Futuro del Transporte",
    descPt: "Tudo sobre o futuro dos transportes, veículos autônomos, aviação sustentável, micromobilidade urbana e inovações logísticas de alta tecnologia.",
    descEn: "All about the future of transportation, autonomous vehicles, sustainable aviation, urban micro-mobility, and high-tech logistical innovations.",
    descEs: "Todo sobre el futuro del transporte, vehículos autónomos, aviación sostenible, micromovilidad urbana e innovaciones logísticas de alta tecnología."
  },
  "ciencia": {
    titlePt: "Ciência: Computação Quântica, Medicina e Espaço",
    titleEn: "Science: Quantum Computing, Medicine & Space",
    titleEs: "Ciencia: Computación Cuántica, Medicina y Espacio",
    descPt: "Explore as fronteiras do conhecimento humano: computação quântica, avanços na medicina, biotecnologia, exploração espacial e descobertas científicas revolucionárias.",
    descEn: "Explore the frontiers of human knowledge: quantum computing, medical breakthroughs, biotechnology, space exploration, and revolutionary scientific discoveries.",
    descEs: "Explore las fronteras del conocimiento humano: computación cuántica, avances médicos, biotecnología, exploración espacial y descubrimientos científicos revolucionarios."
  },
  "cibersegurança": {
    titlePt: "Segurança e Cibersegurança: Proteção na Era Digital",
    titleEn: "Security & Cybersecurity: Digital Protection",
    titleEs: "Seguridad y Ciberseguridad: Protección Digital",
    descPt: "Análises aprofundadas sobre proteção de dados, ameaças cibernéticas, criptografia quântica, segurança de redes e a privacidade na era da superinteligência.",
    descEn: "In-depth analysis of data protection, cyber threats, quantum cryptography, network security, and privacy in the era of superintelligence.",
    descEs: "Análisis profundos sobre protección de datos, amenazas cibernéticas, criptografía cuántica, seguridad de redes y privacidad en la era de la superinteligencia."
  },
  "sustentabilidade": {
    titlePt: "Sustentabilidade e Tecnologias Verdes",
    titleEn: "Sustainability & Green Technologies",
    titleEs: "Sustentabilidad y Tecnologías Verdes",
    descPt: "Tecnologia a favor do planeta: painéis solares de perovskita, hidrogênio verde, captura de carbono e inovações industriais ecológicas de alta performance.",
    descEn: "Technology working for the planet: perovskite solar panels, green hydrogen, carbon capture, and high-performance ecological industrial innovations.",
    descEs: "Tecnología a favor del planeta: paneles solares de perovskita, hidrógeno verde, captura de carbono e innovaciones industriales ecológicas de alto rendimiento."
  },
  "tecnologia": {
    titlePt: "Tecnologia, Processadores e Semicondutores",
    titleEn: "Technology, Processors & Semiconductors",
    titleEs: "Tecnología, Procesadores y Semicondutores",
    descPt: "A cobertura definitiva do ecossistema de hardware, novos processadores, semicondutores e as grandes tendências que movimentam o mercado tecnológico global.",
    descEn: "Definitive coverage of the hardware ecosystem, new processors, semiconductors, and the major trends driving the global tech market.",
    descEs: "La cobertura definitiva del ecosistema de hardware, nuevos procesadores, semiconductores y las grandes tendencias del mercado tecnológico global."
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
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const customMeta = categoryMetadataMap[normalizedSlug];

  let title = "";
  let description = "";

  if (customMeta) {
    if (locale === "en") {
      title = `${customMeta.titleEn} | FolhaByte`;
      description = customMeta.descEn;
    } else if (locale === "es") {
      title = `${customMeta.titleEs} | FolhaByte`;
      description = customMeta.descEs;
    } else {
      title = `${customMeta.titlePt} | FolhaByte`;
      description = customMeta.descPt;
    }
  } else {
    title = `Notícias sobre ${decodedSlug} | FolhaByte`;
    description = `Fique atualizado com as últimas matérias, análises e novidades sobre ${decodedSlug} no portal FolhaByte.`;

    if (locale === "en") {
      title = `News about ${decodedSlug} | FolhaByte`;
      description = `Stay updated with the latest articles, analysis, and news about ${decodedSlug} on FolhaByte.`;
    } else if (locale === "es") {
      title = `Noticias sobre ${decodedSlug} | FolhaByte`;
      description = `Mantente actualizado con los últimos artículos, análisis y novedades sobre ${decodedSlug} en el portal FolhaByte.`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/categoria/${slug}`,
      languages: {
        "pt-BR": `/categoria/${slug}`,
        "en": `/en/categoria/${slug}`,
        "es": `/es/categoria/${slug}`,
      }
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
  
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
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

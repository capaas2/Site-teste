import { Rocket, Target, ShieldCheck, Sparkles } from "lucide-react";
import { Metadata } from "next";
import { getAllAuthors } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Quem Somos | FolhaByte",
  description: "Saiba mais sobre a missão do FolhaByte: decodificar a tecnologia que molda o futuro com inteligência, curadoria humana e precisão editorial.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function AboutPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://folhabyte.dev";
  const authors = getAllAuthors();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "FolhaByte",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      },
      "description": "Saiba mais sobre a missão do FolhaByte: decodificar a tecnologia que molda o futuro com inteligência, curadoria humana e precisão editorial."
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase mb-6">
          Nossa <span className="text-blue-600">Missão</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          A FolhaByte nasceu para separar o sinal do ruído. Em um mundo saturado de informações superficiais,
          nossa missão é decodificar as inovações tecnológicas que realmente importam — com profundidade,
          contexto e visão de mercado.
        </p>
      </div>

      {/* Missão e Visão */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">O Propósito</h3>
          <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
            Simplificar o complexo. Traduzimos as inovações que moldam o amanhã em conteúdo direto,
            técnico e com visão de mercado. Cada artigo é pensado para informar quem quer entender
            o impacto real da tecnologia na sociedade, nos negócios e no dia a dia.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">A Visão</h3>
          <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
            Ser a referência em jornalismo tecnológico de alta performance no Brasil.
            Queremos inspirar profissionais, entusiastas e tomadores de decisão com análises
            que vão além da manchete — entregando o contexto que falta na cobertura tradicional.
          </p>
        </div>
      </div>

      {/* Quem Somos - Texto expandido */}
      <div className="prose prose-blue dark:prose-invert max-w-none mb-20">
        <h2 className="italic font-black text-2xl uppercase tracking-tight">Quem Somos</h2>
        <p>
          A FolhaByte é um portal independente de jornalismo tecnológico fundado em 2026,
          com sede em São Paulo. Reunimos uma equipe de jornalistas, engenheiros e pesquisadores
          que compartilham uma obsessão em comum: entender e explicar como a tecnologia está
          redesenhando o mundo.
        </p>
        <p>
          Em uma internet dominada por clickbait e conteúdo superficial, escolhemos o caminho
          oposto. Cada matéria publicada no FolhaByte passa por um rigoroso processo de pesquisa
          e validação. Não nos limitamos a reproduzir press releases — nós investigamos,
          contextualizamos e analisamos o impacto econômico, social e prático de cada inovação.
        </p>
        <p>
          Cobrimos desde inteligência artificial e computação quântica até nanotecnologia,
          energia limpa e cibersegurança. Nossa cobertura é guiada por uma pergunta central:
          <strong>&ldquo;O que isso significa para o leitor?&rdquo;</strong>
        </p>

        <div className="bg-blue-600/5 dark:bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl my-10 flex items-start gap-6">
          <ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic m-0">Compromisso Editorial</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 m-0 leading-relaxed">
              Independência e precisão. Todos os nossos fatos são verificados e nossas opiniões são fundamentadas em dados concretos de mercado.
              Utilizamos ferramentas de Inteligência Artificial como apoio na pesquisa e estruturação, mas cada publicação é revisada e validada
              pela nossa equipe editorial.
            </p>
          </div>
        </div>
      </div>

      {/* Equipe Editorial */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Equipe
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">
            Quem <span className="text-blue-600">Faz</span> o FolhaByte
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.name}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${author.color} flex items-center justify-center mb-6 shadow-lg`}>
                <span className="text-white font-black text-lg tracking-tight">
                  {author.initials}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tight mb-1">
                {author.name}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 mb-4">
                {author.role}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

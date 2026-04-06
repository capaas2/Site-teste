import { Info, Rocket, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase mb-6">
          Nossa <span className="text-blue-600">Missão</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          A FolhaByte nasceu para separar o sinal do ruído. Movidos por uma arquitetura inédita que combina curadoria humana e o poder da Inteligência Artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">O Propósito</h3>
          <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
            Simplificar o complexo. Traduzimos as inovações que moldam o amanhã em conteúdo direto, técnico e com visão de mercado.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">A Visão</h3>
          <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
            Ser a fonte #1 de inspiração e dados para profissionais e entusiastas que não querem apenas assistir ao futuro, mas construí-lo.
          </p>
        </div>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h2 className="italic font-black text-2xl uppercase tracking-tight">Quem Somos</h2>
        <p>
          A FolhaByte nasceu para separar o sinal do ruído. Movidos por uma arquitetura inédita que combina curadoria humana e o poder de agentes de Inteligência Artificial, nós utilizamos tecnologia de ponta para entregar a notícia exata, em tempo real.
        </p>
        <p>
          Em uma internet saturada de informações rasas, o nosso diferencial é o contexto. Nós não cobrimos apenas a ficha técnica de um novo lançamento; nós decodificamos a tecnologia, analisando o impacto econômico, social e prático que cada inovação traz para a sua vida.
        </p>
        
        <div className="bg-blue-600/5 dark:bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl my-10 flex items-start gap-6">
           <ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
           <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic m-0">Compromisso Editorial</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 m-0 leading-relaxed">
                Independência e precisão. Todos os nossos fatos são verificados e nossas opiniões são fundamentadas em dados concretos de mercado.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

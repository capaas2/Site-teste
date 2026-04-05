import { BarChart3, Users, Globe, Mail, CheckCircle2 } from "lucide-react";

export default function AdvertisePage() {
  const stats = [
    { label: "Leitores Mensais", value: "50k+", icon: Users, color: "bg-blue-600" },
    { label: "Visualizações", value: "200k+", icon: BarChart3, color: "bg-indigo-600" },
    { label: "Presença Global", value: "12+", icon: Globe, color: "bg-emerald-600" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase mb-6 leading-none">
          Alcance o <span className="text-indigo-600 underline decoration-8 decoration-indigo-600/30">Futuro</span> Agora
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Conecte sua marca à audiência mais qualificada em tecnologia e inovação do Brasil. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center shadow-sm">
             <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <s.icon className="w-7 h-7 text-white" />
             </div>
             <span className="text-3xl font-black text-slate-900 dark:text-white italic">{s.value}</span>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-950 rounded-[3rem] p-10 md:p-16 text-white mb-20 overflow-hidden relative">
        {/* Efeito Visual */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-3xl -mr-20 -mt-20 rounded-full" />
        
        <div className="space-y-8 relative z-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tight">Formatos <br/><span className="text-indigo-400 font-black">Disponíveis</span></h2>
          <ul className="space-y-5">
            {[
              "Banners Premium (Home & Artigos)",
              "Publieditoriais Estratégicos",
              "Patrocínio de Newsletter",
              "Ações de Branded Content",
              "Reviews de Produtos"
            ].map((f) => (
              <li key={f} className="flex items-center gap-4 text-slate-400 font-medium">
                 <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                 {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] relative z-10">
           <h3 className="text-xl font-black uppercase italic tracking-tight mb-4">Solicite nosso <br/>Media Kit</h3>
           <p className="text-sm text-slate-400 mb-8 leading-relaxed">
             Entre em contato para receber dados detalhados da nossa audiência e tabelas de investimento.
           </p>
           <a 
             href="mailto:anuncie@redacaotech.com.br"
             className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all active:scale-95"
           >
              Falar com Comercial <Mail className="w-4 h-4" />
           </a>
        </div>
      </div>
    </div>
  );
}

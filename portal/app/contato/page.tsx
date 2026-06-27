import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale Conosco | FolhaByte",
  description: "Entre em contato com as equipes editorial, de redação ou comercial do portal FolhaByte.",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase mb-6">
          Fale <span className="text-emerald-600 underline">Direto</span> com a Gente
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Dúvidas, sugestões ou parcerias? Nossa equipe está pronta para te ouvir.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Canais de Contato */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Mail className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">E-mail Geral</h3>
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white italic">contatofolhabyte@gmail.com</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <MessageSquare className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Redação</h3>
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white italic">contatofolhabyte@gmail.com</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <MapPin className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Escritório</h3>
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white italic">Rua Funchal, 418</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Vila Olímpia — São Paulo, SP</p>
          </div>
        </div>

        {/* Formulário Simples */}
        <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-900/50 p-10 md:p-16 rounded-[3rem] border border-slate-200 dark:border-slate-800">
           <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seu Nome</label>
                    <input type="text" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all shadow-sm" placeholder="Ex: Seu Nome completo" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seu E-mail</label>
                    <input type="email" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all shadow-sm" placeholder="Ex: vc@dominio.com" required />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensagem</label>
                 <textarea rows={6} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all shadow-sm" placeholder="Como podemos ajudar?" required />
              </div>
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-3"
              >
                 Enviar Mensagem <Send className="w-4 h-4" />
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}

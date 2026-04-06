import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
          Inscrição Confirmada!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Obrigado por confirmar seu e-mail. Agora você faz parte da nossa elite e receberá as notícias primeiro.
        </p>
        <div className="pt-6">
          <Link 
            href="/"
            className="inline-block bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform"
          >
            Voltar ao Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

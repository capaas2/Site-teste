"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulação de inscrição (Resend/Supabase integrados no futuro)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 group focus-within:border-blue-500/30 transition-all">
      <p className="text-[10px] font-black text-blue-400 mb-2 uppercase tracking-[0.2em] text-center">
        Newsletter Semanal
      </p>
      
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-2 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1" />
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Inscrito!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail..."
              required
              disabled={status === "loading"}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-black uppercase tracking-widest text-[9px] py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>Inscrever <Send className="w-3 h-3" /></>
            )}
          </button>
        </form>
      )}
      
      {status !== "success" && (
        <p className="text-[9px] text-slate-500 text-center mt-3 leading-tight">
          Cancele quando quiser. <br/>Não enviamos spam.
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post";
import { formatPostTime } from "@/lib/date-utils";
import { Clock } from "lucide-react";

interface SidebarProps {
  posts: Post[];
}

export function Sidebar({ posts }: SidebarProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Inscrição realizada!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo deu errado.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <aside className="space-y-6">
      {/* Mais Lidas */}
      <div className="bg-blue-600 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-500/20">
        <div className="px-6 py-5 border-b border-blue-500/50">
          <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] italic">
            🔥 Mais Lidas
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {posts.slice(0, 5).map((post: Post, index: number) => (
            <Link key={post.id} href={`/post/${post.id}`} className="flex gap-4 group items-start">
              <span className="text-4xl font-black text-blue-300/20 leading-none w-10 flex-shrink-0 italic group-hover:text-white/50 transition-colors">
                {index + 1}
              </span>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-blue-200/60 uppercase tracking-widest flex items-center gap-1">
                   <Clock className="w-2.5 h-2.5" /> {formatPostTime(post.publicado_em)}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-blue-100 transition-colors line-clamp-3 leading-snug italic tracking-tight">
                  {post.titulo}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-1">Newsletter</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Receba as principais notícias de tech toda manhã no seu e-mail.
        </p>
        
        {status === "success" ? (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl text-sm font-bold animate-in fade-in zoom-in">
            ✅ {message}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
            <button 
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              {status === "loading" ? "Processando..." : "Assinar Gratuitamente"}
            </button>
            {status === "error" && (
              <p className="text-xs text-rose-500 font-semibold px-1">{message}</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

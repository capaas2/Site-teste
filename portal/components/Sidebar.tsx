"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post";

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
        const detailMessage = data.details ? ` (${data.details})` : "";
        setMessage((data.error || "Algo deu errado.") + detailMessage);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <aside className="space-y-6">
      {/* Mais Lidas */}
      <div className="bg-blue-600 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-blue-500/50">
          <h3 className="text-white font-black text-sm uppercase tracking-widest">
            🔥 Mais Lidas
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {posts.slice(0, 5).map((post, index) => (
            <Link key={post.id} href={`/post/${post.id}`} className="flex gap-3 group">
              <span className="text-3xl font-black text-blue-300/40 leading-none w-8 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm font-bold text-white group-hover:text-blue-100 transition-colors line-clamp-3 leading-snug">
                {post.titulo}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-1">Newsletter</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Receba as principais notícias de tech toda manhã.
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
              className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              {status === "loading" ? "Processando..." : "Assinar Grátis"}
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

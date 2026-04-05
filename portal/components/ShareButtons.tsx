"use client";

import { AtSign, Globe, Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  titulo: string;
  url?: string;
}

export function ShareButtons({ titulo, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const pageUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(titulo);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        Compartilhar:
      </span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors"
      >
        <Share2 className="w-3 h-3" /> WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
      >
        <AtSign className="w-3 h-3" /> X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors"
      >
        <Globe className="w-3 h-3" /> Facebook
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 text-xs font-semibold transition-colors"
      >
        {copied ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}

import React from "react";
import { Sparkles, Check } from "lucide-react";

interface KeyPointsProps {
  rawContent: string;
}

export default function KeyPoints({ rawContent }: KeyPointsProps) {
  const items = rawContent
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (items.length === 0) return null;

  return (
    <div className="my-8 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-slate-900/50 dark:to-slate-950/30 border border-blue-100/80 dark:border-slate-800/80 shadow-sm relative overflow-hidden not-prose">
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/10">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 m-0">
          Pontos-Chave
        </h4>
      </div>

      <ul className="space-y-3.5 m-0 p-0 list-none relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mt-0.5 shadow-sm">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

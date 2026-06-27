import React from "react";
import { Cpu } from "lucide-react";

interface TechnicalSpecsProps {
  rawContent: string;
}

interface SpecItem {
  label: string;
  value: string;
}

export default function TechnicalSpecs({ rawContent }: TechnicalSpecsProps) {
  const items: SpecItem[] = rawContent
    .split("|")
    .map((item) => {
      const parts = item.split("-");
      const label = parts[0]?.trim() || "";
      const value = parts.slice(1).join("-").trim() || "";
      return { label, value };
    })
    .filter((item) => item.label.length > 0 && item.value.length > 0);

  if (items.length === 0) return null;

  return (
    <div className="my-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm not-prose">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/10">
          <Cpu className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 m-0">
          Ficha Técnica & Especificações
        </h4>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row p-5 gap-1.5 sm:gap-6 hover:bg-slate-50/40 dark:hover:bg-slate-900/40 transition-colors">
            <span className="w-full sm:w-1/3 font-black text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 flex-shrink-0 self-center">
              {item.label}
            </span>
            <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

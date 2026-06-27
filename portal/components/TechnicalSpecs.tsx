import React from "react";

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
    <div className="my-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/10 overflow-hidden shadow-sm not-prose">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 m-0">
          Especificações Técnicas
        </h4>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row p-4 gap-1.5 sm:gap-6 hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors">
            <span className="w-full sm:w-1/3 font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-550 flex-shrink-0 self-center">
              {item.label}
            </span>
            <span className="font-bold text-sm text-slate-700 dark:text-slate-300 leading-snug">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

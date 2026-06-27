import React from "react";

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
    <div className="my-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/30 border-l-4 border-l-blue-600 border-y border-r border-slate-200/60 dark:border-slate-800/80 shadow-sm not-prose">
      <div className="flex items-center gap-2 mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-550 dark:text-slate-400">
          Pontos-Chave
        </h4>
      </div>

      <ul className="space-y-3 m-0 p-0 list-none">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

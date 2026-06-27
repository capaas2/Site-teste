import React from "react";

interface TimelineProps {
  rawContent: string;
}

interface TimelineItem {
  date: string;
  description: string;
}

export default function Timeline({ rawContent }: TimelineProps) {
  const items: TimelineItem[] = rawContent
    .split("|")
    .map((item) => {
      const parts = item.split("-");
      const date = parts[0]?.trim() || "";
      const description = parts.slice(1).join("-").trim() || "";
      return { date, description };
    })
    .filter((item) => item.date.length > 0 && item.description.length > 0);

  if (items.length === 0) return null;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 shadow-sm not-prose relative">
      <div className="flex items-center gap-2 mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-550 dark:text-slate-400">
          Linha do Tempo / Cronologia
        </h4>
      </div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3.5 pl-6 sm:pl-8 space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-850 border border-slate-350 dark:border-slate-700 flex items-center justify-center shadow-sm" />
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {item.date}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium m-0">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

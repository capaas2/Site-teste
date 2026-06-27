import React from "react";
import { Calendar } from "lucide-react";

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
    <div className="my-10 p-6 sm:p-8 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 not-prose relative">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/10">
          <Calendar className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 m-0">
          Evolução Cronológica
        </h4>
      </div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3.5 pl-6 sm:pl-8 space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[43px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-xl bg-white dark:bg-slate-950 border-2 border-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/5 group-hover:scale-110 transition-transform">
              <span className="w-2.5 h-2.5 rounded-lg bg-indigo-500" />
            </span>
            
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {item.date}
              </span>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium m-0">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

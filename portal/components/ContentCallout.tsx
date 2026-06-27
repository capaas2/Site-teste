import React from "react";

interface ContentCalloutProps {
  rawContent: string;
  variant: "context" | "challenges" | "milestones";
}

export default function ContentCallout({ rawContent, variant }: ContentCalloutProps) {
  const isList = rawContent.includes("|");
  const items = isList
    ? rawContent.split("|").map((i) => i.trim()).filter((i) => i.length > 0)
    : [rawContent.trim()];

  if (items.length === 0 || (items.length === 1 && !items[0])) return null;

  const configs = {
    context: {
      title: "Contexto",
      borderClass: "border-l-4 border-l-blue-600 border-y border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/30",
      titleColor: "text-blue-600 dark:text-blue-400"
    },
    challenges: {
      title: "Desafios Técnicos",
      borderClass: "border-l-4 border-l-amber-500 border-y border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/30",
      titleColor: "text-amber-600 dark:text-amber-400"
    },
    milestones: {
      title: "Marcos & Evolução",
      borderClass: "border-l-4 border-l-indigo-500 border-y border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/30",
      titleColor: "text-indigo-600 dark:text-indigo-400"
    },
  };

  const config = configs[variant];

  return (
    <div className={`my-8 p-6 rounded-xl ${config.borderClass} shadow-sm not-prose`}>
      <div className="flex items-center gap-2 mb-4">
        <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.titleColor}`}>
          {config.title}
        </h4>
      </div>

      {isList ? (
        <ul className="space-y-3 m-0 p-0 list-none">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-650 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-medium m-0">
          {items[0]}
        </p>
      )}
    </div>
  );
}

import React from "react";
import { Info, AlertTriangle, ArrowRightCircle, Check } from "lucide-react";

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
      title: "Contexto Histórico",
      icon: Info,
      colorClass: "from-blue-50/50 to-indigo-50/30 dark:from-slate-900/40 dark:to-indigo-950/10 border-blue-100/60 dark:border-blue-900/30 text-blue-600 dark:text-blue-400",
      bgGrad: "bg-blue-600",
    },
    challenges: {
      title: "Desafios Técnicos",
      icon: AlertTriangle,
      colorClass: "from-amber-50/50 to-orange-50/30 dark:from-slate-900/40 dark:to-orange-950/10 border-amber-100/60 dark:border-amber-900/30 text-amber-600 dark:text-amber-400",
      bgGrad: "bg-amber-500",
    },
    milestones: {
      title: "Próximos Passos & Marcos",
      icon: ArrowRightCircle,
      colorClass: "from-purple-50/50 to-indigo-50/30 dark:from-slate-900/40 dark:to-purple-950/10 border-purple-100/60 dark:border-purple-900/30 text-purple-600 dark:text-purple-400",
      bgGrad: "bg-purple-600",
    },
  };

  const config = configs[variant];
  const Icon = config.icon;

  return (
    <div className={`my-8 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br ${config.colorClass} border shadow-sm relative overflow-hidden not-prose`}>
      {/* Decorative gradient blur */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${config.bgGrad}/5 rounded-full blur-2xl pointer-events-none`} />

      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <div className={`p-2 ${config.bgGrad} rounded-xl text-white shadow-md shadow-slate-950/5`}>
          <Icon className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 m-0">
          {config.title}
        </h4>
      </div>

      {isList ? (
        <ul className="space-y-3.5 m-0 p-0 list-none relative z-10">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full ${config.bgGrad}/10 text-slate-850 dark:text-slate-200 flex items-center justify-center mt-0.5 shadow-sm`}>
                <Check className="w-3.5 h-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-medium m-0 relative z-10">
          {items[0]}
        </p>
      )}
    </div>
  );
}

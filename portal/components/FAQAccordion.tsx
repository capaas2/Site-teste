import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  rawContent: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ rawContent }: FAQAccordionProps) {
  const items: FAQItem[] = rawContent
    .split("|")
    .map((item) => {
      const parts = item.split("?");
      const question = parts[0]?.trim() ? `${parts[0].trim()}?` : "";
      const answer = parts.slice(1).join("?").trim() || "";
      return { question, answer };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);

  if (items.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div className="my-12 p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 not-prose relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="flex items-center gap-2.5 mb-6 relative z-10">
        <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-500/10">
          <HelpCircle className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 m-0">
          Perguntas Frequentes
        </h4>
      </div>

      <div className="space-y-4 relative z-10">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer focus:outline-none transition-all select-none">
              <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">
                {item.question}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0" />
            </summary>
            <div className="px-5 pb-5 pt-1 border-t border-slate-100/50 dark:border-slate-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed m-0 font-medium">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

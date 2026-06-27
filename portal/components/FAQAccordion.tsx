import React from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="my-10 py-8 border-t border-b border-slate-200/80 dark:border-slate-800/80 not-prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="flex items-center gap-2 mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-550 dark:text-slate-400">
          Perguntas Frequentes
        </h4>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="group pb-4 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 last:pb-0 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between py-2 cursor-pointer focus:outline-none transition-all select-none group-hover:text-blue-500">
              <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">
                {item.question}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0" />
            </summary>
            <div className="pt-2">
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed m-0 font-medium">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

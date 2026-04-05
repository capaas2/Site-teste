"use client";

import { ShoppingCart, ExternalLink, ShieldCheck } from "lucide-react";

interface AffiliateWidgetProps {
  productName: string;
  price: string;
  store: string;
  affiliateUrl: string;
  isBestChoice?: boolean;
}

export function AffiliateWidget({ 
  productName, 
  price, 
  store, 
  affiliateUrl,
  isBestChoice = false
}: AffiliateWidgetProps) {
  
  // Mapeamento de cores de lojas comuns (Simulado)
  const storeColors: Record<string, string> = {
    "Amazon": "group-hover:text-[#FF9900]",
    "Mercado Livre": "group-hover:text-[#FFE600]",
    "Magalu": "group-hover:text-[#0086FF]",
    "KaBuM": "group-hover:text-[#FF6500]",
  };

  const storeColor = storeColors[store] || "group-hover:text-blue-500";

  return (
    <div className="my-12 group">
      <div className={`relative overflow-hidden rounded-[2rem] border-2 transition-all duration-500 
        ${isBestChoice 
          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_20px_50px_rgba(59,130,246,0.15)]" 
          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-200 dark:hover:border-blue-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
        }`}>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-3 h-3" />
              Preço Verificado pela IA
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight italic">
              {productName}
            </h3>
            
            <div className={`text-3xl sm:text-4xl font-extrabold tracking-tighter transition-colors duration-300 ${storeColor}`}>
              <span className="text-lg font-bold mr-1 opacity-60">R$</span>
              {price}
            </div>

            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Disponível em: <span className="text-slate-600 dark:text-slate-300">{store}</span>
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <a 
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-3 w-full sm:px-10 py-5 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] overflow-hidden group/btn hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Oferta na Loja 
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

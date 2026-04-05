"use client";

import { ShoppingCart, ShieldCheck, Star, Smartphone, ArrowUpRight } from "lucide-react";
import React from 'react';

interface AffiliateWidgetProps {
  productName: string;
  price: string;
  store: string;
  affiliateUrl: string;
  productImage?: string;
  isBestChoice?: boolean;
}

export default function AffiliateWidget({ 
  productName, 
  price, 
  store, 
  affiliateUrl,
  productImage,
  isBestChoice = false
}: AffiliateWidgetProps) {
  
  const storeMap: Record<string, { color: string; logo: React.ReactNode }> = {
    "Amazon": {
      color: "group-hover:text-[#FF9900]",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF9900]" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.93 17.13c-2.68 1.95-6.34 2.25-9.52 1.35C4.07 17.73 2 15.65 2 13.1c0-2.4 1.83-4 4.07-4 1.95 0 4.07.82 4.07 3s-2.12 3-4.07 3a4.11 4.11 0 0 1-1.35-.22c.11.33.43.55.82.55s.76-.22 1.05-.43C8.42 14.1 11.23 13 13.84 13c3 0 5.4 1 5.4 3.78 0 1.25-.43 2.5-1.12 3.32-.4-.44-.82-.82-1.19-1.2l-1-1.77zm-5-3.83c-.87 0-1.63.43-1.63 1.08s.76 1.08 1.63 1.08 1.63-.43 1.63-1.08-.76-1.08-1.63-1.08z"/>
          <path d="M18.82 20.32c-3.13 2.13-7.53 2.58-11.26 1.5-2.13-.6-4.07-1.85-5.32-3.6 2.4 2.25 6 3.6 11.26 1.5 2.53-1.05 4.39-3 5.32-5.4 0 1.95-.5 4.2-1.5 6h1.5z"/>
        </svg>
      )
    },
    "Mercado Livre": {
      color: "group-hover:text-[#FFE600]",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FFE600]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      )
    }
  };

  const storeInfo = storeMap[store] || { color: "group-hover:text-blue-500", logo: <ShoppingCart className="w-5 h-5 font-bold" /> };

  return (
    <div className="my-10 group px-2 sm:px-0">
      <div className={`relative overflow-hidden rounded-[2.5rem] border-2 transition-all duration-500 
        ${isBestChoice 
          ? "border-blue-500 bg-blue-50/10 dark:bg-blue-900/10 shadow-[0_30px_60px_rgba(59,130,246,0.25)]" 
          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-100 dark:hover:border-blue-800 shadow-2xl shadow-slate-200/50 dark:shadow-none"
        }`}>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {isBestChoice && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black px-5 py-2 rounded-bl-3xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-20">
             <Star className="w-3.5 h-3.5 fill-white" /> Melhor Escolha
          </div>
        )}

        <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          
          <div className="relative w-40 sm:w-1/3 aspect-square rounded-[2rem] overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center p-6 border border-slate-100 dark:border-slate-700 shadow-inner group-hover:shadow-md transition-shadow">
            {productImage ? (
              <img 
                src={productImage} 
                alt={productName} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <Smartphone className="w-12 h-12 text-slate-200 dark:text-slate-700" />
            )}
            
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter text-slate-500 shadow-sm">
               <ShieldCheck className="w-2.5 h-2.5 text-blue-500" /> IA Verified
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight italic">
                {productName}
              </h3>
              
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                LOJA: {storeInfo.logo} <span className="text-slate-600 dark:text-slate-200 font-black">{store}</span>
              </div>
            </div>
            
            <div className={`text-4xl sm:text-6xl font-black tracking-tighter transition-colors duration-300 ${storeInfo.color}`}>
              <span className="text-lg font-bold mr-1 opacity-50">R$</span>
              {price}
            </div>

            <div className="pt-2">
              <a 
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/30 w-full sm:w-auto justify-center"
              >
                Acessar Oferta <ArrowUpRight className="w-4.5 h-4.5" />
              </a>
              <p className="mt-4 text-[9px] text-slate-400 font-bold italic uppercase tracking-widest opacity-80">
                * Preços atualizados pelo Squad de Monetização
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

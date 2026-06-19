"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

export function AdBanner({ slot = "8490210284834886", format = "auto", className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (adLoaded) return;

    const container = containerRef.current;
    if (!container) return;

    let observer: ResizeObserver | null = null;

    const pushAd = () => {
      try {
        // @ts-expect-error - adsbygoogle is loaded dynamically via window object
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    const checkDimensionsAndPush = () => {
      // Verifica se o contêiner tem largura mínima (250px) e altura
      if (container.offsetWidth >= 250 && container.offsetHeight > 0) {
        // Evita erro de 'All ins elements already have ads' verificando se existe algum ins não processado na página
        const unprocessed = document.querySelectorAll("ins.adsbygoogle:not([data-adsbygoogle-status='done'])");
        if (unprocessed.length > 0) {
          pushAd();
        }
        if (observer) {
          observer.disconnect();
        }
      }
    };

    checkDimensionsAndPush();

    if (!adLoaded && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        checkDimensionsAndPush();
      });
      observer.observe(container);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [adLoaded]);

  return (
    <div 
      ref={containerRef}
      className={`w-full overflow-hidden my-8 glass-morphism rounded-2xl flex items-center justify-center p-4 bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 min-h-[100px] ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-8490210284834886"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Placeholder para ambiente de desenvolvimento */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[10px] uppercase font-black tracking-widest text-slate-400">
        Espaço para Anúncio AdSense
      </div>
    </div>
  );
}

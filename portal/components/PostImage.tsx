"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PostImageProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export default function PostImage({ src, alt, caption, className, priority }: PostImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback seguro: Servidor de imagens tecnológico
  const fallbackUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200";

  // Otimização automática para Unsplash
  let finalUrl = src;
  if (src && src.includes('unsplash.com') && !src.includes('?')) {
    finalUrl = `${src}?auto=format&fit=crop&q=80&w=1200`;
  }

  return (
    <figure className={`my-12 group flex flex-col items-center ${className || ''}`}>
      <div className={`w-full overflow-hidden rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl transition-all duration-700 ${loading ? 'animate-pulse min-h-[300px]' : ''}`}>
        <img 
          src={error || !src ? fallbackUrl : finalUrl}
          alt={alt || caption || "FolhaByte Image"}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-auto max-h-[600px] object-contain block group-hover:scale-[1.02] transition-transform duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            console.error(`Falha ao carregar imagem: ${src}`);
            setError(true);
            setLoading(false);
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center px-6">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
            — {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

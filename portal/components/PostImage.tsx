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
    <figure className={`my-16 group ${className || ''}`}>
      <div className={`relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl transition-all duration-700 ${loading ? 'animate-pulse' : ''}`}>
        <Image 
          src={error || !src ? fallbackUrl : finalUrl}
          alt={alt || caption || "FolhaByte Image"}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={`object-cover block group-hover:scale-105 transition-transform duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            console.error(`Falha ao carregar imagem: ${src}`);
            setError(true);
            setLoading(false);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
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

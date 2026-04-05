"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface ViewCounterProps {
  postId: string;
}

export function ViewCounter({ postId }: ViewCounterProps) {
  const hasCounted = useRef(false);

  useEffect(() => {
    // Evita contar duas vezes no desenvolvimento (StrictMode)
    if (hasCounted.current) return;
    hasCounted.current = true;

    async function increment() {
      try {
        const { error } = await supabase.rpc("increment_views", { post_id: postId });
        if (error) {
          console.error("Erro ao contar view:", error.message);
        }
      } catch (err) {
        console.error("Erro fatal ao contar view:", err);
      }
    }

    // Pequeno delay para garantir que não conte "pulo" de página rápido
    const timer = setTimeout(increment, 2000); 
    
    return () => clearTimeout(timer);
  }, [postId]);

  return null; // O contador é invisível nos "bastidores"
}

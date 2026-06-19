import { supabase } from "./supabase";
import { Post } from "@/types/post";
import { headers } from "next/headers";

async function getActiveLocale(): Promise<string> {
  try {
    const headerList = await headers();
    return headerList.get("x-locale") || "pt";
  } catch {
    return "pt";
  }
}

export function translatePosts(posts: Post[], locale: string): Post[] {
  if (!posts) return [];
  
  return posts.map(post => {
    const original_titulo = post.titulo;
    let autor = post.autor;
    if (locale !== "pt" && (autor === "Redação FolhaByte" || autor === "nossa redação" || !autor)) {
      autor = locale === "en" ? "FolhaByte Editorial Staff" : "Redacción FolhaByte";
    }
    
    if (locale === "en" && post.titulo_en) {
      return {
        ...post,
        titulo: post.titulo_en,
        conteudo_markdown: post.conteudo_markdown_en || post.conteudo_markdown,
        original_titulo,
        autor
      };
    }
    if (locale === "es" && post.titulo_es) {
      return {
        ...post,
        titulo: post.titulo_es,
        conteudo_markdown: post.conteudo_markdown_es || post.conteudo_markdown,
        original_titulo,
        autor
      };
    }
    return {
      ...post,
      original_titulo,
      autor
    };
  });
}

export async function getLatestPosts(page = 1, pageSize = 12): Promise<{ posts: Post[], count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("publicado_em", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching latest posts:", error.message);
    return { posts: [], count: 0 };
  }

  const locale = await getActiveLocale();
  const translatedPosts = translatePosts(data as Post[], locale);

  return { posts: translatedPosts, count: count || 0 };
}

export async function getTopPosts(days = 7, limit = 10): Promise<Post[]> {
  const locale = await getActiveLocale();
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .filter("publicado_em", "gte", dateLimit.toISOString())
    .order("views", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching top posts (last ${days} days):`, error.message);
    // Se der erro ou não houver nada no período, busca as 10 mais lidas de sempre como fallback
    const { data: fallback } = await supabase
      .from("posts")
      .select("*")
      .order("views", { ascending: false })
      .limit(limit);
    return translatePosts((fallback || []) as Post[], locale);
  }

  // Se o período for muito curto (ex: 24h) e não houver posts suficientes (precisamos de pelo menos 3), tenta aumentar o período
  if (data.length < 3 && days < 30) {
    return getTopPosts(days * 2, limit);
  }

  return translatePosts(data as Post[], locale);
}

export async function getPostsByCategory(categorySlug: string, page = 1, pageSize = 12): Promise<{ posts: Post[], count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Slugs fixos que usam mapeamento amplo (v3.0 — unificado com pipeline)
  const categoryMap: Record<string, { term: string; exact: boolean }> = {
    "ia-software": { term: "IA", exact: false },
    "ia": { term: "IA", exact: false },
    "inteligencia-artificial": { term: "IA", exact: false },
    "inteligência-artificial": { term: "IA", exact: false },
    "inteligencia artificial": { term: "IA", exact: false },
    "inteligência artificial": { term: "IA", exact: false },
    "mobilidade": { term: "Mobilid", exact: false },
    "eletrificacao": { term: "Elétri", exact: false },
    "eletricos": { term: "Elétri", exact: false },
    "cibersegurança": { term: "Segurança", exact: false },
    "seguranca": { term: "Segurança", exact: false },
    "produtos": { term: "Produto", exact: false },
    "gadgets": { term: "Gadget", exact: false },
    "sustentabilidade": { term: "Sustentab", exact: false },
    "mercado": { term: "Mercado", exact: false },
    "ciencia": { term: "Ciência", exact: false },
    "reviews": { term: "Review", exact: false },
  };

  const normalizedSlug = categorySlug.toLowerCase().replace(/-/g, ' ');
  const mapping = categoryMap[categorySlug.toLowerCase()] || categoryMap[normalizedSlug];
  const searchTerm = mapping ? mapping.term : categorySlug.replace(/-/g, ' ');

  const query = supabase
    .from("posts")
    .select("*", { count: "exact" });

  // Unificação das categorias de IA e Inteligência Artificial para retornar os mesmos artigos
  const isIACategory = ["ia", "ia software", "inteligencia artificial", "inteligência artificial"].includes(normalizedSlug);

  if (isIACategory) {
    query.or("categoria.ilike.IA,categoria.ilike.IA,%,categoria.ilike.%, IA,categoria.ilike.%, IA,%,categoria.ilike.%Inteligência Artificial%,categoria.ilike.%Inteligencia Artificial%");
  } else {
    // Para suportar categorias múltiplas (separadas por vírgula), sempre buscamos usando busca parcial
    query.ilike("categoria", `%${searchTerm}%`);
  }

  const { data, count, error } = await query
    .order("publicado_em", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error.message);
    return { posts: [], count: 0 };
  }

  const locale = await getActiveLocale();
  const translatedPosts = translatePosts(data as Post[], locale);

  return { posts: translatedPosts, count: count || 0 };
}

export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("categoria");

  if (error) {
    console.error("Error fetching all categories:", error.message);
    return [];
  }

  const categoryCounts: Record<string, number> = {};
  data.forEach((post: any) => {
    if (post.categoria) {
      // Divide por vírgula caso o post possua até duas categorias
      const categories = post.categoria.split(",").map((c: string) => c.trim());
      categories.forEach((cat: string) => {
        if (cat) {
          // Normaliza categorias de IA para contar tudo sob "IA"
          const normalized = cat.toLowerCase();
          let finalName = cat;
          
          if (["ia", "inteligencia artificial", "inteligência artificial"].includes(normalized)) {
            finalName = "IA";
          }
          
          categoryCounts[finalName] = (categoryCounts[finalName] || 0) + 1;
        }
      });
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

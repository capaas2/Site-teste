import { supabase } from "./supabase";
import { Post } from "@/types/post";

async function getActiveLocale(): Promise<string> {
  return "pt";
}

export function translatePosts(posts: Post[], _locale: string): Post[] {
  if (!posts) return [];
  
  // Mantém a referência do locale ativa para futuras traduções dinâmicas
  const currentLocale = _locale || "pt";
  
  return posts.map(post => {
    const original_titulo = post.titulo;
    const autor = post.autor || "Redação FolhaByte";
    return {
      ...post,
      original_titulo,
      autor,
      locale: currentLocale
    };
  });
}

export async function getLatestPosts(page = 1, pageSize = 12, locale?: string): Promise<{ posts: Post[], count: number }> {
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

  const activeLocale = locale || await getActiveLocale();
  const translatedPosts = translatePosts(data as Post[], activeLocale);

  return { posts: translatedPosts, count: count || 0 };
}

export async function getTopPosts(days = 7, limit = 10, locale?: string): Promise<Post[]> {
  const activeLocale = locale || await getActiveLocale();
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
    return translatePosts((fallback || []) as Post[], activeLocale);
  }

  // Se o período for muito curto (ex: 24h) e não houver posts suficientes (precisamos de pelo menos 3), tenta aumentar o período
  if (data.length < 3 && days < 30) {
    return getTopPosts(days * 2, limit, activeLocale);
  }

  return translatePosts(data as Post[], activeLocale);
}

export async function getPostsByCategory(categorySlug: string, page = 1, pageSize = 12): Promise<{ posts: Post[], count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Slugs fixos que usam mapeamento amplo (v3.0 — unificado com pipeline)
  const categoryMap: Record<string, string> = {
    "ia-software": "IA",
    "ia": "IA",
    "inteligencia-artificial": "IA",
    "inteligência-artificial": "IA",
    "inteligencia artificial": "IA",
    "inteligência artificial": "IA",
    "mobilidade": "Mobilidade",
    "eletrificacao": "Eletr",
    "eletricos": "Eletr",
    "cibersegurança": "Segurança",
    "seguranca": "Segurança",
    "produtos": "Produto",
    "gadgets": "Gadget",
    "sustentabilidade": "Sustentab",
    "mercado": "Mercado",
    "ciencia": "Ciência",
    "reviews": "Review",
    "hardware": "Hardware",
  };

  const normalizedSlug = categorySlug.toLowerCase().replace(/-/g, ' ');
  const searchTerm = categoryMap[categorySlug.toLowerCase()] || categoryMap[normalizedSlug] || categorySlug.replace(/-/g, ' ');

  const query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .ilike("categoria", `%${searchTerm}%`);

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
  data?.forEach((post: { categoria: string | null }) => {
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

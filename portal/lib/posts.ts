import { supabase } from "./supabase";
import { Post } from "@/types/post";

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
  return { posts: data as Post[], count: count || 0 };
}

export async function getTopPosts(days = 7, limit = 10): Promise<Post[]> {
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
    return (fallback as Post[]) || [];
  }

  // Se o período for muito curto (ex: 24h) e não houver posts suficientes (precisamos de pelo menos 3), tenta aumentar o período
  if (data.length < 3 && days < 30) {
    return getTopPosts(days * 2, limit);
  }

  return data as Post[];
}

export async function getPostsByCategory(categorySlug: string, page = 1, pageSize = 12): Promise<{ posts: Post[], count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Slugs fixos que usam mapeamento amplo (v2.8)
  const categoryMap: Record<string, { term: string; exact: boolean }> = {
    "ia-software": { term: "IA", exact: false },
    "ia": { term: "IA", exact: false },
    "mobilidade": { term: "Mobilid", exact: false },
    "eletrificacao": { term: "Elétri", exact: false },
    "cibersegurança": { term: "Segurança", exact: false },
    "produtos": { term: "Produto", exact: false },
    "sustentabilidade": { term: "Sustentab", exact: false },
    "mercado": { term: "Mercado", exact: false }
  };

  const mapping = categoryMap[categorySlug.toLowerCase()];
  const searchTerm = mapping ? mapping.term : categorySlug.replace(/-/g, ' ');
  const isExact = mapping ? mapping.exact : true; // Tags da nuvem/contexto usam exact match

  const query = supabase
    .from("posts")
    .select("*", { count: "exact" });

  if (isExact) {
    query.ilike("categoria", searchTerm);
  } else {
    query.ilike("categoria", `%${searchTerm}%`);
  }

  const { data, count, error } = await query
    .order("publicado_em", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error.message);
    return { posts: [], count: 0 };
  }
  return { posts: data as Post[], count: count || 0 };
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
    const cat = post.categoria;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

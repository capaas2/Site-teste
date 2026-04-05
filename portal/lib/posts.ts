import { supabase } from "./supabase";
import { Post } from "@/types/post";

export async function getLatestPosts(limit = 20): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("publicado_em", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest posts:", error.message);
    return [];
  }
  return data as Post[];
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

export async function getPostsByCategory(categorySlug: string, limit = 20): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("categoria", categorySlug)
    .order("publicado_em", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error.message);
    return [];
  }
  return data as Post[];
}

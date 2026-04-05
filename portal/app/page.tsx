import { supabase } from "@/lib/supabase";
import { HeroGrid } from "@/components/HeroGrid";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { PostFeed } from "@/components/PostFeed";
import { Post } from "@/types/post";

export const revalidate = 60;

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("publicado_em", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }
  return data as Post[];
}

export default async function HomePage() {
  const posts = await getPosts();
  const heroPosts = posts.slice(0, 9);
  const feedPosts = posts.slice(9);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Grid — destaque assimétrico */}
      <section>
        <HeroGrid posts={heroPosts} />
      </section>

      {/* Carrossel de Categorias */}
      <CategoryCarousel />

      {/* Divisor */}
      <div className="border-t border-slate-200 dark:border-slate-800" />

      {/* Feed Geral */}
      <PostFeed posts={feedPosts.length > 0 ? feedPosts : posts} />
    </div>
  );
}

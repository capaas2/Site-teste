import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { Sidebar } from "@/components/Sidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { ViewCounter } from "@/components/ViewCounter";
import { AdBanner } from "@/components/AdBanner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, Tag } from "lucide-react";

export const revalidate = 120;

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Post;
}

async function getSidebarPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, categoria, publicado_em, imagem_url, autor, views")
    .order("views", { ascending: false }) // News page sidebar shows Most Read
    .limit(5);

  return (data as Post[]) || [];
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [post, sidebarPosts] = await Promise.all([
    getPost(id),
    getSidebarPosts(),
  ]);

  if (!post) notFound();

  const formattedDate = new Date(post.publicado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* === Coluna Principal (70%) === */}
        <article className="lg:col-span-2">
          {/* Contador de Views (Silencioso) */}
          <ViewCounter postId={post.id} />
          
          {/* Badge + Título */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {post.categoria}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              {post.titulo}
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.autor}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formattedDate}</span>
          </div>

          {/* Share Buttons */}
          <div className="mb-8">
            <ShareButtons titulo={post.titulo} />
          </div>

          {/* Imagem de Capa */}
          <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden mb-10">
            <Image
              src={post.imagem_url || PLACEHOLDER}
              alt={post.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Conteúdo Markdown */}
          <div className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none
            prose-headings:font-extrabold prose-headings:tracking-tight
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-img:rounded-xl prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:rounded-r-lg prose-blockquote:p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.conteudo_markdown}
            </ReactMarkdown>

            {/* Banner de Anúncio Pós-Matéria */}
            <AdBanner className="mt-8" format="fluid" />
          </div>

          {/* Share bottom */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
            <ShareButtons titulo={post.titulo} />
          </div>
        </article>

        {/* === Sidebar (30%) === */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
          <Sidebar posts={sidebarPosts} />
          
          {/* Banner de Anúncio Lateral */}
          <AdBanner className="my-0" format="rectangle" />
        </div>
      </div>
    </div>
  );
}

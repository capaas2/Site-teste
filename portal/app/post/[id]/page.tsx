import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { Sidebar } from "@/components/Sidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { ViewCounter } from "@/components/ViewCounter";
import { AdBanner } from "@/components/AdBanner";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryStream } from "@/components/StoryStream";
import { AffiliateWidget } from "@/components/AffiliateWidget";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, Tag, Clock } from "lucide-react";

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

async function getLatestPlantao(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, publicado_em")
    .order("publicado_em", { ascending: false })
    .limit(6);
  return (data as Post[]) || [];
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [post, sidebarPosts, latestPlantao] = await Promise.all([
    getPost(id),
    getSidebarPosts(),
    getLatestPlantao(),
  ]);

  if (!post) notFound();

  // Calcular Tempo de Leitura (aprox. 200 palavras por minuto)
  const wordCount = post.conteudo_markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = new Date(post.publicado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Função para renderizar componentes customizados dentro do Markdown
  const renderers = {
    p: (props: any) => {
      const { children } = props;
      
      // Converte children para string para busca flexível
      const rawText = Array.isArray(children) 
        ? children.map(c => typeof c === 'string' ? c : '').join('')
        : typeof children === 'string' ? children : '';

      const trimmed = rawText.trim();

      // Detecção do marcador [DEAL:X]
      if (trimmed.startsWith('[DEAL:') && trimmed.endsWith(']')) {
        const dealIndex = parseInt(trimmed.match(/\d+/)?.[0] || "0");
        
        // Garante que affiliate_data seja tratado como objeto/array mesmo vindo do Supabase
        const deals = typeof post.affiliate_data === 'string' 
          ? JSON.parse(post.affiliate_data) 
          : post.affiliate_data;

        const dealData = deals && deals[dealIndex];
        
        if (dealData) {
          return (
            <AffiliateWidget 
              productName={dealData.productName}
              price={dealData.price}
              store={dealData.store}
              affiliateUrl={dealData.affiliateUrl}
              isBestChoice={dealData.isBestChoice}
            />
          );
        }
      }
      return <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">{children}</p>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <ReadingProgress />

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 italic">
              {post.titulo}
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                 <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-bold uppercase tracking-widest text-[10px]">{post.autor}</span>
            </div>
            <span className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left duration-500">
              <Calendar className="w-4 h-4" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" /> {readingTime} min de leitura
            </span>
          </div>

          {/* Share Buttons */}
          <div className="mb-8">
            <ShareButtons titulo={post.titulo} />
          </div>

          {/* Imagem de Capa */}
          <div className="relative w-full h-72 sm:h-96 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800">
            <Image
              src={post.imagem_url || PLACEHOLDER}
              alt={post.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Conteúdo Markdown */}
          <div className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-img:rounded-3xl prose-img:shadow-xl
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:rounded-r-2xl prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:font-bold">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={renderers}
            >
              {post.conteudo_markdown}
            </ReactMarkdown>

            {/* Banner de Anúncio Pós-Matéria */}
            <AdBanner className="mt-8" format="fluid" />
          </div>

          {/* Share bottom */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Gostou? Compartilhe:</span>
             <ShareButtons titulo={post.titulo} />
          </div>
        </article>

        {/* === Sidebar (30%) === */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
          <StoryStream posts={latestPlantao} />
          <Sidebar posts={sidebarPosts} />
          
          {/* Banner de Anúncio Lateral */}
          <AdBanner className="my-0" format="rectangle" />
        </div>
      </div>
    </div>
  );
}

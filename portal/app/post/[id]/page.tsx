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
import AffiliateWidget from "@/components/AffiliateWidget";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, Tag, Clock, Newspaper } from "lucide-react";
import { formatPostDate, formatPostTime } from "@/lib/date-utils";
import rehypeRaw from "rehype-raw";

export const revalidate = 60;

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
    .order("views", { ascending: false })
    .limit(5);

  return (data as Post[]) || [];
}

async function getLatestPlantao(): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, publicado_em, categoria, imagem_url")
    .order("publicado_em", { ascending: false })
    .limit(10);
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

  // Calcular Tempo de Leitura
  const wordCount = post.conteudo_markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = formatPostDate(post.publicado_em);
  const formattedTime = formatPostTime(post.publicado_em);

  // REGRA: Remoção Final de Numeração de IA e Renderização de Imagens
  // Transformamos as tags de texto em strings de imagem HTML reais antes de renderizar
  const processedMarkdown = post.conteudo_markdown
    .replace(/^## (\d+)\. /gm, '## ') // Remove numeração "1. ", "2. " de H2
    .replace(/\[(DETALHE_IMAGEM|INFO_GRAFICO):\s*(.+)\]/gi, (match, type, prompt) => {
       const searchTerms = encodeURIComponent(prompt.substring(0, 50));
       const dynamicUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`; // Placeholder estável por enquanto ou busca real
       // Melhorando para busca real baseada no prompt
       const realDynamicUrl = `https://source.unsplash.com/featured/1200x675?${searchTerms}`;
       
       return `<figure class="my-16 group">
          <div class="relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
            <img src="${realDynamicUrl}" alt="${prompt}" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <figcaption class="mt-6 flex items-center justify-center gap-3">
            <span class="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></span>
            <span class="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-tight italic">
              ${prompt}
            </span>
            <span class="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></span>
          </figcaption>
        </figure>`;
    });

  // Função para renderizar componentes customizados (Widgets de Oferta)
  const renderers = {
    p: (props: any) => {
      const { children } = props;
      const rawText = Array.isArray(children) 
        ? children.map(c => typeof c === 'string' ? c : '').join('')
        : typeof children === 'string' ? children : '';

      const trimmed = rawText.trim();

      if (trimmed.startsWith('[DEAL:') && trimmed.endsWith(']')) {
        try {
          const dealIndex = parseInt(trimmed.match(/\d+/)?.[0] || "0");
          const affiliateData = post.affiliate_data;
          
          if (!affiliateData) return null;

          const deals = typeof affiliateData === 'string' 
            ? JSON.parse(affiliateData) 
            : affiliateData;
            
          const dealData = Array.isArray(deals) ? deals[dealIndex] : null;
          
          if (dealData) {
            return (
              <AffiliateWidget 
                productName={dealData.productName}
                price={dealData.price}
                store={dealData.store}
                affiliateUrl={dealData.affiliateUrl}
                productImage={dealData.productImage}
                isBestChoice={dealData.isBestChoice}
              />
            );
          }
        } catch (e) {
          console.error("Erro ao renderizar AffiliateWidget:", e);
          return null;
        }
      }
      return <p className="mb-8 leading-relaxed text-slate-700 dark:text-slate-300 text-lg">{children}</p>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <ReadingProgress />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <ViewCounter postId={post.id} />
          
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black underline uppercase px-3 py-1.5 rounded-lg mb-4 tracking-tighter">
              <Tag className="w-3 h-3" />
              {post.categoria}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 italic">
              {post.titulo}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                 <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-bold uppercase tracking-widest text-[10px]">{post.autor}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-300" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
               {formattedTime}
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" /> {readingTime} min de leitura
            </span>
          </div>

          <div className="mb-8">
            <ShareButtons titulo={post.titulo} />
          </div>

          <div className="relative w-full h-72 sm:h-96 rounded-[3rem] overflow-hidden mb-12 shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800">
            <Image
              src={post.imagem_url || PLACEHOLDER}
              alt={post.titulo}
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
          </div>

          <div className="prose prose-blue dark:prose-invert lg:prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-img:rounded-3xl prose-img:shadow-xl
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:rounded-r-2xl prose-blockquote:p-6 prose-blockquote:italic">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              components={renderers} 
              rehypePlugins={[rehypeRaw]}
            >
              {processedMarkdown}
            </ReactMarkdown>

            <AdBanner className="mt-8" format="fluid" />
          </div>
        </article>

        {/* Sidebar Limpa */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
          <Sidebar posts={sidebarPosts} />
          <AdBanner className="my-0" format="rectangle" />
        </div>
      </div>

      {/* Novo Rodapé Dinâmico: Plantão Tech Horizontal */}
      <section className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-lg animate-pulse">
                  <Newspaper className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
                  Plantão <span className="text-red-600">Tech</span>
               </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Notícias de Última Hora</span>
         </div>
         
         {/* Carrossel Horizontal de Notícias */}
         <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory">
            {latestPlantao.map((p) => (
               <StoryStream key={p.id} post={p} variant="horizontal" />
            ))}
         </div>
      </section>
    </div>
  );
}

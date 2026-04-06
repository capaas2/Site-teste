import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

async function getRelatedPosts(category: string, currentId: string): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, titulo, categoria, publicado_em, imagem_url, views")
    .ilike("categoria", `%${category.trim()}%`)
    .neq("id", currentId)
    .order("publicado_em", { ascending: false })
    .limit(3);
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

  const relatedPosts = await getRelatedPosts(post.categoria, post.id);
  
  // ... (reading time logic)

  // Calcular Tempo de Leitura
  const wordCount = post.conteudo_markdown.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = formatPostDate(post.publicado_em);
  const formattedTime = formatPostTime(post.publicado_em);

  // REGRA: Remoção Final de Numeração de IA e Renderização de Imagens
  // Transformamos as tags de texto em strings de imagem HTML reais antes de renderizar
  const processedMarkdown = post.conteudo_markdown
    .replace(/^# .*\n/g, '')         // Remove o título redundante no topo do MD
    .replace(/^## (\d+)\. /gm, '## ') // Remove numeração "1. ", "2. " de H2
    .replace(/\[(IMAGEM|DETALHE_IMAGEM|INFO_GRAFICO):\s*([^|\]]+)(?:\s*\|\s*LEGENDA:\s*([^\]]+))?\]/gi, (match, type, firstPart, secondPart) => {
       let imageUrl = '';
       let caption = '';

       if (secondPart) {
         imageUrl = firstPart.trim();
         caption = secondPart.trim();
       } else {
         caption = firstPart.trim();
         imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200`;
       }

        return `<figure class="my-16 group">
          <div class="relative w-full overflow-hidden rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800 shadow-2xl transition-all duration-700">
            <img 
              src="${imageUrl}" 
              alt="${caption}" 
              class="w-full h-auto block" 
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=60'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
          </div>
          <figcaption class="mt-4 text-center px-6">
            <span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-tight italic">
              — ${caption}
            </span>
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

  const optimizedFeaturedImage = post.imagem_url?.includes('unsplash.com') 
    ? `${post.imagem_url.split('?')[0]}?auto=format&fit=crop&q=80&w=1200`
    : post.imagem_url || PLACEHOLDER;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <ReadingProgress />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <ViewCounter postId={post.id} />
          
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link 
                href={`/categoria/${post.categoria.toLowerCase().trim()}`}
                className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black underline uppercase px-3 py-1.5 rounded-lg tracking-tighter hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {post.categoria}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-2 italic">
              {post.titulo}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                 <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 leading-none mb-1">Autoridade</span>
                 <span className="font-black uppercase tracking-tight text-slate-900 dark:text-white text-xs leading-none">{post.autor}</span>
              </div>
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
              src={optimizedFeaturedImage}
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

            {/* Seção Mais em [Categoria] v2.9.3 */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                  Mais em <span className="text-blue-600 italic">{post.categoria}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPosts.map((p) => (
                    <Link key={p.id} href={`/post/${p.id}`} className="group flex flex-col gap-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <Image 
                          src={p.imagem_url || PLACEHOLDER} 
                          alt={p.titulo} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {p.titulo}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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

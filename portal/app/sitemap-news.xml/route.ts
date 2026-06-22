import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/slugify';

export const revalidate = 300; // Cache de 5 minutos no edge da Vercel

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://folhabyte.dev';

    // 1. Calcula o limite de 48 horas atrás
    const thresholdDate = new Date();
    thresholdDate.setHours(thresholdDate.getHours() - 48);

    // 2. Consulta os posts salvos nas últimas 48 horas no Supabase
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, titulo, publicado_em')
      .gte('publicado_em', thresholdDate.toISOString())
      .order('publicado_em', { ascending: false })
      .limit(1000); // O limite oficial do Google News Sitemap é de 1000 URLs

    if (error) {
      throw error;
    }

    // 3. Monta a estrutura XML com os namespaces obrigatórios do Google News
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    if (posts && posts.length > 0) {
      posts.forEach((post) => {
        const slug = slugify(post.titulo);
        const url = `${baseUrl}/post/${slug}`;
        const dateISO = new Date(post.publicado_em).toISOString();
        
        // Escape dos caracteres especiais para evitar erros de renderização de XML
        const escapedTitle = escapeXml(post.titulo);
        const escapedUrl = escapeXml(url);

        xml += `
  <url>
    <loc>${escapedUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>FolhaByte</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${dateISO}</news:publication_date>
      <news:title>${escapedTitle}</news:title>
    </news:news>
  </url>`;
      });
    }

    xml += `
</urlset>`;

    // 4. Retorna a resposta HTTP com cabeçalho de XML e cache de borda otimizado
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (err: any) {
    console.error('Erro ao gerar sitemap de notícias:', err);
    return new Response(`Error: ${err.message || 'Erro interno'}`, { status: 500 });
  }
}

// Função auxiliar para escapar caracteres reservados do padrão XML
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

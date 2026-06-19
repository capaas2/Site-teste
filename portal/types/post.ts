export interface Post {
  id: string;
  titulo: string;
  conteudo_markdown: string;
  categoria: string;
  autor: string;
  imagem_url: string | null;
  publicado_em: string;
  views: number;
  affiliate_data?: AffiliateData[] | null; // Dados de ofertas injetados pela IA
  titulo_en?: string | null;
  conteudo_markdown_en?: string | null;
  titulo_es?: string | null;
  conteudo_markdown_es?: string | null;
}

export interface AffiliateData {
  productName: string;
  price: string;
  store: string;
  affiliateUrl: string;
  productImage?: string;
  isBestChoice?: boolean;
}

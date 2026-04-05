export interface Post {
  id: string;
  titulo: string;
  conteudo_markdown: string;
  categoria: string;
  autor: string;
  imagem_url: string | null;
  publicado_em: string;
}

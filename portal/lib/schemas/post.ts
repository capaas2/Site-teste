import { z } from "zod";

export const postSchema = z.object({
  titulo: z.string()
    .min(10, "O título deve ter no mínimo 10 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  conteudo_markdown: z.string()
    .min(50, "O conteúdo deve ter no mínimo 50 caracteres"),
  categoria: z.string(),
  autor: z.string(),
  imagem_url: z.string().url("A URL da imagem deve ser válida").optional().or(z.literal("")),
});

export type PostFormData = z.infer<typeof postSchema>;

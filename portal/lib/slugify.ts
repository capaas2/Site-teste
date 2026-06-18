/**
 * Converte um texto (como o título do post) em um slug amigável para URLs.
 * Remove acentos, caracteres especiais e substitui espaços por hífens.
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres não-alfanuméricos (exceto espaços e hífens)
    .replace(/\s+/g, "-") // Substitui um ou mais espaços por um único hífen
    .replace(/--+/g, "-") // Remove hífens duplicados
    .replace(/^-+|-+$/g, ""); // Remove hífens no início ou no fim
}

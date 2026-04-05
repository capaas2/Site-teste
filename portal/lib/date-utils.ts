/**
 * Utilitários de Data e Hora para o Portal Redação Tech
 */

export function formatPostDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatPostTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Retorna algo como "Hoje, 14:30" ou "Ontem, 10:00"
 */
export function formatFriendlyDateTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const time = formatPostTime(isoString);
  
  if (isToday) return `Hoje, ${time}`;
  
  return `${formatPostDate(isoString)} às ${time}`;
}

/**
 * Utilitários de Data e Hora para o Portal FolhaByte
 * Forçado para fuso horário America/Sao_Paulo (GMT-3) para precisão editorial.
 */

export function formatPostDate(isoString: string, _locale = "pt"): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

export function formatPostTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  });
}

/**
 * Retorna algo como "Hoje, 14:30" ou "Ontem, 10:00"
 */
export function formatFriendlyDateTime(isoString: string, locale = "pt"): string {
  const date = new Date(isoString);
  const now = new Date();
  
  // Para comparação de "Hoje", precisamos normalizar para o fuso SP
  const dateSP = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(date);
  const nowSP = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(now);
  
  const isToday = dateSP === nowSP;
  const time = formatPostTime(isoString);
  
  if (isToday) {
    return `Hoje, ${time}`;
  }
  
  return `${formatPostDate(isoString, locale)} às ${time}`;
}

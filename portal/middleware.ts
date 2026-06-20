import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignorar arquivos estáticos, imagens e chamadas de API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Verificar se o caminho começa com um idioma antigo (ex: /en/sobre ou /en)
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (matchedLocale) {
    // Redirecionamento 301 permanente para o caminho sem o idioma
    let targetPath = pathname.substring(matchedLocale.length + 1);
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath;
    }

    const redirectUrl = new URL(targetPath + request.nextUrl.search, request.url);
    const response = NextResponse.redirect(redirectUrl, 301); // 301 Moved Permanently
    
    // Remove o cookie antigo de preferência de idioma se ele existir
    response.cookies.delete('lang');
    return response;
  }

  // 3. Caminho padrão (sempre em Português)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', 'pt');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });

  return response;
}

export const config = {
  matcher: [
    // Roda em todos os caminhos exceto arquivos estáticos e imagens
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
  ],
};

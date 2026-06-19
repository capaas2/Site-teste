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

  // 1.5. Se o request já possui o header x-locale, significa que ele já foi processado e reescrito
  if (request.headers.has('x-locale')) {
    return NextResponse.next();
  }

  // 2. Verificar se o caminho já começa com um idioma suportado (ex: /en/sobre ou /en)
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (matchedLocale) {
    // Extrai o caminho de destino após o prefixo de idioma
    let targetPath = pathname.substring(matchedLocale.length + 1);
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', matchedLocale);

    const response = NextResponse.rewrite(
      new URL(targetPath + request.nextUrl.search, request.url),
      {
        request: {
          headers: requestHeaders,
        },
      }
    );

    // Persiste a escolha do usuário em um cookie de idioma (30 dias)
    response.cookies.set('lang', matchedLocale, { path: '/', maxAge: 60 * 60 * 24 * 30 });
    return response;
  }

  // 3. Caminho padrão (sem prefixo de idioma). Idioma ativo será o Português ('pt').
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', 'pt');

  const cookieLang = request.cookies.get('lang')?.value;

  // Redirecionamento automático por localização apenas:
  // - Se estiver acessando a página inicial "/"
  // - E se ainda não existir um cookie definindo o idioma preferido
  if (pathname === '/' && !cookieLang) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const vercelCountry = request.headers.get('x-vercel-ip-country') || '';

    let targetLocale = 'pt';

    // Lista de países de língua espanhola e inglesa
    const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'UY', 'PA'];
    const englishCountries = ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'];

    if (spanishCountries.includes(vercelCountry)) {
      targetLocale = 'es';
    } else if (englishCountries.includes(vercelCountry)) {
      targetLocale = 'en';
    } else {
      // Fallback para o idioma do navegador (Accept-Language)
      if (acceptLanguage.startsWith('en')) {
        targetLocale = 'en';
      } else if (acceptLanguage.startsWith('es')) {
        targetLocale = 'es';
      }
    }

    // Se o idioma detectado não for português, redireciona
    if (targetLocale !== 'pt') {
      const redirectUrl = new URL(`/${targetLocale}`, request.url);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set('lang', targetLocale, { path: '/', maxAge: 60 * 60 * 24 * 30 });
      return response;
    }
  }

  // Se continuar no fluxo de português, definimos/atualizamos o cookie de preferência para 'pt'
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });

  if (pathname === '/') {
    response.cookies.set('lang', 'pt', { path: '/', maxAge: 60 * 60 * 24 * 30 });
  }

  return response;
}

export const config = {
  matcher: [
    // Roda em todos os caminhos exceto arquivos estáticos e imagens
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
  ],
};

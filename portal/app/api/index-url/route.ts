import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    // 1. Verificação de segurança (Authorization header)
    const authHeader = request.headers.get('Authorization');
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== serviceRoleKey) {
      return NextResponse.json({ 
        error: 'Não autorizado',
        debug: {
          hasAuthHeader: !!authHeader,
          authHeaderStartsWithBearer: authHeader ? authHeader.startsWith('Bearer ') : false,
          authHeaderTokenLength: authHeader ? authHeader.split(' ')[1]?.length : 0,
          hasServiceRoleKey: !!serviceRoleKey,
          serviceRoleKeyLength: serviceRoleKey ? serviceRoleKey.length : 0,
          isMatch: authHeader ? authHeader.split(' ')[1] === serviceRoleKey : false
        }
      }, { status: 401 });
    }

    // 2. Extração dos parâmetros da requisição
    const { url, action } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      return NextResponse.json({ error: 'Credenciais do Google Cloud não configuradas no servidor' }, { status: 500 });
    }

    // 3. Configuração do cliente JWT do Google APIs
    // Substitui quebras de linha escapadas para chave privada correta
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    const jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    // 4. Autoriza e dispara a requisição
    await jwtClient.authorize();

    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: url,
        type: action || 'URL_UPDATED', // 'URL_UPDATED' para novos/edições, 'URL_DELETED' para remoções
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Notificação enviada com sucesso para o Google',
      data: response.data
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Erro na Google Indexing API:', err);
    return NextResponse.json({ error: err.message || 'Erro interno no servidor' }, { status: 500 });
  }
}

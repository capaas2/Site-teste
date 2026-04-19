const https = require('https');
const http = require('http');

/**
 * Utilitário COMPLETO de Validação de Imagens para o Squad FolhaByte.
 * Verifica: acessibilidade, tipo de conteúdo, tamanho mínimo e URLs banidas.
 * 
 * Uso: node validate-image.js <URL>
 * Retorna: ✅ [VALID] ou ❌ [INVALID] com motivo detalhado.
 */

// URLs BANIDAS — imagens genéricas que apareceram repetidamente
const BANNED_URLS = [
  "https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg",
  "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
  "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg",
];

// Palavras-chave em URLs que indicam imagem genérica de banco de fotos
const GENERIC_URL_PATTERNS = [
  /placeholder/i,
  /stock-photo/i,
  /generic[-_]?tech/i,
  /circuit[-_]?board[-_]?close/i,
  /default[-_]?image/i,
  /no[-_]?image/i,
  /thumbnail[-_]?placeholder/i,
];

// Tamanho mínimo da imagem em bytes (~30KB para evitar thumbnails)
const MIN_IMAGE_SIZE = 30000;

async function validateImageUrl(url) {
  // 1. Validação básica da URL
  if (!url || typeof url !== 'string') {
    return { valid: false, reason: 'URL inválida ou vazia' };
  }

  if (!url.startsWith('http')) {
    return { valid: false, reason: 'URL deve começar com http:// ou https://' };
  }

  // 2. Verificar lista de URLs banidas
  const cleanUrl = url.split('?')[0]; // Remove query params para comparação
  if (BANNED_URLS.some(banned => cleanUrl === banned)) {
    return { valid: false, reason: '🚫 URL está na LISTA DE BANIDOS (imagem genérica conhecida)' };
  }

  // 3. Verificar padrões genéricos na URL
  for (const pattern of GENERIC_URL_PATTERNS) {
    if (pattern.test(url)) {
      return { valid: false, reason: `🚫 URL contém padrão genérico: ${pattern.source}` };
    }
  }

  // 4. Verificar links locais ou que exigem login
  if (url.startsWith('file:///') || url.includes('localhost') || url.includes('127.0.0.1')) {
    return { valid: false, reason: 'Links locais (file://, localhost) são proibidos' };
  }

  // 5. Fazer HEAD request para verificar se a imagem existe
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;

    const request = client.request(url, { method: 'HEAD', timeout: 8000 }, (res) => {
      // Seguir redirects (até 3 níveis)
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        validateImageUrl(res.headers.location).then(resolve);
        return;
      }

      const contentType = res.headers['content-type'] || '';
      const isImage = contentType.startsWith('image/');
      const isOk = res.statusCode >= 200 && res.statusCode < 400;
      const contentLength = parseInt(res.headers['content-length'] || '0', 10);

      if (!isOk) {
        resolve({ valid: false, reason: `HTTP ${res.statusCode} — imagem quebrada ou inacessível` });
        return;
      }

      if (!isImage) {
        resolve({ valid: false, reason: `Content-Type é "${contentType}" — não é uma imagem. Pode ser uma página HTML.` });
        return;
      }

      // Verificar tamanho mínimo (se o servidor fornecer Content-Length)
      if (contentLength > 0 && contentLength < MIN_IMAGE_SIZE) {
        resolve({ 
          valid: false, 
          reason: `Imagem muito pequena (${Math.round(contentLength / 1024)}KB). Mínimo: ${Math.round(MIN_IMAGE_SIZE / 1024)}KB. Provavelmente é um thumbnail.` 
        });
        return;
      }

      resolve({ 
        valid: true, 
        size: contentLength || 'desconhecido',
        type: contentType,
      });
    });

    request.on('error', (err) => {
      resolve({ valid: false, reason: `Erro de conexão: ${err.message}` });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({ valid: false, reason: 'Timeout (8s) — servidor não respondeu' });
    });

    request.end();
  });
}

// CLI
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.log("Uso: node validate-image.js <URL>");
    console.log("  Verifica se a URL é uma imagem válida, acessível, não-genérica e com tamanho mínimo.");
    process.exit(1);
  }

  validateImageUrl(url).then(res => {
    if (res.valid) {
      console.log(`✅ [VALID] Imagem aprovada!`);
      console.log(`   📐 Tamanho: ${typeof res.size === 'number' ? Math.round(res.size / 1024) + 'KB' : res.size}`);
      console.log(`   📎 Tipo: ${res.type}`);
    } else {
      console.log(`❌ [INVALID] ${res.reason}`);
      console.log(`   URL testada: ${url}`);
    }
    process.exit(res.valid ? 0 : 1);
  });
}

module.exports = { validateImageUrl };

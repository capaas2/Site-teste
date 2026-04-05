const https = require('https');

/**
 * Utilitário de Validação de Imagens para o Squad de Afiliados
 * Verifica se uma URL é alcançável e retorna um tipo de conteúdo de imagem.
 */
async function validateImageUrl(url) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) {
      resolve({ valid: false, reason: 'URL inválida' });
      return;
    }

    const request = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      const isImage = res.headers['content-type']?.startsWith('image/');
      const isOk = res.statusCode >= 200 && res.statusCode < 400;

      if (isOk && isImage) {
        resolve({ valid: true, size: res.headers['content-length'] });
      } else {
        resolve({ 
          valid: false, 
          reason: `Status: ${res.statusCode}, Type: ${res.headers['content-type']}` 
        });
      }
    });

    request.on('error', (err) => {
      resolve({ valid: false, reason: err.message });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({ valid: false, reason: 'Timeout' });
    });

    request.end();
  });
}

// Exemplo de uso via CLI
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.log("Uso: node validate-image.js <URL>");
    process.exit(1);
  }

  validateImageUrl(url).then(res => {
    if (res.valid) {
      console.log(`✅ [VALID] Imagem detectada! (Tamanho: ${res.size || 'desconhecido'})`);
    } else {
      console.log(`❌ [INVALID] Erro: ${res.reason}`);
    }
  });
}

module.exports = { validateImageUrl };

const fs = require('fs');

async function fetchML() {
  const url = 'https://www.mercadolivre.com.br/notebook-lenovo-ideapad-slim-3-intel-core-i5-16gb-512gb-ssd-15-wuxga-windows-11-83ns0001br/p/MLB37332306';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    console.log('Fetching Mercado Livre page...');
    const res = await fetch(url, { headers });
    const text = await res.text();
    fs.writeFileSync('ml-page.html', text);
    console.log('Page saved. Length:', text.length);
    
    // Procura por imagens reais do produto no CDN do Mercado Livre (http2.mlstatic.com/D_NQ_NP_...)
    const imgRegex = /https:\/\/http2\.mlstatic\.com\/D_NQ_NP_[a-zA-Z0-9%_-]+-O\.(?:webp|jpg|png)/g;
    const matches = text.match(imgRegex);
    if (matches) {
      const uniqueImages = Array.from(new Set(matches));
      console.log('Found ML Images:', uniqueImages.slice(0, 10));
      fs.writeFileSync('ml-images.json', JSON.stringify({
        images: uniqueImages
      }, null, 2));
    } else {
      console.log('No ML images found in HTML.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

fetchML();

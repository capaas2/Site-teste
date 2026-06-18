const fs = require('fs');

async function testFetch() {
  const url = 'https://www.kabum.com.br/produto/592472/notebook-lenovo-ideapad-slim-3i-intel-core-i7-13620h-16gb-ram-ssd-512gb-15-wuxga-windows-11-home-cinza-83ns0000br';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    fs.writeFileSync('kabum-page.html', text);
    console.log('Page saved. Length:', text.length);
    
    // Procura por imagens do CDN da KaBuM
    const imgRegex = /https:\/\/images\.kabum\.com\.br\/produtos\/fotos\/[a-zA-Z0-9%_-]+\/[a-zA-Z0-9%_.-]+/g;
    const matches = text.match(imgRegex);
    if (matches) {
      const uniqueImages = Array.from(new Set(matches));
      console.log('Found KaBuM Images:', uniqueImages.slice(0, 10));
    } else {
      console.log('No KaBuM images found in HTML.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetch();

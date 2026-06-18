const fs = require('fs');

async function testFetch() {
  const url = 'https://www.lenovo.com/br/pt/p/laptops/ideapad/ideapad-slim-3-series/notebook-lenovo-ideapad-slim-3-gen-10-(15-amd)/83mm0004bo';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    fs.writeFileSync('lenovo-page.html', text);
    console.log('Page saved. Length:', text.length);
    
    // Procura por imagens do CDN da Lenovo (geralmente contêm lenovo.com/medias/ ou contêm /product-images/)
    const imgRegex = /https:\/\/[a-zA-Z0-9.-]+\.lenovo\.com\/medias\/[a-zA-Z0-9%_.-]+/g;
    const matches = text.match(imgRegex);
    if (matches) {
      const uniqueImages = Array.from(new Set(matches));
      console.log('Found Lenovo Images:', uniqueImages.slice(0, 15));
    } else {
      console.log('No Lenovo images found in HTML.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetch();

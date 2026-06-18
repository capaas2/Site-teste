const fs = require('fs');

async function testFetchPichau() {
  const url = 'https://www.pichau.com.br/notebook-lenovo-ideapad-slim-3i-intel-core-i5-13420h-8gb-ddr5-ssd-512gb-15-wuxga-windows-11-home-cinza-83ns0001br';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    console.log('Fetching Pichau page locally...');
    const res = await fetch(url, { headers });
    const html = await res.text();
    
    // Procura por imagens do CDN da Pichau
    const imgRegex = /https:\/\/media\.pichau\.com\.br\/media\/catalog\/product\/[a-zA-Z0-9%_\.\/-]+/g;
    const matches = html.match(imgRegex);
    if (matches) {
      const uniqueImages = Array.from(new Set(matches));
      console.log('Found Pichau Images:', uniqueImages.slice(0, 10));
      fs.writeFileSync('lenovo-pichau-images.json', JSON.stringify({
        images: uniqueImages
      }, null, 2));
    } else {
      console.log('No Pichau images found in HTML.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetchPichau();

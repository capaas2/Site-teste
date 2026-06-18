const fs = require('fs');

async function testFetchLocal() {
  const url = 'https://www.amazon.com.br/Notebook-Lenovo-IdeaPad-15IRH10-i5-13420H/dp/B0FCVNLSGV';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    console.log('Fetching Amazon page locally from user IP...');
    const res = await fetch(url, { headers });
    const html = await res.text();
    
    // Procura por imagem principal e galeria no HTML
    const landingImageMatch = html.match(/id="landingImage"[^>]+src="([^"]+)"/i) || html.match(/"large":"([^"]+)"/i);
    
    // Procura por todas as imagens de alta resolução da Amazon (padrão m.media-amazon.com/images/I/...)
    const imagesRegex = /https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9%_.-]+\.(?:jpg|png|jpeg)/g;
    const allImages = html.match(imagesRegex) || [];
    
    const hiResImages = Array.from(new Set(allImages))
      .map(img => img.replace(/\._[A-Z0-9,_-]+\.(jpg|png|jpeg)/i, '._SL1500_.$1'))
      .filter(img => !img.includes('sprite') && !img.includes('pixel'));
      
    console.log('Landing Image match:', landingImageMatch ? landingImageMatch[1] : 'Not found');
    console.log('Found Hi-Res images:', hiResImages.slice(0, 10));
    
    if (hiResImages.length > 0) {
      fs.writeFileSync('lenovo-images.json', JSON.stringify({
        landingImage: landingImageMatch ? landingImageMatch[1].replace(/\._[A-Z0-9,_-]+\.(jpg|png|jpeg)/i, '._SL1500_.$1') : hiResImages[0],
        gallery: hiResImages.slice(0, 5)
      }, null, 2));
      console.log('✅ Imagens reais salvas em lenovo-images.json');
    } else {
      if (html.includes('captcha') || html.includes('CAPTCHA')) {
        console.log('❌ Bloqueado por CAPTCHA mesmo localmente.');
      } else {
        console.log('❌ Nenhuma imagem encontrada e sem indicativo de captcha.');
      }
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetchLocal();

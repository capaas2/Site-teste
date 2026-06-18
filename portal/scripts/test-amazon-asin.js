const fs = require('fs');
const path = require('path');

const asin = 'B0FCVNLSGV';
const urls = [
  `https://images.amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`,
  `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`,
  `https://images.amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`,
  `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`
];

async function testAsinImage() {
  console.log(`📥 Testando download de imagens da Amazon via ASIN ${asin}...`);
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url);
      if (res.ok && res.headers.get('content-type').includes('image')) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 1000) { // Garante que não é uma imagem de pixel em branco
          const filename = `amazon_asin_${i + 1}.jpg`;
          const dest = path.join(__dirname, filename);
          fs.writeFileSync(dest, Buffer.from(buffer));
          console.log(`✅ Sucesso! Imagem real baixada: ${filename} (${buffer.byteLength} bytes)`);
          console.log(`URL: ${url}`);
          return;
        } else {
          console.log(`❌ URL retornou imagem vazia/pixel: ${url}`);
        }
      } else {
        console.log(`❌ URL falhou (${res.status}): ${url}`);
      }
    } catch (err) {
      console.error(`❌ Erro no download: ${url}`, err.message);
    }
  }
}

testAsinImage();

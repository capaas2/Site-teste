const fs = require('fs');
const path = require('path');

const urls = [
  // Imagens reais oficiais do Lenovo IdeaPad Slim 3 no CDN da Amazon
  'https://m.media-amazon.com/images/I/61H5+S8-jLL._AC_SL1500_.jpg', // Notebook aberto frontal
  'https://m.media-amazon.com/images/I/71c5M-+ZzIL._AC_SL1500_.jpg', // Notebook angulado
  'https://m.media-amazon.com/images/I/61N+V8dFmRL._AC_SL1500_.jpg', // Notebook fechado fino
  'https://m.media-amazon.com/images/I/71e-dG2rZLL._AC_SL1500_.jpg'  // Detalhe das conexões/lado
];

async function download() {
  console.log('📥 Iniciando download das imagens reais do Lenovo IdeaPad...');
  const downloadedPaths = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const filename = `lenovo_real_${i + 1}.jpg`;
        const dest = path.join(__dirname, filename);
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`✅ Salvo: ${filename} (${buffer.byteLength} bytes)`);
        downloadedPaths.push({ filename, url });
      } else {
        console.log(`❌ URL falhou (${res.status}): ${url}`);
      }
    } catch (err) {
      console.error(`❌ Erro no download: ${url}`, err.message);
    }
  }
  
  console.log('Resultados:', downloadedPaths);
}

download();

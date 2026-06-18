const fs = require('fs');
const path = require('path');

const asin = 'B0FCVNLSGV';
const imagesToDownload = [
  { name: 'lenovo_real_hero.jpg', suffix: '.01._SCLZZZZZZZ_.jpg' },
  { name: 'lenovo_real_detail_1.jpg', suffix: '.01.PT01._SCLZZZZZZZ_.jpg' },
  { name: 'lenovo_real_detail_2.jpg', suffix: '.01.PT02._SCLZZZZZZZ_.jpg' }
];

async function downloadGallery() {
  console.log(`📥 Baixando galeria de imagens reais da Amazon para ASIN ${asin}...`);
  const results = [];
  
  for (const item of imagesToDownload) {
    const url = `https://images-na.ssl-images-amazon.com/images/P/${asin}${item.suffix}`;
    try {
      const res = await fetch(url);
      if (res.ok && res.headers.get('content-type').includes('image')) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 1000) {
          const dest = path.join(__dirname, item.name);
          fs.writeFileSync(dest, Buffer.from(buffer));
          console.log(`✅ Baixada: ${item.name} (${buffer.byteLength} bytes)`);
          results.push({ name: item.name, localPath: dest });
        } else {
          console.log(`❌ Imagem vazia para: ${item.name}`);
        }
      } else {
        console.log(`❌ Falhou (${res.status}) para: ${item.name}`);
      }
    } catch (err) {
      console.error(`❌ Erro no download de ${item.name}:`, err.message);
    }
  }
  
  if (results.length > 0) {
    fs.writeFileSync('downloaded-gallery.json', JSON.stringify(results, null, 2));
    console.log('✅ Galeria baixada com sucesso e salva em downloaded-gallery.json');
  } else {
    console.log('❌ Nenhuma imagem baixada.');
  }
}

downloadGallery();

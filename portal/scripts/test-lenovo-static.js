const fs = require('fs');
const path = require('path');

const candidateUrls = [
  // Imagens reais oficiais do notebook Lenovo IdeaPad Slim 3 no CDN oficial da Lenovo
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3i-gen-9-15-intel-subseries-gallery-1.png?context=bWFzdGVyfHJvb3R8MTU4NTcyfGltYWdlL3BuZ3xoYTgvaDRkLzE3ODIzOTMyMTIyMTQyLnBuZ3w3NGQzMjgxODQ5NzFmOGJiMDQyMWYyNDg4YzQ3MWRhYjNiOWQxZmJhZGU3NTMxYTdkYWEzMGEzZWI1ZWJkNzU0',
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3i-gen-9-15-intel-subseries-gallery-2.png?context=bWFzdGVyfHJvb3R8OTY1MjN8aW1hZ2UvcG5nfGhkMy9oYTgvMTc4MjM5MzIxODc2NzgucG5nfDE4Yzk5OWE0YWY1MzZkOGVkNDAwNGY2YTA4NmFlODNjZDMwYzFjNjg2ZmRmNjhmMTcyNTRlNmY1NjFmYTExMzU',
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3i-gen-9-15-intel-subseries-gallery-3.png?context=bWFzdGVyfHJvb3R8MTE2NTk0fGltYWdlL3BuZ3xoMDAvaDJkLzE3ODIzOTMyMjUzMjE0LnBuZ3wzNzAwNjFiZjg1OWRjOGFhYTYzMjQzYTg5NDkxYWUwMzVkMGM5YzQzYzA2Mzc3NzBhNWMwNThjY2I5NzViMTZj',
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3i-gen-9-15-intel-subseries-gallery-4.png?context=bWFzdGVyfHJvb3R8MTQzNDEyfGltYWdlL3BuZ3xoYzAvaGM4LzE3ODIzOTMyMzE4NzUwLnBuZ3xkMWRkZDAyNDk5NTkxZTJkZDc4ZTEyYTU3NzUxNjNhM2M4YTA0ODFhNTZjZWYzMTExZmJmNTBiOWQxNWVjNmI4',
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3-15-intel-gallery-1.png?context=bWFzdGVyfHJvb3R8MzE1NTcxfGltYWdlL3BuZ3xoNjIvaDY3LzE0Mzk3ODEzMDUwOTEwLnBuZ3w5Njg2ZjcxOTZlNDliMTBhYzNhNThhZWE0OTFmNjkyOWRkNGVhNDVlNmFjYjhmZjA5ZDU5YTYyMjQzODg0MmM4',
  'https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-3-15-intel-gallery-2.png?context=bWFzdGVyfHJvb3R8Mjk4NDY1fGltYWdlL3BuZ3xoNzgvaGYwLzE0Mzk3ODEzMTE2NDQ2LnBuZ3w5YjE1NTlhOGQ0YTBhZmEwN2RkM2RjMjFkNmQxYThkMDM4NGRmYzM1ZGI0MjNjYTA5YWE2MGYyY2Q0NTllNDBk'
];

async function testDownload() {
  console.log('📥 Testando download de imagens reais do CDN da Lenovo...');
  const successList = [];

  for (let i = 0; i < candidateUrls.length; i++) {
    const url = candidateUrls[i];
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const filename = `lenovo_official_real_${i + 1}.png`;
        const dest = path.join(__dirname, filename);
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`✅ Sucesso: ${filename} (${buffer.byteLength} bytes)`);
        successList.push({ filename, url });
      } else {
        console.log(`❌ Falhou (${res.status}): ${url.split('?')[0]}`);
      }
    } catch (e) {
      console.log(`❌ Erro no download: ${url.split('?')[0]}`, e.message);
    }
  }
  
  if (successList.length > 0) {
    fs.writeFileSync('lenovo-downloaded.json', JSON.stringify(successList, null, 2));
    console.log('✅ Imagens oficiais reais salvas em lenovo-downloaded.json');
  } else {
    console.log('❌ Nenhuma imagem respondeu OK.');
  }
}

testDownload();

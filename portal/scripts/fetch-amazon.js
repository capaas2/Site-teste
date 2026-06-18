const fs = require('fs');

async function testFetch() {
  const url = 'https://www.amazon.com.br/Notebook-Lenovo-IdeaPad-15IRH10-i5-13420H/dp/B0FCVNLSGV';
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1'
  };

  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    fs.writeFileSync('amazon-page.html', text);
    console.log('Page saved. Length:', text.length);
    
    // Procura por imagens da Amazon (geralmente começam com https://images-na.ssl-images-amazon.com/images/I/ ou https://m.media-amazon.com/images/I/)
    const imgRegex = /https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9%_-]+\.jpg/g;
    const matches = text.match(imgRegex);
    if (matches) {
      const uniqueImages = Array.from(new Set(matches));
      console.log('Found Amazon Images:', uniqueImages.slice(0, 15));
    } else {
      console.log('No amazon images found in HTML.');
      if (text.includes('captcha') || text.includes('CAPTCHA')) {
        console.log('Blocked by CAPTCHA.');
      }
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetch();

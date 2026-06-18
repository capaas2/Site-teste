const fs = require('fs');

try {
  const html = fs.readFileSync('kabum-page.html', 'utf8');
  console.log('HTML loaded. Characters:', html.length);
  
  // Procura por qualquer URL contendo images.kabum.com.br
  const regex = /https:\/\/images\.kabum\.com\.br\/[a-zA-Z0-9%_\.\/-]+/g;
  const matches = html.match(regex);
  if (matches) {
    const unique = Array.from(new Set(matches));
    console.log('All found URLs (' + unique.length + '):');
    unique.forEach(url => {
      if (url.includes('fotos') || url.includes('g.jpg') || url.includes('gg.jpg') || url.includes('m.jpg')) {
        console.log(' -', url);
      }
    });
  } else {
    console.log('No matches found.');
  }
} catch (err) {
  console.error('Error:', err);
}

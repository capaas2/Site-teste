const fs = require('fs');
const path = require('path');

const contentPath = path.resolve('C:\\Users\\gusta\\.gemini\\antigravity-ide\\brain\\5c16f547-f685-438a-9b34-9f2b55b231a3\\.system_generated\\steps\\1452\\content.md');

try {
  const text = fs.readFileSync(contentPath, 'utf8');
  console.log('File size:', text.length);

  // Procura por qualquer URL absoluta ou relativa contendo padrões de imagens de produtos Lenovo
  const regex = /(https?:\/\/[^\s"'()]+(?:\.jpg|\.png|\.jpeg|\/ProductImage\/[a-zA-Z0-9_-]+))/gi;
  const matches = text.match(regex);
  
  if (matches) {
    const unique = Array.from(new Set(matches));
    console.log('Found Image URLs:', JSON.stringify(unique, null, 2));
  } else {
    console.log('No images found in content.md');
    // Vamos imprimir as primeiras 1000 letras para entender o conteúdo
    console.log('Content sample:', text.substring(0, 1000));
  }
} catch (err) {
  console.error('Error reading content.md:', err);
}

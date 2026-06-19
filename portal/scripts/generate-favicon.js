const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const sourcePng = path.join(__dirname, '..', 'app', 'icon.png');
const destPublicIco = path.join(__dirname, '..', 'public', 'favicon.ico');
const destAppIco = path.join(__dirname, '..', 'app', 'favicon.ico');

console.log('Lendo do arquivo:', sourcePng);
if (!fs.existsSync(sourcePng)) {
  console.error('Erro: portal/app/icon.png não existe!');
  process.exit(1);
}

const pngData = fs.readFileSync(sourcePng);
const pngSize = pngData.length;

// Cabeçalho ICO (6 bytes)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // Reservado
header.writeUInt16LE(1, 2); // Tipo: 1 = Ícone
header.writeUInt16LE(1, 4); // Quantidade de imagens: 1

// Entrada do Diretório de Ícone (16 bytes)
const entry = Buffer.alloc(16);
entry.writeUInt8(0, 0); // Largura (0 significa 256px ou maior)
entry.writeUInt8(0, 1); // Altura (0 significa 256px ou maior)
entry.writeUInt8(0, 2); // Número de cores (0 para >8bpp)
entry.writeUInt8(0, 3); // Reservado (0)
entry.writeUInt16LE(1, 4); // Planos de colas (1)
entry.writeUInt16LE(32, 6); // Bits por pixel (32bpp)
entry.writeUInt32LE(pngSize, 8); // Tamanho dos dados da imagem
entry.writeUInt32LE(22, 12); // Offset onde os dados da imagem começam (6 + 16 = 22)

// Combina os buffers
const icoData = Buffer.concat([header, entry, pngData]);

// Grava em public/favicon.ico
const publicDir = path.dirname(destPublicIco);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(destPublicIco, icoData);
console.log('Favicon ICO gerado em:', destPublicIco);


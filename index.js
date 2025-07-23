// src/index.js
const path = require('path');
const [,, arquivo] = process.argv;

// Se não passar nada, usa um default
if (!arquivo) {
  console.error('Uso: npm run aula -- caminho/para/meuArquivo.js');
  process.exit(1);
}

const fullPath = path.resolve(__dirname, arquivo);
require(fullPath);

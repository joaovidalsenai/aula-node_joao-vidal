#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import nodemon from 'nodemon';
import { fileURLToPath } from 'url';

//
// 1. Reconstruindo __dirname em ESM
//
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

//
// 2. Função de prompt numérico com readline
//
function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

//
// 3. Filtra apenas pastas e arquivos .js
//
function getValidEntries(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.filter(entry => {
    if (entry.isDirectory()) {
      const subPath = path.join(dirPath, entry.name);
      const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
      return subEntries.some(e => e.isDirectory() || e.name.endsWith('.js'));
    }
    return entry.isFile() && entry.name.endsWith('.js');
  });
}

//
// 4. Navegação recursiva até selecionar um arquivo .js
//
async function navigate(currentPath = __dirname) {
  while (true) {
    const entries = getValidEntries(currentPath);

    if (entries.length === 0) {
      console.error('✖ Nenhum arquivo ou pasta válida encontrada em', currentPath);
      process.exit(1);
    }

    console.log(`\nConteúdo de: ${path.relative(__dirname, currentPath) || '.'}`);
    entries.forEach((entry, i) => {
      const label = entry.isDirectory() ? `📁 ${entry.name}` : `📄 ${entry.name}`;
      console.log(`  ${i + 1}. ${label}`);
    });

    const idx = parseInt(await ask('\nDigite o número da opção: '), 10) - 1;

    if (idx < 0 || idx >= entries.length) {
      console.error('✖ Seleção inválida');
      process.exit(1);
    }

    const selected = entries[idx];
    const selectedPath = path.join(currentPath, selected.name);

    if (selected.isFile()) {
      return selectedPath;
    }

    currentPath = selectedPath;
  }
}

//
// 5. Executa o arquivo com nodemon
//
async function runSelector() {
  const scriptPath = await navigate();

  console.clear();
  console.log(`\n▶ Monitorando e executando: ${path.relative(__dirname, scriptPath)}\n`);

  nodemon({
    watch: [scriptPath],
    exec: `node ${scriptPath}`
  });

  nodemon
    .on('start', () => console.log('↻ Iniciado'))
    .on('restart', files => console.log(`↻ Reiniciado por: ${files}`))
    .on('quit', () => console.log('✖ Encerrado') || process.exit());
}

runSelector().catch(err => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});

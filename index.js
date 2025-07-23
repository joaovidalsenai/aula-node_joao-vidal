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
// 3. Filtra entradas válidas
//
function getValidEntries(dirPath, isRoot = false) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.filter(entry => {
    const fullPath = path.join(dirPath, entry.name);

    if (isRoot) {
      // No primeiro nível, mostrar apenas diretórios com nome tipo "09-07-2025"
      return entry.isDirectory() && (/^\d{2}-\d{2}-\d{4}$/.test(entry.name) || /^\d{4}-\d{2}-\d{2}$/.test(entry.name));
    }

    if (entry.isDirectory()) {
      const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
      return subEntries.some(e => e.isDirectory() || e.name.endsWith('.js'));
    }

    return entry.isFile() && entry.name.endsWith('.js');
  });
}

//
// 4. Navegação recursiva até selecionar um arquivo .js
//
async function navigate(currentPath = __dirname, isRoot = true) {
  while (true) {
    const entries = getValidEntries(currentPath, isRoot);

    if (entries.length === 0) {
      console.error('✖ Nenhum item válido encontrado em', currentPath);
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
    isRoot = false; // Após o primeiro nível, mostrar tudo normalmente
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

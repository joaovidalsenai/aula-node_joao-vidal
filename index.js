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
      return entry.isDirectory() && /^[\d-]+$/.test(entry.name);
    }

    if (entry.isDirectory()) {
      const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
      return subEntries.some(e => e.isDirectory() || e.name.endsWith('.js'));
    }

    return entry.isFile() && entry.name.endsWith('.js');
  });
}

//
// 4. Navegação recursiva com opção de voltar
//
async function navigate(currentPath = __dirname, isRoot = true) {
  const history = [];

  while (true) {
    const entries = getValidEntries(currentPath, isRoot);

    if (entries.length === 0) {
      console.error('✖ Nenhum item válido encontrado em', currentPath);
      return null;
    }

    console.log(`\nConteúdo de: ${path.relative(__dirname, currentPath) || '.'}`);
    entries.forEach((entry, i) => {
      const label = entry.isDirectory() ? `📁 ${entry.name}` : `📄 ${entry.name}`;
      console.log(`  ${i + 1}. ${label}`);
    });
    console.log(`  0. 🔙 Voltar`);

    const idx = parseInt(await ask('\nDigite o número da opção: '), 10);

    if (idx === 0) {
      if (history.length === 0) {
        console.log('🚪 Saindo da navegação...');
        return null;
      }
      currentPath = history.pop();
      isRoot = false;
      continue;
    }

    const selected = entries[idx - 1];
    if (!selected) {
      console.error('✖ Seleção inválida');
      continue;
    }

    const selectedPath = path.join(currentPath, selected.name);

    if (selected.isFile()) {
      return selectedPath;
    }

    history.push(currentPath);
    currentPath = selectedPath;
    isRoot = false;
  }
}

//
// 5. Loop principal: escolher, executar, repetir
//
async function runSelectorLoop() {
  while (true) {
    const scriptPath = await navigate();
    if (!scriptPath) break;

    console.clear();
    console.log(`\n▶ Monitorando e executando: ${path.relative(__dirname, scriptPath)}\n`);

    await new Promise(resolve => {
      nodemon({
        watch: [scriptPath],
        exec: `node ${scriptPath}`,
        exitcrash: true,
        verbose: false
      });

      nodemon
        .once('quit', () => {
          console.log('\n⏹ Execução encerrada. Retornando ao menu...');
          resolve();
        });

      // Permitir encerrar manualmente com Ctrl+C
      process.once('SIGINT', () => {
        nodemon.emit('quit');
      });
    });
  }

  console.log('\n👋 Encerrado. Até a próxima!');
  process.exit(0);
}

runSelectorLoop().catch(err => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});
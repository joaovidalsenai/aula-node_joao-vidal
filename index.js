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
    input:  process.stdin,
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
// 3. Seleção de pasta e arquivo, depois dispara o Nodemon
//
async function runSelector() {
  // 3.1 Listar pastas no formato DD-MM-YYYY
  const baseDir = __dirname;
  const dirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d{2}-\d{2}-\d{4}$/.test(d.name))
    .map(d => d.name);

  if (dirs.length === 0) {
    console.error('✖ Nenhuma pasta de aula encontrada em', baseDir);
    process.exit(1);
  }

  console.log('\nPastas disponíveis:');
  dirs.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));

  const idxDir = parseInt(
    await ask('\nDigite o número da pasta desejada: '),
    10
  ) - 1;

  if (idxDir < 0 || idxDir >= dirs.length) {
    console.error('✖ Seleção de pasta inválida');
    process.exit(1);
  }

  const chosenDir = dirs[idxDir];
  const dirPath   = path.join(baseDir, chosenDir);

  // 3.2 Listar arquivos .js dentro da pasta escolhida
  const files = fs
    .readdirSync(dirPath)
    .filter(f => f.endsWith('.js'));

  if (files.length === 0) {
    console.error(`✖ Nenhum .js encontrado em ${chosenDir}`);
    process.exit(1);
  }

  console.log('\nArquivos disponíveis:');
  files.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));

  const idxFile = parseInt(
    await ask('\nDigite o número do arquivo desejado: '),
    10
  ) - 1;

  if (idxFile < 0 || idxFile >= files.length) {
    console.error('✖ Seleção de arquivo inválida');
    process.exit(1);
  }

  const chosenFile = files[idxFile];
  const scriptPath = path.join(dirPath, chosenFile);

  console.clear();
  console.log(`\n▶ Monitorando e executando: ${chosenDir}/${chosenFile}\n`);

  //
  // 3.3 Configurar e disparar o Nodemon programaticamente
  //
  nodemon({
    watch: [scriptPath],
    exec:  `node ${scriptPath}`
  });

  nodemon
    .on('start',  ()       => console.log('↻ Iniciado'))
    .on('restart',(files)  => console.log(`↻ Reiniciado por: ${files}`))
    .on('quit',   ()       => console.log('✖ Encerrado') || process.exit());
}

runSelector().catch(err => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});

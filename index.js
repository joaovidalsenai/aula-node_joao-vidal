import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

async function runSelector() {
  const baseDir = __dirname;

  // 1. Lista as pastas que batem com o padrão "DD-MM-YYYY"
  const pastas = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d{2}-\d{2}-\d{4}$/.test(dirent.name))
    .map(dirent => dirent.name);

  if (pastas.length === 0) {
    console.error('Nenhuma pasta de aula encontrada.');
    process.exit(1);
  }

  // 2. Prompt para escolher a data
  const { pastaEscolhida } = await inquirer.prompt({
    type: 'list',
    name: 'pastaEscolhida',
    message: 'Selecione a pasta da aula:',
    choices: pastas
  });

  // 3. Lista os arquivos .js dentro da pasta escolhida
  const dirPath = path.join(baseDir, pastaEscolhida);
  const arquivos = fs
    .readdirSync(dirPath)
    .filter(f => f.endsWith('.js'));

  if (arquivos.length === 0) {
    console.error('Nenhum arquivo JS encontrado em', pastaEscolhida);
    process.exit(1);
  }

  // 4. Prompt para escolher o arquivo
  const { arquivoEscolhido } = await inquirer.prompt({
    type: 'list',
    name: 'arquivoEscolhido',
    message: 'Selecione o arquivo JS para executar:',
    choices: arquivos
  });

  const scriptPath = path.join(dirPath, arquivoEscolhido);

  // 5. Executa o arquivo num processo filho
  const child = spawn('node', [scriptPath], { stdio: 'inherit' });
  child.on('close', code => process.exit(code));
}

runSelector().catch(err => {
  console.error('Erro inesperado:', err);
  process.exit(1);
});

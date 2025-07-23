// Exercício 2: Loop while - Jogo de adivinhação
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const numeroSecreto = Math.floor(Math.random() * 10) + 1;
let tentativas = 0;
let acertou = false;

console.log("=== Jogo de Adivinhação ===");
console.log("Tente adivinhar o número secreto entre 1 e 10:");

function fazerPergunta() {
    rl.question("Digite seu palpite: ", (resposta) => {
        const palpite = parseInt(resposta);
        tentativas++;

        if (palpite === numeroSecreto) {
            console.log(`Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)!`);
            acertou = true;
            rl.close();
        } else if (palpite < numeroSecreto) {
            console.log("Muito baixo! Tente novamente.");
            fazerPergunta();
        } else {
            console.log("Muito alto! Tente novamente.");
            fazerPergunta();
        }
    });
}

fazerPergunta();

export { numeroSecreto, tentativas };
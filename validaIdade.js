let idade = Math.floor(Math.random() * 100);
let message = "IDADE INVÁLIDA"

if (idade >= 1 && idade <= 11) {
    message = "Infantil A"
} else if (idade <= 17) {
    message = "Jovem"
} else if (idade <= 50) {
    message = "Adulto"
} else {
    message = "Idoso"
}

console.log(`Idade: ${idade}; Classificação: ${message}`)
let a = parseFloat(prompt("Digite o valor de A:"));
let b = parseFloat(prompt("Digite o valor de B:"));
let c = parseFloat(prompt("Digite o valor de C:"));

let soma = a + b;

console.log(`A = ${a}, B = ${b}, C = ${c}`);
console.log(`Soma de A + B = ${soma}`);

if (soma < c) {
    console.log("A soma de A e B é menor que C");
    alert(`A soma ${soma} é menor que C (${c})`);
} else if (soma > c) {
    console.log("A soma de A e B é maior que C");
    alert(`A soma ${soma} é maior que C (${c})`);
} else {
    console.log("A soma de A e B é igual a C");
    alert(`A soma ${soma} é igual a C (${c})`);
}
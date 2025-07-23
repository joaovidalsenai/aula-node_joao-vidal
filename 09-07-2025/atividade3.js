let a = 1;
let b = 2;
let c = 3;

let soma = a + b;

console.log(`A = ${a}, B = ${b}, C = ${c}`);
console.log(`Soma de A + B = ${soma}`);

if (soma < c) {
    console.log("A soma de A e B é menor que C");
} else if (soma > c) {
    console.log("A soma de A e B é maior que C");
} else {
    console.log("A soma de A e B é igual a C");
}
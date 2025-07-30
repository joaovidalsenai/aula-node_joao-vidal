let sum = 0;
let count = 0;
console.log("\nSoma até o numero ser maior que 10\nValor inicial: 0");
while(sum <= 10){
    let add = Math.random();
    sum+=add;
    count++;
    console.log(`+${add}`);
}
console.log(`=${sum}\nNúmero de somas feitas: ${count}`);
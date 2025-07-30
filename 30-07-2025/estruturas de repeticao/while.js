let sum = 0;
console.log("Soma até o numero ser maior que 10\nValor inicial: 0");
while(sum <= 10){
    let add = Math.random();
    sum+=add;
    console.log(`+${add}`);
}
console.log(`=${sum}`);
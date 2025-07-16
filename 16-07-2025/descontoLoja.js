let valor = 420;
let tipoCliente = "comum";
let desconto = 0;

if (tipoCliente === "comum") {
  if (valor > 1000) {
    desconto = 0.15;
  } else if (valor > 500) {
    desconto = 0.10;
  } else if (valor > 100) {
    desconto = 0.05;
  }
} else if (tipoCliente === "vip") {
  if (valor > 1000) {
    desconto = 0.20;
  } else if (valor > 500) {
    desconto = 0.15;
  } else {
    desconto = 0.10;
  }
}

let valorFinal = valor - (valor * desconto);
console.log("Valor com desconto: R$" + valorFinal.toFixed(2));

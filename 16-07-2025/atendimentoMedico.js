let sintoma = 5;
let especialidade;

switch (sintoma) {
  case 1:
    especialidade = "Neurologista";
    break;
  case 2:
    especialidade = "Cardiologista";
    break;
  case 3:
    especialidade = "Pneumologista";
    break;
  case 4:
    especialidade = "Ortopedista";
    break;
  case 5:
    especialidade = "Gastroenterologista";
    break;
  case 6:
    especialidade = "Dermatologista";
    break;
  case 7:
    especialidade = "Clínico Geral";
    break;
  default:
    especialidade = "Número inválido";
}

console.log("Especialidade indicada:", especialidade);

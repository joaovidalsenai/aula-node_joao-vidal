let nota1 = 4;
let nota2 = 2;
let nota3 = 0;

if (
  nota1 < 0 || nota1 > 10 ||
  nota2 < 0 || nota2 > 10 ||
  nota3 < 0 || nota3 > 10
) {
  console.log("Erro: As notas devem estar entre 0 e 10.");
} else {
  let media = (nota1 + nota2 + nota3) / 3;

  if (media >= 7.0) {
    console.log("Aluno APROVADO");
  } else if (media >= 5.0) {
    console.log("Aluno em RECUPERAÇÃO");
  } else {
    console.log("Aluno REPROVADO");
  }
}

// Exercício 4: Objeto produto com for...in
const produto = {
    nome: "Smartphone Galaxy",
    preco: 1299.99,
    quantidade: 25,
    categoria: "Eletrônicos",
    marca: "Samsung"
};

console.log("Propriedades do produto:");
for (const propriedade in produto) {
    console.log(`${propriedade}: ${produto[propriedade]}`);
}
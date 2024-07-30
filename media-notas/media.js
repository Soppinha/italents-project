// Importa o módulo 'prompt-sync' para leitura de entradas do usuário
const prompt = require("prompt-sync")();

// Função para capturar uma entrada de texto do usuário
const inputString = (message) => {
  let input; // Armazena o valor digitado pelo usuário
  do {
    input = prompt(message); // Solicita a entrada do usuário

    // Verifica se a entrada é inválida (vazia ou numérica)
    if (!input || !isNaN(input)) {
      console.log("Entrada inválida. Por favor, insira um texto."); //Mensagem de erro
    }
  } while (!input || !isNaN(input)); // Repete enquanto a entrada for inválida
  return input; // Retorna a entrada válida
};

// Função para capturar uma entrada numérica do usuário
const inputNumber = (message) => {
  let input; // Armazena o valor digitado pelo usuário
  do {
    input = +prompt(message); // Solicita a entrada do usuário e converte para número

    // Verifica se a entrada é inválida (não numérica ou negativa)
    if (isNaN(input) || input < 0) {
      console.log(
        "Entrada inválida. Por favor, insira um número maior ou igual a 0." // Mensagem de erro
      );
    }
  } while (!input || isNaN(input) || input < 0); // Repete enquanto a entrada for inválida
  return input; // Retorna a entrada válida
};

// Função para cadastrar as matérias de um aluno
const cadastrarMaterias = () => {
  let arrMaterias = []; // Array para armazenar as matérias
  let cont = 1; // Contador para numerar as matérias

  console.log("-------------------");
  do {
    let materia = {}; // Objeto para armazenar informações de uma matéria
    materia.nome = inputString(`Digite o nome da ${cont++}º matéria: `); // Solicita o nome da matéria
    materia.notas = []; // Inicializa o array de notas
    materia.faltas = 0; // Inicializa o número de faltas

    arrMaterias.push(materia); // Adiciona a matéria ao array
  } while (
    arrMaterias.length < 3 || // Continua se houver menos de 3 matérias
    inputString("Deseja adicionar mais matérias? (s/n)").toLowerCase() === "s" // Pergunta se o usuário deseja adicionar mais matérias
  );
  return arrMaterias; // Retorna o array com as matérias cadastradas
};

// Função para cadastrar as notas das matérias
const cadastrarNotas = (arrMaterias) => {
  console.log("-------------------");
  // Itera sobre cada matéria
  arrMaterias.forEach((materia) => {
    // Solicita 3 notas para cada matéria
    for (let i = 1; i <= 3; i++) {
      let nota = inputNumber(
        `Digite a ${i}ª nota para a matéria ${materia.nome}: ` // Solicita a nota
      );
      materia.notas.push(nota); // Adiciona a nota ao array de notas da matéria
    }
    console.log("             ");
  });
};

// Função para cadastrar o número de faltas das matérias
const cadastrarFaltas = (arrMaterias) => {
  // Itera sobre cada matéria
  arrMaterias.forEach((materia) => {
    // Solicita o número de faltas para cada matéria
    materia.faltas = inputNumber(
      `Digite o numero de faltas para a materia ${materia.nome}: ` // Solicita o número de faltas
    );
  });
};

// Função para calcular a média das notas de cada matéria
const calcularMedias = (arrMaterias) => {
  // Itera sobre cada matéria
  arrMaterias.forEach((materia) => {
    // Calcula a soma das notas
    let soma = 0;
    materia.notas.forEach((nota) => {
      soma += nota;
    }); // Calcula a soma das notas
    materia.media = soma / materia.notas.length; // Calcula a média das notas
  });
};

// Função para exibir o resultado final do aluno
const exibirResultado = (aluno) => {
  console.log("-------------------");
  console.log(`Resultados do aluno ${aluno.nome}:`); // Exibe o nome do aluno

  // Itera sobre cada matéria
  aluno.materias.forEach((materia) => {
    let statusFaltas =
      materia.faltas > 5 ? "Reprovado por faltas" : "Aprovado por faltas"; // Verifica o status das faltas
    let statusNotas =
      materia.media >= 6 ? "Aprovado por notas" : "Reprovado por notas"; // Verifica o status das notas
    let statusFinal = statusFaltas === "Aprovado por faltas" && statusNotas === "Aprovado por notas" ? "Aprovado" : "Reprovado"; // Determina o status final

    console.log(`Matéria: ${materia.nome}`); // Exibe o nome da matéria
    console.log(`Média: ${materia.media.toFixed(2)}`); // Mostra a média com duas casas decimais
    console.log(`Faltas: ${materia.faltas}`); // Exibe o número de faltas
    console.log(`Status: ${statusFinal}`); // Exibe o status final da matéria
    console.log("-------------------");
  });
};

// Função principal que executa o programa
const main = () => {
  let aluno = {}; // Cria um objeto para o aluno
  aluno.nome = inputString("Digite o nome do(a) aluno(a): "); // Solicita o nome do aluno
  aluno.materias = cadastrarMaterias(); // Cadastra as matérias do aluno
  cadastrarNotas(aluno.materias); // Cadastra as notas das matérias
  cadastrarFaltas(aluno.materias); // Cadastra as faltas das matérias
  calcularMedias(aluno.materias); // Calcula a média das notas
  exibirResultado(aluno); // Exibe o resultado final do aluno
};

// Chama a função principal para iniciar o programa
main();

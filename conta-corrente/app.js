// Importa as classes necessárias e a função de entrada do usuário
const ContaCorrente = require("./ContaCorrente");
const ContaPoupanca = require("./ContaPoupanca");
const prompt = require("prompt-sync")();

// Função principal que contém a lógica do aplicativo bancário
async function app() {
  console.log("Seja bem-vindo ao nosso banco!");

  // Crio o objeto para armazenar as contas criadas pelo usuário
  const contas = {};

  // Função para criar uma nova conta, validando o que o usuario preenche.
  async function criarConta(tipo) {
    // Crio a variavel para armazenar o titular.
    let titular;
    // Crio um loop para continuar execultando até o usuário preencher com um nome valido
    do {
      // Atribuo o valor digitado a variavel, removendo os espaços em branco do inicio e fim
      titular = prompt("Digite o nome do titular da conta: ").trim();
      // Verifico se o nome é válido
      if (!titular || !isNaN(titular)) {
        console.log("Nome do titular inválido. Deve ser uma string não vazia."); // erro
      }
    } while (!titular || !isNaN(titular)); // condição do loop

    // E dependendo do tipo selecionado, é criado e adicionado uma instancia ao objeto
    if (tipo === "corrente") {
      contas[tipo] = new ContaCorrente(titular);
    } else if (tipo === "poupanca") {
      contas[tipo] = new ContaPoupanca(titular);
    }

    console.log(`Conta ${tipo} criada com sucesso para o titular ${titular}.`); // informa que funcionou
  }

  // Cria a conta de acordo com o tipo (corrente ou poupança), validando o que foi digitado pelo usuário.
  async function selecionarConta() {
     // Crio a variavel para armazenar o tipo da conta
    let tipoConta;
    // Crio um loop para continuar execultando até o usuário preencher com um tipo valido
    do {
      // Atribuo o valor digitado a variavel, transformando o que for digitado em caixa baixa
      tipoConta = prompt("Digite o tipo da sua conta (corrente/poupanca): ").toLowerCase();
      // se não for corrente ou poupanca, emite um erro
      if (tipoConta !== "corrente" || tipoConta !== "poupanca") {
        console.log('Tipo de conta inválido. Por favor, escolha "corrente" ou "poupanca".'); // erro
      }
    } while (tipoConta !== "corrente" || tipoConta !== "poupanca"); // condição do loop

    // Cria a conta se ela ainda não existir
    if (!contas[tipoConta]) {
      await criarConta(tipoConta);
    }

    return tipoConta;
  }

  // Seleciona a conta inicial do usuário
  let tipoContaAtual = await selecionarConta();

  // Loop para executar as opções do banco
  while (true) {

    // Pega e armazena as informações de uma conta especifica
    const conta = contas[tipoContaAtual];
    // Mostra a conta que o usuário está e o titular
    console.log(`\nConta atual: ${tipoContaAtual.toUpperCase()} - Titular: ${conta.titular}`);
    console.log("1. Depositar");
    console.log("2. Sacar");
    console.log("3. Ver Saldo");
    console.log("4. Aplicar Juros/Rendimento");
    console.log("5. Trocar de Conta");
    console.log("6. Sair");

    // Armazena a opção selecionado pelo usuário
    const opcao = prompt("Selecione uma opção: ");

    if (opcao === "1") {
      let valor;
      do {
        valor = parseFloat(prompt("Digite o valor do depósito: "));
        if (isNaN(valor) || valor <= 0) {
          console.log("\nValor de depósito inválido");
        }
      } while (isNaN(valor) || valor <= 0);

      await conta.depositar(valor);

    } else if (opcao === "2") {
      let valor;
      do {
        valor = parseFloat(prompt("Digite o valor do saque: "));
        if (isNaN(valor) || valor <= 0) {
          console.log("\nValor de saque inválido");
        }
      } while (isNaN(valor) || valor <= 0);

      await conta.sacar(valor);

    } else if (opcao === "3") {
      await conta.verSaldo();

    } else if (opcao === "4") {
      if (conta instanceof ContaCorrente) {
        conta.aplicarJuros();
      } else if (conta instanceof ContaPoupanca) {
        conta.aplicarRendimento();
      }

    } else if (opcao === "5") {
      tipoContaAtual = await selecionarConta();

    } else if (opcao === "6") {
      console.log("Saindo...");
      break;

    } else {
      console.log("Opção inválida.");
    }
  }
}

app();

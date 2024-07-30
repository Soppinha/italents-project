class Conta {
  constructor(titular, saldo = 0) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(valor) {
    this.saldo += valor;
    console.log(`\nDepósito no valor de R$${valor} foi realizado com sucesso`);
  }

  sacar(valor) {
    if (valor > this.saldo) {
      console.log("\nSaldo insuficiente para saque.");
      return;
    }
    this.saldo -= valor;
    console.log(`\nSeu saque no valor de R$${valor} foi realizado com sucesso`);
  }

  verSaldo() {
    console.log(`\nSaldo atual: R$${this.saldo}`);
  }
}
module.exports = Conta;

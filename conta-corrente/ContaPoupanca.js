const Conta = require('./Conta');

class ContaPoupanca extends Conta {
  constructor(titular, saldo = 0, rendimento = 0.05) {
    super(titular, saldo);
    this.rendimento = rendimento;
  }

    aplicarRendimento(){
        this.saldo += this.saldo * this.rendimento;
        console.log(`\nRedimento aplicado com sucesso! Saldo atual: R$${this.saldo}`)
    }
}
module.exports = ContaPoupanca;
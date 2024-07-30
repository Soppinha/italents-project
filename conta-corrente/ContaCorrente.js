const Conta = require('./Conta');

class ContaCorrente extends Conta{
    constructor(titular, saldo = 0, juros = 0.1){
        super(titular, saldo);
        this.juros = juros;
    }

    aplicarJuros (){
        this.saldo += this.saldo * this.juros;
        console.log(`\nJuros aplicado com sucesso! Saldo atual: R$${this.saldo}`)
    }
}
module.exports = ContaCorrente;
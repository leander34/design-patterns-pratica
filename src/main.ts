import currency from "currency.js";

const purchasePrice = 250000; // preço da compra
const downPayment = 50000; // entrada
const salary = 70000; // salário
const loanAmount = purchasePrice - downPayment; // valor a ser financiado
const loanRate = 1; // juros do financiamento
const loanPeriod = 12; // periodo do financiamento

// loanType = tipo do financiamento
function execute(loanType: string) {
  if (salary * 0.25 < loanAmount / loanPeriod) {
    throw new Error("Insufficient salary");
  }

  let balance = currency(loanAmount);
  let rate = loanRate / 100;
  let installmentNumber = 1;

  if (loanType === "price") {
    let formula = Math.pow(1 + rate, loanPeriod);
    let amount = balance.multiply((formula * rate) / (formula - 1));
    while (balance.value > 0) {
      let interest = balance.multiply(rate);
      let amortization = amount.subtract(interest);
      balance = balance.subtract(amortization);
      if (balance.value <= 0.05) balance = currency(0);
      console.log(
        installmentNumber,
        amount.value,
        interest.value,
        amortization.value,
        balance.value
      );
      installmentNumber++;
    }
  }

  if (loanType === "sac") {
    let amortization = currency(balance.value / loanPeriod);
    while (balance.value > 0) {
      let saldoInicial = currency(balance.value);
      let interest = currency(saldoInicial.value * rate);
      let updatedBalance = currency(saldoInicial.value + interest.value);
      let amount = currency(interest.value + amortization.value);
      balance = currency(updatedBalance.value - amount.value);
      if (balance.value <= 0.05) balance = currency(0);
      console.log(
        installmentNumber,
        amount.value,
        interest.value,
        amortization.value,
        balance.value
      );
      installmentNumber++;
    }
  }
}

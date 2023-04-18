import crypto from "crypto";
import { it, expect } from "vitest";
import SimulateLoan from "../../application/use-cases/SimulateLoan";

it("Deve simular um financimento utilizando a tabela price", async () => {
  const simulateLoan = new SimulateLoan();
  const input = {
    code: crypto.randomUUID(),
    purchasePrice: 250000, // preço da compra
    downPayment: 50000, // entrada
    salary: 70000, // salário
    period: 12, // periodo do financiamento
    type: "price",
  };
  const output = await simulateLoan.execute(input);

  expect(output.installments).toHaveLength(12);
  const [firstInstallment] = output.installments;
  expect(firstInstallment.balance).toBe(184230.24);
  const lastInstallment = output.installments[output.installments.length - 1];
  expect(lastInstallment.balance).toBe(0);
});

import crypto from "crypto";
import { it, expect } from "vitest";
import SimulateLoan from "../../application/use-cases/SimulateLoan";
import RequestLoan from "../../application/use-cases/RequestLoan";
import GetLoan from "../../application/use-cases/GetLoan";
import PgPromiseConnection from "../../infra/database/PgPromiseConnection";
import LoanDatabaseRepository from "../../infra/repository/LoanDatabaseRepository";
import InstallmentDatabaseRepository from "../../infra/repository/InstallmentDatabaseRepository";
import LoanMemoryRepository from "../../infra/repository/memory/LoanMemoryRepository";
import { InstallmentMemoryRepository } from "../../infra/repository/memory/InstallmentMemoryRepository";
import RepositoryDatabaseFactory from "../../infra/factory/RepositoryDatabaseFactory";
import RepositoryMemoryFactory from "../../infra/factory/RepositoryMemoryFactory";
import LogDecorator from "../../application/decorator/LogDecorator";

it("Deve aplicar um financimento utilizando a tabela price", async () => {
  const code = crypto.randomUUID();
  const connection = new PgPromiseConnection();
  // database
  // const loanRepository = new LoanDatabaseRepository(connection);
  // const installmentRepository = new InstallmentDatabaseRepository(connection);
  // memory
  // const loanRepository = new LoanMemoryRepository();
  // const installmentRepository = new InstallmentMemoryRepository();

  //aplicando a abstract factory
  // database
  // const repositoryFactory = new RepositoryDatabaseFactory(connection);
  // memory
  const repositoryFactory = new RepositoryMemoryFactory();
  const requestLoan = new LogDecorator(new RequestLoan(repositoryFactory));
  const inputRequestLoan = {
    code,
    purchasePrice: 250000, // preço da compra
    downPayment: 50000, // entrada
    salary: 70000, // salário
    period: 12, // periodo do financiamento
    type: "price",
  };
  await requestLoan.execute(inputRequestLoan);
  const getLoan = new LogDecorator(new GetLoan(repositoryFactory));
  const inputGetLoan = {
    code,
  };

  const output = await getLoan.execute(inputGetLoan);

  expect(output.installments).toHaveLength(12);
  const [firstInstallment] = output.installments;
  expect(firstInstallment.balance).toBe(184230.24);
  const lastInstallment = output.installments[output.installments.length - 1];
  expect(lastInstallment.balance).toBe(0);
  await connection.close();
});

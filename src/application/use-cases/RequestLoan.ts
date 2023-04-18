import Installment from "../../domain/entity/Installment";
import { LoanRepository } from "../repository/LoanRepository";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import Loan from "../../domain/entity/Loan";
import InstallmentGeneratorFactory from "../../domain/factory/InstallmentGeneratorFactory";
import { RepositoryAbstractFactory } from "../factory/RepositoryAbstractFactory";
import { UseCase } from "./UseCase";
export default class RequestLoan implements UseCase {
  loanRepository: LoanRepository;
  installmentRepository: InstallmentRepository;
  constructor(
    // private readonly loanDatabaseRepository: LoanRepository,
    // private readonly installmentDatabaseRepository: InstallmentRepository
    readonly repositoryFactory: RepositoryAbstractFactory
  ) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<void> {
    const loanAmount = input.purchasePrice - input.downPayment;
    const loanPeriod = input.period;
    const loanRate = 1;
    const loanType = input.type;

    await this.loanRepository.save(
      new Loan(
        input.code,
        loanAmount,
        loanPeriod,
        loanRate,
        loanType,
        input.salary
      )
    );

    const installmentGenerator = InstallmentGeneratorFactory.create(loanType);
    const installments = await installmentGenerator.generate(
      input.code,
      loanAmount,
      input.period,
      loanRate
    );

    for (const installment of installments) {
      await this.installmentRepository.save(
        new Installment(
          input.code,
          installment.number,
          installment.amount,
          installment.interest,
          installment.amortization,
          installment.balance
        )
      );
    }
  }
}

type Input = {
  code: string;
  purchasePrice: number;
  downPayment: number;
  salary: number;
  period: number;
  type: string;
};

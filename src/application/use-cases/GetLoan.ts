import { LoanRepository } from "../repository/LoanRepository";
import { InstallmentRepository } from "../repository/InstallmentRepository";
import { RepositoryAbstractFactory } from "../factory/RepositoryAbstractFactory";
import { UseCase } from "./UseCase";

export default class GetLoan implements UseCase {
  loanRepository: LoanRepository;
  installmentRepository: InstallmentRepository;
  constructor(
    // private readonly loanDatabaseRepository: LoanRepository,
    // private readonly installmentDatabaseRepository: InstallmentRepository
    private readonly repositoryFactory: RepositoryAbstractFactory
  ) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanRepository.get(input.code);
    const installments = await this.installmentRepository.getByCode(input.code);
    const output: Output = {
      code: loan.code,
      installments: [],
    };

    for (const installment of installments) {
      output.installments.push({
        installmentNumber: installment.number,
        amount: installment.amount,
        interest: installment.interest,
        amortization: installment.amortization,
        balance: installment.balance,
      });
    }

    return output;
  }
}

type Input = {
  code: string;
};

type Output = {
  code: string;
  installments: {
    installmentNumber: number;
    amount: number;
    interest: number;
    amortization: number;
    balance: number;
  }[];
};

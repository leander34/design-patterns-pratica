import { InstallmentRepository } from "../repository/InstallmentRepository";
import { LoanRepository } from "../repository/LoanRepository";

export interface RepositoryAbstractFactory {
  createLoanRepository(): LoanRepository;
  createInstallmentRepository(): InstallmentRepository;
}

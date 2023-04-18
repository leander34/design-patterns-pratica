import { InstallmentRepository } from "../../../application/repository/InstallmentRepository";
import Installment from "../../../domain/entity/Installment";

export class InstallmentMemoryRepository implements InstallmentRepository {
  private installments: Installment[] = [];

  static instance: InstallmentMemoryRepository;
  private constructor() {}

  static getIntance() {
    if (!InstallmentMemoryRepository.instance) {
      InstallmentMemoryRepository.instance = new InstallmentMemoryRepository();
    }
    return InstallmentMemoryRepository.instance;
  }
  async save(installment: Installment): Promise<void> {
    this.installments.push(installment);
  }
  async getByCode(code: string): Promise<Installment[]> {
    return this.installments.filter(
      (installment) => installment.loanCode === code
    );
  }
}

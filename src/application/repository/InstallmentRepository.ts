import Installment from "../../domain/entity/Installment";

export interface InstallmentRepository {
  save(installment: Installment): Promise<void>;
  getByCode(code: string): Promise<Installment[]>;
}

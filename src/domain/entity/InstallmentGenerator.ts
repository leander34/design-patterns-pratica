import Installment from "./Installment";

export interface InstallmentGenerator {
  generate(
    loanCode: string,
    loanAmount: number,
    loanPeriod: number,
    loanRate: number
  ): Promise<Installment[]>;
}

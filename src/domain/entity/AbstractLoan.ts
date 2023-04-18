import Installment from "./Installment";

export default abstract class AbstractLoan {
  constructor(
    public readonly code: string,
    public readonly amount: number,
    public readonly period: number,
    public readonly rate: number,
    public readonly type: string,
    public readonly salary: number
  ) {}

  abstract generateInstallments(): Installment[];
}

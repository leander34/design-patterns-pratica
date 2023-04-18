export default class Loan {
  constructor(
    public readonly code: string,
    public readonly amount: number,
    public readonly period: number,
    public readonly rate: number,
    public readonly type: string,
    public readonly salary: number
  ) {
    if (salary * 0.25 < amount / period) {
      throw new Error("Insufficient salary");
    }
  }
}

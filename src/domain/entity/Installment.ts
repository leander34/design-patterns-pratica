export default class Installment {
  constructor(
    public readonly loanCode: string,
    public readonly number: number,
    public readonly amount: number,
    public readonly interest: number,
    public readonly amortization: number,
    public readonly balance: number
  ) {}
}

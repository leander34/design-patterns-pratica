import { InstallmentRepository } from "../../application/repository/InstallmentRepository";
import Installment from "../../domain/entity/Installment";
import Connection from "../database/Connection";

export default class InstallmentDatabaseRepository
  implements InstallmentRepository
{
  constructor(private readonly connection: Connection) {}
  async save(installment: Installment): Promise<void> {
    await this.connection.query(
      "insert into fc.installment (loan_code, number, amount, interest, amortization, balance) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        installment.loanCode,
        installment.number,
        installment.amount,
        installment.interest,
        installment.amortization,
        installment.balance,
      ]
    );
  }

  async getByCode(code: string): Promise<Installment[]> {
    console.log(code);
    const installmentsData = await this.connection.query(
      "select * from fc.installment where loan_code = $1",
      [code]
    );
    const installments: Installment[] = [];

    for (const installmentData of installmentsData) {
      installments.push(
        new Installment(
          installmentData.loan_code,
          parseFloat(installmentData.number),
          parseFloat(installmentData.amount),
          parseFloat(installmentData.interest),
          parseFloat(installmentData.amortization),
          parseFloat(installmentData.balance)
        )
      );
    }

    return installments;
  }
}

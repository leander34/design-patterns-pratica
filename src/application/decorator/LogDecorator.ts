import { UseCase } from "../use-cases/UseCase";

export default class LogDecorator implements UseCase {
  constructor(private readonly usecase: UseCase) {}
  execute(input: any): Promise<any> {
    console.log(new Date(), input);
    return this.usecase.execute(input);
  }
}

import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class FindInternshipProcessByIdUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(id: string) {
    try {
      const intershipProcess =
        await this.intershipProcessRepository.findById(id);

      return intershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

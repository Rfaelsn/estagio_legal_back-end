import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class FindInternshipProcessByIdUsecase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
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

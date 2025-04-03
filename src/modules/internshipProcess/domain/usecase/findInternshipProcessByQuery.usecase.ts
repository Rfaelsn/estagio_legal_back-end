import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class FindInternshipProcessByQueryUsecase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ) {
    try {
      const intershipProcess =
        await this.intershipProcessRepository.findByQuery(
          findInternshipProcessByQueryDTO,
        );

      return intershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

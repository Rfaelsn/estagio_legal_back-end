import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class FindInternshipProcessByQueryUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
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

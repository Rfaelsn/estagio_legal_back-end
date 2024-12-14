import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class FilterInternshipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(
    intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ) {
    try {
      const filteredIntershipProcess =
        await this.intershipProcessRepository.filter(intershipProcessFilterDTO);

      return filteredIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

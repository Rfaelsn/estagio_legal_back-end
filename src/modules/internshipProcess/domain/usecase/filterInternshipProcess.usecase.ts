import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class FilterInternshipProcessUseCase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
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

import { CreateIntershipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import { InternshipProcessFilterDTO } from '../../application/dto/internshipProcessFilter.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class FilterInternshipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(intershipProcessFilterDTO: InternshipProcessFilterDTO) {
    try {
      const filteredIntershipProcess =
        await this.intershipProcessRepository.filter(intershipProcessFilterDTO);

      return filteredIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

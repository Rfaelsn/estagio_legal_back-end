import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class UpdateStatusInternshipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(updateIntershipProcessDTO: UpdateInternshipProcessDTO) {
    try {
      this.intershipProcessRepository.updateInternshipProcess(
        updateIntershipProcessDTO,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

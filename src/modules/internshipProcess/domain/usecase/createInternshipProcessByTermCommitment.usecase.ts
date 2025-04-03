import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class CreateInternshipProcessByTermCommitmentUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(createInternshipProcessDTO: CreateInternshipProcessDTO) {
    try {
      const createInternshipProcess =
        await this.internshipProcessRepository.create(
          createInternshipProcessDTO,
        );

      return createInternshipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

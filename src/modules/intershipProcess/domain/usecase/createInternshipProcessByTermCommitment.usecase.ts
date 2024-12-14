import { CreateInternshipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class CreateIntershipProcessByTermCommitmentUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(createIntershipProcessDTO: CreateInternshipProcessDTO) {
    try {
      const createIntershipProcess =
        await this.intershipProcessRepository.create(createIntershipProcessDTO);

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

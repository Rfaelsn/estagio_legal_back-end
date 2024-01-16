import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class CreateIntershipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(createIntershipProcessDTO: CreateIntershipProcessDTO) {
    try {
      const createIntershipProcess =
        await this.intershipProcessRepository.create(createIntershipProcessDTO);

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

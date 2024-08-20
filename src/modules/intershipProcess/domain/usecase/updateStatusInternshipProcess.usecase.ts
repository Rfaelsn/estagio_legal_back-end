import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { UpdateIntershipProcessDTO } from '../../application/dto/updateInternshiProcess.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class UpdateStatusInternshipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(updateIntershipProcessDTO: UpdateIntershipProcessDTO) {
    try {
      this.intershipProcessRepository.updateInternshipProcess(
        updateIntershipProcessDTO,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

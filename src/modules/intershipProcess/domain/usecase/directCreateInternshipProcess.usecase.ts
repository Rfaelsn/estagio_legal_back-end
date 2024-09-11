import { CreateIntershipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../entities/intershipProcess.entity';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class CreateIntershipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(idTermCommitment: string, idUser: string) {
    try {
      const createIntershipProcessDTO: CreateIntershipProcessDTO = {
        movement: IntershipProcessMovement.INICIO_ESTAGIO,
        status: IntershipProcessStatus.EM_ANALISE,
        id_user: idUser,
        id_termCommitment: idTermCommitment,
      };
      const createIntershipProcess =
        await this.intershipProcessRepository.create(createIntershipProcessDTO);

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

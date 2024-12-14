import { CreateInternshipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../entities/internshipProcess.entity';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class CreateIntershipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(idTermCommitment: string, idUser: string) {
    try {
      const createIntershipProcessDTO: CreateInternshipProcessDTO = {
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
        status: InternshipProcessStatus.EM_ANALISE,
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

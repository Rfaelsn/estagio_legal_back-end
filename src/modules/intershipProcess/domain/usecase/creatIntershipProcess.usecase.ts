import { CreateInternshipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../entities/internshipProcess.entity';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';

export class CreateInternshipProcessUseCase {
  constructor(
    private readonly interNshipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(idTermCommitment: string, idUser: string) {
    try {
      const createInternshipProcessDTO: CreateInternshipProcessDTO = {
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
        status: InternshipProcessStatus.EM_ANDAMENTO,
        id_user: idUser,
        id_termCommitment: idTermCommitment,
      };
      const createIntershipProcess =
        await this.interNshipProcessRepository.create(
          createInternshipProcessDTO,
        );

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

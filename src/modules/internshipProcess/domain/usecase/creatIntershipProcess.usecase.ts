import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../entities/internshipProcess.entity';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class CreateInternshipProcessUseCase {
  constructor(
    private readonly interNshipProcessRepository: InternshipProcessRepositoryPort,
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

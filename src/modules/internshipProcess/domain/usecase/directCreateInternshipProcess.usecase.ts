import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../entities/internshipProcess.entity';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class CreateIntershipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(idTermCommitment: string, idUser: string) {
    try {
      const createIntershipProcessDTO: CreateInternshipProcessDTO = {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.UNDER_REVIEW,
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

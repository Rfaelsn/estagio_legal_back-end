import { Prisma } from '@prisma/client';
import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../entities/internshipProcess.entity';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class CreateInternshipProcessUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(
    idTermCommitment: string,
    idUser: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ) {
    try {
      const createInternshipProcessDTO: CreateInternshipProcessDTO = {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.IN_PROGRESS,
        id_user: idUser,
        id_termCommitment: idTermCommitment,
      };
      const createIntershipProcess =
        await this.internshipProcessRepository.create(
          createInternshipProcessDTO,
          prismaClientTransaction,
        );

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

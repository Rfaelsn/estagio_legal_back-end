import { TermCommitmentEntity } from '../entities/termCommitment.entity';

import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { Prisma } from '@prisma/client';

export interface ITermCommitmentRepository {
  create(
    termCommitment: CreateTermCommitmentDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<TermCommitmentEntity>;
}

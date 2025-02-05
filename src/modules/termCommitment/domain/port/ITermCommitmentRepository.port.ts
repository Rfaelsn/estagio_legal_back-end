import { TermCommitmentEntity } from '../entities/termCommitment.entity';

import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';

export interface ITermCommitmentRepository {
  create(
    termCommitment: CreateTermCommitmentDTO,
  ): Promise<TermCommitmentEntity>;
}

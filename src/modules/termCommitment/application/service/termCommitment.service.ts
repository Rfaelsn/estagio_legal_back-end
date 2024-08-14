import { Injectable } from '@nestjs/common';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { CreateTermCommitmentUsecase } from '../../domain/usecase/createTermCommitment.usecase';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';

@Injectable()
export class TermCommitmentService {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepository,
  ) {}

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const createTermCommitmentUsecase = new CreateTermCommitmentUsecase(
      this.termCommitmentRepository,
    );
    const termCommitment = await createTermCommitmentUsecase.handle(
      createTermCommitmentDTO,
    );
    return termCommitment;
  }
}

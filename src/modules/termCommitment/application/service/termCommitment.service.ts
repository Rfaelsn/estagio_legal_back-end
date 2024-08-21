import { Injectable } from '@nestjs/common';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';
import { CreateTermCommitmentUsecase } from '../../domain/usecase/createTermCommitment.usecase';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../dto/LinkTermCommitmentFilePath.dto';

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

  async linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    return this.termCommitmentRepository.linkDocumentToTermCommitment(
      linkTermCommitmentFilePathDTO,
    );
  }
}

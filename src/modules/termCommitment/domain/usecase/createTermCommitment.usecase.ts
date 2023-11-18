import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { TermCommitment } from '../entities/termCommitment.entity';
import { ITermCommitmentRepository } from '../port/ITermCommitmentRepository';

export class CreateTermCommitmentUsecase {
  constructor(
    private readonly termCommitmentRepository: ITermCommitmentRepository,
  ) {}

  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    try {
      const termCommitment = new TermCommitment(createTermCommitmentDTO);
      const createTermCommitment = await this.termCommitmentRepository.create(
        termCommitment,
      );

      return createTermCommitment;
    } catch (error) {
      console.error(error);
    }
  }
}

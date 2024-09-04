import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { TermCommitment } from '../entities/termCommitment.entity';
import { ITermCommitmentRepository } from '../port/ITermCommitmentRepository.port';

export class CreateTermCommitmentUsecase {
  constructor(
    private readonly termCommitmentRepository: ITermCommitmentRepository,
  ) {}

  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    try {
      if (createTermCommitmentDTO.isObrigatorio) {
        createTermCommitmentDTO.numApoliceSeguro = '1234';
        createTermCommitmentDTO.nomeSeguradora = 'seguradora do balaco baco';
      }
      const createTermCommitment = await this.termCommitmentRepository.create(
        createTermCommitmentDTO,
      );

      return createTermCommitment;
    } catch (error) {
      console.error(error);
    }
  }
}

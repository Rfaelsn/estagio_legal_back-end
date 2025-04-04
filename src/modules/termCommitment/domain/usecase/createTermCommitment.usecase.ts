import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { ITermCommitmentRepository } from '../port/ITermCommitmentRepository.port';

export class CreateTermCommitmentUseCase {
  constructor(
    private readonly termCommitmentRepository: ITermCommitmentRepository,
  ) {}

  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    try {
      if (createTermCommitmentDTO.isMandatory) {
        createTermCommitmentDTO.insurancePolicyNumber = '1234';
        createTermCommitmentDTO.insuranceCompanyName =
          'seguradora do balaco baco';
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

import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../../application/dto/LinkTermCommitmentFilePath.dto';

export interface ITermCommitmentService {
  create(createTermCommitmentDTO: CreateTermCommitmentDTO);

  linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  );

  isValidWeeklyWorkloadLimit(
    idUser: string,
    newWeeklyWorkload: number,
    startDateNewInternship: Date,
    endDateNewInternship: Date,
  ): Promise<boolean>;
}

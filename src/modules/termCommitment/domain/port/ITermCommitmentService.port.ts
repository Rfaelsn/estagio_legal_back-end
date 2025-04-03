import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../../application/dto/LinkTermCommitmentFilePath.dto';
import { RegisterAssignDto } from '../../application/dto/register-assign.dto';
import { ValidateAssignTermDto } from '../../application/dto/validate-assign-term.dto';

export interface ITermCommitmentService {
  create(createTermCommitmentDTO: CreateTermCommitmentDTO);

  registerAssignTermByStudent(
    registerAssignDto: RegisterAssignDto,
  ): Promise<void>;

  validateAssignTerm(
    validateAssignTermDto: ValidateAssignTermDto,
  ): Promise<void>;

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

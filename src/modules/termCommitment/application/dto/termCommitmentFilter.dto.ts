// import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
// import { TermCommitment } from '../../domain/entities/termCommitment.entity';

export class TermCommitmentFilterDTO {
  startDateInitialSearchInterval: string | null;
  endDateInitialSearchInterval: string | null;
  startDateFinalSearchInterval: string | null;
  endDateFinalSearchInterval: string | null;
  isMandatory: boolean | null;
  courseStudy: string | null;
}

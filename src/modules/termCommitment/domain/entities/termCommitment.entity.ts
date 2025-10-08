// import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
import { TermCommitment } from '@prisma/client';
import { v4 as uuid } from 'uuid';

export class TermCommitmentEntity implements TermCommitment {
  id: string;
  insurancePolicyNumber: string;
  insuranceCompanyName: string;
  advisorProfessor: string;
  siapeCode: string;
  internshipStartDate: Date;
  internshipEndDate: Date;
  internshipStartTime: Date;
  internshipEndTime: Date;
  weeklyWorkload: number;
  isMandatory: boolean;
  internshipGrant: number;
  transportationAllowance: number;
  internshipActivityPlan: string;
  grantingCompanyName: string;
  grantingCompanyCNPJ: string;
  grantingCompanyPostalCode: string;
  grantingCompanyDistrict: string;
  grantingCompanyCity: string;
  grantingCompanyState: string;
  grantingCompanyAddress: string;
  grantingCompanyEmail: string;
  grantingCompanyLegalRepresentative: string;
  legalRepresentativeRole: string;
  supervisor: string;
  supervisorPosition: string;
  filePath: string;
  id_user: string;

  constructor(props: Omit<TermCommitmentEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}

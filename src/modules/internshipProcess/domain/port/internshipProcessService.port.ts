import { Prisma } from '@prisma/client';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '../../application/dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';

export interface InternshipProcessServicePort {
  create(
    idTermCommitment: string,
    idUser: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<boolean>;

  filter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
    userId: string,
    userRole: string,
  ): Promise<InternshipProcessEntity[]>;

  findEligibleProcessesForCompletion(
    userId: string,
    page: number,
    pageSize: number,
  );

  validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
  );

  findById(
    id: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity>;
}

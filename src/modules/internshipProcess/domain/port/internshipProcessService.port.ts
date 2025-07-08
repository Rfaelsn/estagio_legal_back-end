import { Prisma } from '@prisma/client';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { RegisterEndInternshipProcessDto } from '../../application/dto/registerEndInternshipProcess.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '../../application/dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';
import { UserFromJwt } from '@/auth/models/UserFromJwt';

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

  registerEndInternshipProcess(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
    file: Express.Multer.File[],
    user: UserFromJwt,
  );

  validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
  );

  findById(id: string): Promise<InternshipProcessEntity>;
}

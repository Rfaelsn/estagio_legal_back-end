import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { Prisma } from '@prisma/client';

export interface InternshipProcessRepositoryPort {
  create(
    createInternshipProcessDTO: CreateInternshipProcessDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<boolean>;

  filter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
  ): Promise<InternshipProcessEntity[]>;

  filterByStudent(
    internshipProcessFilterByStudentDto: InternshipProcessFilterDto,
    userId: string,
  ): Promise<InternshipProcessEntity[]>;

  findEligibleProcessesForCompletion(
    userId: string,
    page: number,
    pageSize: number,
  );

  findById(
    id: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity>;

  isElegibleForCompletion(
    internshipProcessId: string,
    userId: string,
  ): Promise<boolean>;
}

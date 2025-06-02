import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';

export interface InternshipProcessRepositoryPort {
  create(
    createInternshipProcessDTO: CreateInternshipProcessDTO,
  ): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
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

  findById(id: string): Promise<InternshipProcessEntity>;
}

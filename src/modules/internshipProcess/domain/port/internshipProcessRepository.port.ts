import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { InternshipProcessFilterByStudentDTO } from '../../application/dto/internshipProcessFilterByStudent.dto';

export interface InternshipProcessRepositoryPort {
  create(
    createInternshipProcessDTO: CreateInternshipProcessDTO,
  ): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  ): Promise<boolean>;

  filter(
    internshipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ): Promise<InternshipProcessEntity[]>;

  filterByStudent(
    internshipProcessFilterByStudentDto: InternshipProcessFilterByStudentDTO,
  ): Promise<InternshipProcessEntity[]>;

  findEligibleProcessesForCompletion(
    userId: string,
    page: number,
    pageSize: number,
  );

  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcessEntity[]>;

  findById(id: string): Promise<InternshipProcessEntity>;
}

import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessFilterByStudentDTO } from '../../application/dto/internshipProcessFilterByStudent.dto';
import { RegisterEndInternshipProcessDto } from '../../application/dto/registerEndInternshipProcess.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '../../application/dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';

export interface InternshipProcessServicePort {
  create(
    idTermCommitment: string,
    idUser: string,
  ): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  ): Promise<boolean>;

  filterByEmployee(
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

  registerEndInternshipProcess(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  );

  validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
  );

  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcessEntity[]>;

  findById(id: string): Promise<InternshipProcessEntity>;
}

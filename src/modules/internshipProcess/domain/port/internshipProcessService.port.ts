import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
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

  filter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
    userId: string,
    userRole: string,
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

  findById(id: string): Promise<InternshipProcessEntity>;
}

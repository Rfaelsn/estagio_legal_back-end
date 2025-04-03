import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { RegisterEndInternshipProcessDto } from '../../application/dto/registerEndInternshipProcess.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '../../application/dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessFilterByStudentDTO } from '../../application/dto/internshipProcessFilterByStudent.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';

export interface InternshipProcessControllerPort {
  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  );

  registerRenovationByStudent(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  );

  registerEndInternshipByStudent(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  );

  validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
    user: UserFromJwt,
  );

  internshipProcessFilter(
    internshipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  );

  internshipProcessFilterByStudent(
    internshipProcessFilterByStudentDto: InternshipProcessFilterByStudentDTO,
    req,
  );

  findEligibleProcessesForCompletion(req: any, page: number, pageSize: number);

  findByQuery(findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO);
}

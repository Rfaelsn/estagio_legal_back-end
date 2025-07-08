import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { RegisterEndInternshipProcessDto } from '../../application/dto/registerEndInternshipProcess.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';
import { ValidateAssignEndInternshipProcessDto } from '../../application/dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';

export interface InternshipProcessControllerPort {
  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  );

  registerRenovationByStudent(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  );

  registerEndInternshipByStudent(
    file: Express.Multer.File[],
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
    user: UserFromJwt,
  );

  validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
    user: UserFromJwt,
  );

  internshipProcessFilter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
    user: UserFromJwt,
  );

  findEligibleProcessesForCompletion(req: any, page: number, pageSize: number);
}

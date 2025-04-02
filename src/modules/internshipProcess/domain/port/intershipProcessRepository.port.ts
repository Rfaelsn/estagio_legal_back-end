import { CreateInternshipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessEntity } from '../entities/internshipProcess.entity';
import { UpdateIntershipProcessDTO } from '../../application/dto/updateInternshiProcess.dto';

export interface IInternshipProcessRepository {
  create(
    intershipProcess: CreateInternshipProcessDTO,
  ): Promise<InternshipProcessEntity>;

  filter(
    intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ): Promise<InternshipProcessEntity[]>;

  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcessEntity[]>;

  findById(id: string): Promise<InternshipProcessEntity>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  );
}

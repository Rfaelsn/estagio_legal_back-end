import { CreateInternshipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../../application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcess } from '../entities/internshipProcess.entity';
import { UpdateIntershipProcessDTO } from '../../application/dto/updateInternshiProcess.dto';

export interface IInternshipProcessRepository {
  create(
    intershipProcess: CreateInternshipProcessDTO,
  ): Promise<InternshipProcess>;

  filter(
    intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ): Promise<InternshipProcess[]>;

  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]>;

  findById(id: string): Promise<InternshipProcess>;

  updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  );
}

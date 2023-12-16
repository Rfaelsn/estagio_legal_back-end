import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterDTO } from '../../application/dto/internshipProcessFilter.dto';
import { InternshipProcess } from '../entities/intershipProcess.entity';

export interface IInternshipProcessRepository {
  create(
    intershipProcess: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess>;

  filter(
    intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ): Promise<InternshipProcess[]>;

  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]>;

  findById(id: string): Promise<InternshipProcess>;
}

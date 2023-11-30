import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';
import { InternshipProcess } from '../entities/intershipProcess.entity';

export interface IInternshipProcessRepository {
  create(
    intershipProcess: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess>;
}

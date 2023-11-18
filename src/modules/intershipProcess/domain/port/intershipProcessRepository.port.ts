import { InternshipProcess } from '../entities/intershipProcess.entity';

export interface IInternshipProcessRepository {
  create(intershipProcess: InternshipProcess): Promise<InternshipProcess>;
}

import { ProcessoEstagio } from '@prisma/client';
import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';

export interface IIntershipProcessRepository {
  create(intershipProcess: CreateIntershipProcessDTO): Promise<ProcessoEstagio>;
}

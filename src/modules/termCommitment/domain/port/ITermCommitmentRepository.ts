import { ProcessoEstagio } from '@prisma/client';

export interface IIntershipProcessRepository {
  create(intershipProcess: ProcessoEstagio): Promise<ProcessoEstagio>;
}

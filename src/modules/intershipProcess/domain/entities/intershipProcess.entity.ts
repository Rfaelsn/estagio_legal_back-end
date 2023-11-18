import { Prisma } from '@prisma/client';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export enum IntershipProcessStatus {
  CONCLUIDO = 'CONCLUÍDO',
  EM_ANDAMENTO = 'EM ANDAMENTO',
  RECUSADO = 'RECUSADO',
}

export enum IntershipProcessMovement {
  INICIO_ESTAGIO = 'INÍCIO DE ESTÁGIO',
  RENOVACAO = 'RENOVAÇÃO DE ESTÁGIO',
  FIM_ESTAGIO = 'FIM DE ESTÁGIO',
  CREDITACAO = 'CREDITAÇÃO',
}

export class InternshipProcess
  implements Prisma.InternshipProcessUncheckedCreateInput
{
  id?: string;
  movement: string;
  status: string;
  startDateProcess?: string | Date;
  endDateProcess: string | Date;
  id_user?: string;
  termCommitment?: Prisma.TermCommitmentUncheckedCreateNestedOneWithoutInternshipProcessInput;
  internshipEvaluation?: Prisma.InternshipEvaluationUncheckedCreateNestedManyWithoutInternshipProcessInput;

  constructor(props: Omit<InternshipProcess, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

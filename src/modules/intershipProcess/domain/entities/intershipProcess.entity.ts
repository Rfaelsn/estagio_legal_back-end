import { InternshipProcess as InternshipProcessPrisma } from '@prisma/client';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export enum IntershipProcessStatus {
  CONCLUIDO = 'CONCLUÍDO',
  EM_ANALISE = 'EM ANALISE',
  EM_ANDAMENTO = 'EM ANDAMENTO',
  RECUSADO = 'RECUSADO',
}

export enum IntershipProcessMovement {
  INICIO_ESTAGIO = 'INÍCIO DE ESTÁGIO',
  RENOVACAO = 'RENOVAÇÃO DE ESTÁGIO',
  FIM_ESTAGIO = 'FIM DE ESTÁGIO',
  CREDITACAO = 'CREDITAÇÃO',
}

export class InternshipProcess implements InternshipProcessPrisma {
  id: string;
  movement: string;
  status: string;
  startDateProcess: Date;
  endDateProcess: Date;
  id_user: string | null;
  user?: User;
  id_termCommitment: string | null;
  termCommitment?: TermCommitment;
  internshipEvaluation?: InternshipEvaluation[];

  constructor(props: Omit<InternshipProcess, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

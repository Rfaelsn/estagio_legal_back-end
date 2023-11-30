import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
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

export class InternshipProcess {
  id?: string;
  movement: string;
  status: string;
  startDateProcess?: string | Date;
  endDateProcess: string | Date;
  id_user?: string;
  user?: User;
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

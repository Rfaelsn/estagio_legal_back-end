import {
  InternshipProcessHistory,
  InternshipProcess as InternshipProcessPrisma,
} from '@prisma/client';
import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';
import { TermCommitmentEntity } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export enum InternshipProcessStatus {
  CONCLUIDO = 'CONCLUIDO',
  EM_ANALISE = 'EM_ANALISE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  RECUSADO = 'RECUSADO',
}

export enum InternshipProcessMovement {
  INICIO_ESTAGIO = 'INICIO_DE_ESTAGIO',
  RENOVACAO = 'RENOVACAO_DE_ESTAGIO',
  FIM_ESTAGIO = 'FIM_DE_ESTAGIO',
  CREDITACAO = 'CREDITACAO',
}

export class InternshipProcessEntity implements InternshipProcessPrisma {
  id: string;
  movement: string;
  status: string;
  startDateProcess: Date;
  endDateProcess: Date;
  id_user: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  id_termCommitment: string | null;
  termCommitment?: TermCommitmentEntity;
  statusHistory?: InternshipProcessHistory[];
  internshipEvaluation?: InternshipEvaluation[];

  constructor(props: Omit<InternshipProcessEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

import { InternshipGrantor, Prisma, TermCommitment } from '@prisma/client';
import { InternshipProcess } from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class TermCommitmentEntity {
  id: string;
  numApoliceSeguro: string;
  nomeSeguradora: string;
  profOrientador: string;
  codSiape: string;
  dataInicioEstagio: Date;
  dataFimEstagio: Date;
  horaInicioEstagio: Date;
  horaFimEstagio: Date;
  id_aluno: string;
  user?: User;
  id_internshipGrantor: string;
  internshipGrantor?: InternshipGrantor;
  id_processoEstagio: string;
  internshipProcess?: InternshipProcess;

  constructor(props: Omit<TermCommitment, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

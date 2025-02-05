import { File } from '@prisma/client';
import { InternshipProcessEntity } from 'src/modules/intershipProcess/domain/entities/internshipProcess.entity';
import { TermCommitmentEntity } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { v4 as uuidv4 } from 'uuid';

export enum Role {
  ALUNO = 'ALUNO',
  FUNCIONARIO = 'FUNCIONARIO',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

export class User {
  id: string;
  name: string;
  cpf: string;
  registration?: string;
  email: string;
  telefone: string;
  courseStudy?: string;
  password: string;
  role: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  id_institution?: string;
  termsCommitment?: TermCommitmentEntity[];
  internshipProcess?: InternshipProcessEntity[];
  files?: File[];

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

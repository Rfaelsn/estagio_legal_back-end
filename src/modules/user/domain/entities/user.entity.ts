import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export enum Role {
  ALUNO = 'ALUNO',
  FUNCIONARIO = 'FUNCIONARIO',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

export class User implements Prisma.UserUncheckedCreateInput {
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
  TermsCommitment?: Prisma.TermCommitmentUncheckedCreateNestedManyWithoutUserInput;
  internshipProcess?: Prisma.InternshipProcessUncheckedCreateNestedManyWithoutUserInput;
  files?: Prisma.FileUncheckedCreateNestedManyWithoutUserInput;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

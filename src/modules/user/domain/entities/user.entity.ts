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

  matricula: string;

  email: string;

  telefone: string;

  curso: string;

  password: string;

  role: string;

  id_instituicao: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

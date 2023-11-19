import { InternshipProcess } from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class InternshipGrantor {
  id: string;
  name: string;
  endereco: string;
  cnpj: string;
  cep: string;
  email: string;
  telefone: string;
  termsCommitment?: TermCommitment[];

  constructor(props: Omit<InternshipGrantor, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

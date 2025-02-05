// import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
import { TermCommitment } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export class TermCommitmentEntity implements TermCommitment {
  id: string;
  numApoliceSeguro: string;
  nomeSeguradora: string;
  profOrientador: string;
  codSiape: string;
  dataInicioEstagio: Date;
  dataFimEstagio: Date;
  horaInicioEstagio: Date;
  horaFimEstagio: Date;
  jornadaSemanal: number;
  isObrigatorio: boolean;
  bolsaAuxilio: number;
  auxilioTransporte: number;
  planoAtividadesEstagio: string;
  razaoSocialConcedente: string;
  cnpjConcedente: string;
  cepConcedente: string;
  bairroConcedente: string;
  cidadeConcedente: string;
  ufConcedente: string;
  enderecoConcedente: string;
  emailConcedente: string;
  representanteLegalConcedente: string;
  funcaoRepresentanteLegalConcedente: string;
  supervisor: string;
  cargoSupervisor: string;
  filePath: string;
  id_user: string;
  constructor(props: Omit<TermCommitmentEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

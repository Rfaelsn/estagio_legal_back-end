import { v4 as uuidv4 } from 'uuid';

export class InternshipEvaluation {
  id: string;
  atividadesEstagio: string;
  componentesCurricularesUtilizados: string;
  aplicacaoDeConhecimentosCurso: string;
  startDateProcess: Date;
  endDateProcess: Date;
  id_user: string;
  id_internshipProcess: string;

  constructor(props: Omit<InternshipEvaluation, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
  }
}

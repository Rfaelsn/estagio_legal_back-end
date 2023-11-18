// import { v4 as uuidv4 } from 'uuid';
// import { IntershipProcess } from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';

// export class InternshipEvaluation {
//   id: string;
//   atividadesEstagio: string;
//   componentesCurricularesUtilizados: string;
//   aplicacaoDeConhecimentosCurso: string;
//   dataInicioProcesso: Date;
//   dataFimProcesso: Date;
//   id_aluno: string;
//   id_processoEstagio: string;
//   processoEstagio: IntershipProcess; // Relacionamento com a classe ProcessoEstagio

//   constructor(props: Omit<InternshipEvaluation, 'id'>, id?: string) {
//     Object.assign(this, props);
//     if (!id) {
//       this.id = uuidv4();
//     } else {
//       this.id = id;
//     }
//   }
// }

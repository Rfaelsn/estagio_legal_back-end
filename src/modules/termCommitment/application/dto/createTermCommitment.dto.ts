// import {
//   IsString,
//   IsOptional,
//   IsEnum,
//   IsDate,
//   IsNotEmpty,
// } from 'class-validator';
// import { User } from 'src/modules/user/domain/entities/user.entity';
// import {
//   IntershipProcessMovement,
//   IntershipProcessStatus,
// } from '../../domain/entities/intershipProcess.entity';
// import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
// import { InternshipEvaluation } from 'src/modules/IntershipEvaluation/domain/entities/internshipEvaluation.entity';

// export class CreateIntershipProcessDTO {
//   @IsEnum(IntershipProcessMovement)
//   movimentacao: string;

//   @IsEnum(IntershipProcessStatus)
//   status: string;

//   @IsDate()
//   dataInicioProcesso: Date;

//   @IsDate()
//   dataFimProcesso: Date;

//   // @IsOptional()
//   // termoCompromisso?: TermCommitment;

//   @IsString()
//   id_aluno: string;

//   // @IsNotEmpty()
//   // user: User;

//   // avaliacaoEstagio: InternshipEvaluation[];
// }

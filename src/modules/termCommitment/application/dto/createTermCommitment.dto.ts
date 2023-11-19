import { Prisma, TermCommitment } from '@prisma/client';
import { IsString, IsDate } from 'class-validator';
import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
import { InternshipProcess } from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
// import { TermCommitment } from '../../domain/entities/termCommitment.entity';

export class CreateTermCommitmentDTO {
  @IsString()
  numApoliceSeguro: string;

  @IsString()
  nomeSeguradora: string;

  @IsString()
  profOrientador: string;

  @IsString()
  codSiape: string;

  @IsDate()
  dataInicioEstagio: Date;

  @IsDate()
  dataFimEstagio: Date;

  @IsDate()
  horaInicioEstagio: Date;

  @IsDate()
  horaFimEstagio: Date;

  @IsString()
  id_aluno: string;

  user?: User;

  @IsString()
  id_internshipGrantor: string;

  internshipGrantor?: Prisma.InternshipGrantorCreateNestedOneWithoutTermsCommitmentInput;

  @IsString()
  id_processoEstagio?: string;

  internshipProcess?: Prisma.InternshipProcessCreateNestedOneWithoutTermCommitmentInput;
}

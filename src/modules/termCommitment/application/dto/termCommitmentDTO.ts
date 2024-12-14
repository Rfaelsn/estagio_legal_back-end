import { Transform } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
// import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
// import { TermCommitment } from '../../domain/entities/termCommitment.entity';

export class TermCommitmentDTO {
  @IsString()
  Id: string;

  @IsString()
  numApoliceSeguro: string;

  @IsString()
  nomeSeguradora: string;

  @IsString()
  profOrientador: string;

  @IsString()
  codSiape: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dataInicioEstagio: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dataFimEstagio: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  horaInicioEstagio: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  horaFimEstagio: Date;

  @IsString()
  id_user: string;

  user?: User;

  // @IsString()
  // id_internshipGrantor: string;

  // internshipGrantor?: InternshipGrantor;
}

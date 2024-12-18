import { IsString, IsDate, IsOptional } from 'class-validator';
// import { InternshipGrantor } from 'src/modules/internshipGrantor/domain/entities/internshipGrantor.entity';
import { UserFilterDTO } from 'src/modules/user/application/dto/userFilter.dto';
// import { TermCommitment } from '../../domain/entities/termCommitment.entity';

export class TermCommitmentFilterDTO {
  @IsString()
  @IsOptional()
  numApoliceSeguro: string;

  @IsString()
  @IsOptional()
  nomeSeguradora: string;

  @IsString()
  @IsOptional()
  profOrientador: string;

  @IsString()
  @IsOptional()
  codSiape: string;

  @IsDate()
  @IsOptional()
  dataInicioEstagio: Date;

  @IsDate()
  @IsOptional()
  dataFimEstagio: Date;

  @IsDate()
  @IsOptional()
  horaInicioEstagio: Date;

  @IsDate()
  @IsOptional()
  horaFimEstagio: Date;

  @IsOptional()
  user: UserFilterDTO;

  //   @IsString()
  //   id_internshipGrantor: string;

  //   internshipGrantor?: InternshipGrantor;
}

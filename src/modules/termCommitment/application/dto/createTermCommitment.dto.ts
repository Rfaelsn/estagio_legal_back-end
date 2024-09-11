import { Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { IsTime } from 'src/shared/decorators/isTime.decorator';

export class CreateTermCommitmentDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  numApoliceSeguro?: string;

  @IsString()
  @IsOptional()
  nomeSeguradora?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dataInicioEstagio: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dataFimEstagio: Date;

  @IsTime()
  horaInicioEstagio: Date;

  @IsTime()
  horaFimEstagio: Date;

  @IsBoolean()
  isObrigatorio: boolean;

  @IsString()
  razaoSocialConcedente: string;

  @IsString()
  cnpjConcedente: string;

  @IsString()
  cepConcedente: string;

  @IsString()
  bairroConcedente: string;

  @IsString()
  cidadeConcedente: string;

  @IsString()
  ufConcedente: string;

  @IsString()
  enderecoConcedente: string;

  @IsString()
  emailConcedente: string;

  @IsString()
  representanteLegalConcedente: string;

  @IsString()
  funcaoRepresentanteLegalConcedente: string;

  @IsString()
  supervisor: string;

  @IsString()
  cargoSupervisor: string;

  @IsString()
  id_user: string;

  // @IsString()
  // id_internshipGrantor: string;
}

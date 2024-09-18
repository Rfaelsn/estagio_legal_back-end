import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { IsCNPJ } from 'src/shared/decorators/isCnpj.decorator';
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
  @IsNotEmpty()
  dataInicioEstagio: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  dataFimEstagio: Date;

  @IsNotEmpty()
  @IsTime()
  horaInicioEstagio: Date;

  @IsNotEmpty()
  @IsTime()
  horaFimEstagio: Date;

  @IsNotEmpty()
  @IsTime()
  jornadaSemanal: Date;

  @IsBoolean()
  @IsNotEmpty()
  isObrigatorio: boolean;

  @IsNumber()
  bolsaAuxilio: number;

  @IsNumber()
  auxilioTransporte: number;

  @IsString()
  @IsNotEmpty()
  razaoSocialConcedente: string;

  @IsCNPJ()
  @IsNotEmpty()
  cnpjConcedente: string;

  @IsString()
  @IsNotEmpty()
  cepConcedente: string;

  @IsString()
  @IsNotEmpty()
  bairroConcedente: string;

  @IsString()
  @IsNotEmpty()
  cidadeConcedente: string;

  @IsString()
  @IsNotEmpty()
  ufConcedente: string;

  @IsString()
  @IsNotEmpty()
  enderecoConcedente: string;

  @IsEmail()
  @IsNotEmpty()
  emailConcedente: string;

  @IsString()
  @IsNotEmpty()
  representanteLegalConcedente: string;

  @IsString()
  @IsNotEmpty()
  funcaoRepresentanteLegalConcedente: string;

  @IsString()
  @IsNotEmpty()
  supervisor: string;

  @IsString()
  @IsNotEmpty()
  cargoSupervisor: string;

  @IsString()
  @IsNotEmpty()
  id_user: string;

  // @IsString()
  // id_internshipGrantor: string;
}

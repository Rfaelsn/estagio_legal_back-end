import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
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
  dataInicioEstagio: any;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  dataFimEstagio: Date;

  @IsNotEmpty()
  @IsTime('toDate')
  horaInicioEstagio: Date;

  @IsNotEmpty()
  @IsTime('toDate')
  horaFimEstagio: Date;

  @IsNotEmpty()
  @IsNumber()
  jornadaSemanal: number;

  @IsBoolean()
  @IsNotEmpty()
  isObrigatorio: boolean;

  @IsNumber()
  bolsaAuxilio: number;

  @IsNumber()
  auxilioTransporte: number;

  @IsArray()
  @ArrayMinSize(5, { message: 'Você deve enviar exatamente 5 atividades' })
  @ArrayMaxSize(5, { message: 'Você deve enviar exatamente 5 atividades' })
  @IsString({ each: true, message: 'Cada atividade deve ser uma string' })
  @MaxLength(200, {
    each: true,
    message: 'Cada atividade deve ter no máximo 200 caracteres',
  })
  planoAtividadesEstagio: string[];

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

  @IsString()
  @IsOptional()
  termFilePathId?: string;

  // @IsString()
  // id_internshipGrantor: string;
}

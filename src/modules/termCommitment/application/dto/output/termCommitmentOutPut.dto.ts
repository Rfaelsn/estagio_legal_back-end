import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { UserAlunoOutputDTO } from 'src/modules/user/application/dto/output/userAlunoOutput.dto';

export class CreatedTermCommitmentOutputDTO {
  @IsString()
  @Expose()
  numApoliceSeguro: string;

  @IsString()
  @Expose()
  nomeSeguradora: string;

  @IsString()
  @Expose()
  profOrientador: string;

  @IsString()
  @Expose()
  codSiape: string;

  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  dataInicioEstagio: Date;

  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  dataFimEstagio: Date;

  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  horaInicioEstagio: Date;

  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  horaFimEstagio: Date;

  @IsDate()
  @Expose()
  @Transform(({ value }) => new Date(value))
  jornadaSemanal: Date;

  @IsBoolean()
  @Expose()
  isObrigatorio: boolean;

  @IsNumber()
  @Expose()
  bolsaAuxilio: number;

  @IsNumber()
  @Expose()
  auxilioTransporte: number;

  @IsString()
  @Expose()
  razaoSocialConcedente: string;

  @IsString()
  @Expose()
  cnpjConcedente: string;

  @IsString()
  @Expose()
  cepConcedente: string;

  @IsString()
  @Expose()
  bairroConcedente: string;

  @IsString()
  @Expose()
  cidadeConcedente: string;

  @IsString()
  @Expose()
  ufConcedente: string;

  @IsString()
  @Expose()
  enderecoConcedente: string;

  @IsString()
  @Expose()
  emailConcedente: string;

  @IsString()
  @Expose()
  representanteLegalConcedente: string;

  @IsString()
  @Expose()
  funcaoRepresentanteLegalConcedente: string;

  @IsString()
  @Expose()
  supervisor: string;

  @IsString()
  @Expose()
  cargoSupervisor: string;

  @Expose()
  @Type(() => UserAlunoOutputDTO)
  user: UserAlunoOutputDTO;
}

import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { UserAlunoOutputDTO } from 'src/modules/user/application/dto/output/userAlunoOutput.dto';
import { IsTime } from 'src/shared/decorators/isTime.decorator';

export class CreatedTermCommitmentOutputDTO {
  @IsString()
  @Expose()
  id?: string;

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

  @Expose()
  @IsTime('toTime')
  horaInicioEstagio: string;

  @Expose()
  @IsTime('toTime')
  horaFimEstagio: string;

  @Expose()
  @IsTime('toTime')
  jornadaSemanal: string;

  @IsBoolean()
  @Expose()
  isObrigatorio: boolean;

  @IsNumber()
  @Expose()
  bolsaAuxilio: number;

  @IsNumber()
  @Expose()
  auxilioTransporte: number;

  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  @Expose()
  planoAtividadesEstagio: string[];

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

  @IsString()
  @Expose()
  internshipProcessId: string;

  @Expose()
  createdHistory: any;

  @Expose()
  @Type(() => UserAlunoOutputDTO)
  user: UserAlunoOutputDTO;
}

import { Concedente, ProcessoEstagio } from '@prisma/client';
import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';

export class TermoCompromissoDTO {
  @IsString()
  id: string;

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

  @IsNotEmpty()
  user: User;

  @IsOptional()
  concedente?: Concedente;

  @IsNotEmpty()
  processoEstagio: ProcessoEstagio;
}

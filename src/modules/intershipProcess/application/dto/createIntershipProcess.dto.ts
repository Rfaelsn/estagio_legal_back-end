import { AvalicaoEstagio, TermoCompromisso } from '@prisma/client';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../domain/entities/intershipProcess.entity';

export class CreateIntershipProcessDTO {
  @IsEnum(IntershipProcessMovement)
  movimentacao: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsDate()
  dataInicioProcesso: Date;

  @IsDate()
  dataFimProcesso: Date;

  @IsOptional()
  termoCompromisso?: TermoCompromisso;

  @IsString()
  id_aluno: string;

  @IsNotEmpty()
  user: User;

  avaliacaoEstagio: AvalicaoEstagio[];
}

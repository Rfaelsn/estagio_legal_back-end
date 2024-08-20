import { IsEnum, IsString } from 'class-validator';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../domain/entities/intershipProcess.entity';

export class UpdateIntershipProcessDTO {
  @IsString()
  id: string;

  @IsEnum(IntershipProcessStatus)
  status: string;
}

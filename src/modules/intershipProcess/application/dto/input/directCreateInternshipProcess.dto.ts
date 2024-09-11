import {
  IsOptional,
  IsEnum,
  IsDate,
  IsString,
  isString,
} from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user.entity';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from '../../../domain/entities/intershipProcess.entity';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';

export class DirectCreateIntershipProcessDTO {
  @IsEnum(IntershipProcessMovement)
  movement: string;

  @IsEnum(IntershipProcessStatus)
  status: string;

  @IsString()
  id_user: string;

  @IsOptional()
  termCommitment?: CreateTermCommitmentDTO;

  @IsOptional()
  id_termCommitment?: string;
}

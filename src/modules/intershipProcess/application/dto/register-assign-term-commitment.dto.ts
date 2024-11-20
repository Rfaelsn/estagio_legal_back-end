import { IsEnum, IsString } from 'class-validator';
import { FileType } from 'src/modules/file/domain/entities/file.entity';
import { IntershipProcessStatus } from '../../domain/entities/intershipProcess.entity';

export class registerAssignTermCommitmentDto {
  @IsString()
  idInternshipProcess: string;

  @IsString()
  filePath: string;

  @IsEnum(FileType)
  fileType;
}

import { IsEnum, IsString } from 'class-validator';
import { FileType } from 'src/modules/file/domain/entities/file.entity';

export class registerAssignTermCommitmentDto {
  @IsString()
  idInternshipProcess: string;

  @IsString()
  filePath: string;

  @IsEnum(FileType)
  fileType;
}

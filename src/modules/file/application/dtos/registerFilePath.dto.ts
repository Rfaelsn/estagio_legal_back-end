import { IsEnum, IsString } from 'class-validator';
import { FileType } from '../../domain/entities/file.entity';

export class RegisterFilePathDto {
  @IsString()
  filePath: string;

  @IsEnum(FileType)
  fileType;
}

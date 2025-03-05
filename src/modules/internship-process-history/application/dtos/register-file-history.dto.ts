import { IsArray, IsString } from 'class-validator';

export class RegisterFileInHistoryDto {
  @IsString()
  idHistory: string;

  @IsArray()
  files: [{ fileId: string; fileType: string }];
}

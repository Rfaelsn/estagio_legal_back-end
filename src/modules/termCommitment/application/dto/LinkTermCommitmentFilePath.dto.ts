import { IsString } from 'class-validator';

export class LinkTermCommitmentFilePathDTO {
  @IsString()
  id: string;
  @IsString()
  termCommitmentFilePath: string;
}

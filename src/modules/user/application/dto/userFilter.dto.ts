import { IsOptional, IsString } from 'class-validator';

export class UserFilterDTO {
  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  cpf?: string | null;

  @IsOptional()
  @IsString()
  registration?: string | null;

  @IsOptional()
  @IsString()
  email?: string | null;

  @IsOptional()
  @IsString()
  telephone?: string | null;

  @IsOptional()
  @IsString()
  courseStudy?: string | null;
}

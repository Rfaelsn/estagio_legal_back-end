import { IsOptional, IsString } from 'class-validator';

export class InternshipGrantorFiltersDto {
  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  cnpj: string | null;
}

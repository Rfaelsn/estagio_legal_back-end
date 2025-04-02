import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindInternshipProcessByQueryDTO {
  @IsString()
  query: string;

  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  page: number;

  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  pageSize: number;
}

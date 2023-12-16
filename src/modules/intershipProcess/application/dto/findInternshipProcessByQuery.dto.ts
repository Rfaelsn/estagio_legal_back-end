import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindInternshipProcessByQueryDTO {
  @IsString()
  query: string;

  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  page?: number;

  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  pageSize?: number;
}

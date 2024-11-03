import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';

export interface InternshipProcessHistoryRepositoryInterface {
  registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void>;
}

import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';

export interface InternshipProcessHistoryServiceInterface {
  registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void>;
}

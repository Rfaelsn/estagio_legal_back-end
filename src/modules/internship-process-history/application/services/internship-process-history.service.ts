import { Injectable } from '@nestjs/common';
import { InternshipProcessHistoryRepository } from '../../adapters/repositories/internship-process-history.repository';
import { CreateInternshipProcessHistoryDto } from '../dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryServiceInterface } from '../../domain/ports/internship-process-history.service.port';

@Injectable()
export class InternshipProcessHistoryService
  implements InternshipProcessHistoryServiceInterface
{
  constructor(
    private readonly internshipProcessHistoryRepository: InternshipProcessHistoryRepository,
  ) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.registerHistory(
        createInternshipProcessHistoryDto,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

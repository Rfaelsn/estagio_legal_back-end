import { Injectable } from '@nestjs/common';

import { CreateInternshipProcessHistoryDto } from '../dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryServiceInterface } from '../../domain/ports/internship-process-history.service.port';
import { InternshipProcessHistoryRepository } from '../../adapters/repositories/internship-process-history.repository';
import { UpdateInternshipProcessHistoryDto } from '../dtos/update-internship-process-history.dto';

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

  async updateHistory(
    updateInternshipProcessHistoryDto: UpdateInternshipProcessHistoryDto,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.updateHistory(
        updateInternshipProcessHistoryDto,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

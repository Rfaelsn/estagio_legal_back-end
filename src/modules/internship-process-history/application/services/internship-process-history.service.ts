import { Injectable } from '@nestjs/common';

import { CreateInternshipProcessHistoryDto } from '../dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryServiceInterface } from '../../domain/ports/internship-process-history.service.port';
import { InternshipProcessHistoryRepository } from '../../adapters/repositories/internship-process-history.repository';
import { UpdateInternshipProcessHistoryDto } from '../dtos/update-internship-process-history.dto';
import { CreateHistoryWithFileDto } from '../dtos/create-history-with-file.dto';
import { RegisterFileInHistoryDto } from '../dtos/register-file-history.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class InternshipProcessHistoryService
  implements InternshipProcessHistoryServiceInterface
{
  constructor(
    private readonly internshipProcessHistoryRepository: InternshipProcessHistoryRepository,
  ) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.registerHistory(
        createInternshipProcessHistoryDto,
        prismaClientTransaction,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async registerHistoryWithFile(
    createHistoryWithFileDto: CreateHistoryWithFileDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.registerHistoryWithFile(
        createHistoryWithFileDto,
        prismaClientTransaction,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async updateHistory(
    updateInternshipProcessHistoryDto: UpdateInternshipProcessHistoryDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.updateHistory(
        updateInternshipProcessHistoryDto,
        prismaClientTransaction,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async registerFileInHistory(
    registerFileInHistoryDto: RegisterFileInHistoryDto,
  ) {
    return;
  }

  async getHistoriesByInternshipProcessId(internshipProcessId: string) {
    try {
      return this.internshipProcessHistoryRepository.getHistoriesByInternshipProcessId(
        internshipProcessId,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

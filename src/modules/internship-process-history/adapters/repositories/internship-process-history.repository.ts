import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';
import { connect } from 'http2';
import { InternshipProcessHistoryRepositoryInterface } from '../../domain/ports/internship-process-history.repository.port';

@Injectable()
export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void> {
    const { idInternshipProcess, ...rest } = createInternshipProcessHistoryDto;

    await this.prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },
      },
    });
  }
}

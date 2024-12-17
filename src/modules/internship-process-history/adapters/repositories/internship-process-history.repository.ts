import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryRepositoryInterface } from '../../domain/ports/internship-process-history.repository.port';
import { UpdateInternshipProcessHistoryDto } from '../../application/dtos/update-internship-process-history.dto';

@Injectable()
export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void> {
    const { idInternshipProcess, fileId, ...rest } =
      createInternshipProcessHistoryDto;

    await this.prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },
        ...(fileId && {
          file: {
            connect: {
              id: fileId,
            },
          },
        }),
      },
    });
  }

  async updateHistory(
    updateInternshipProcessHistoryDto: UpdateInternshipProcessHistoryDto,
  ): Promise<void> {
    await this.prisma.internshipProcessHistory.updateMany({
      where: {
        idInternshipProcess:
          updateInternshipProcessHistoryDto.idInternshipProcess,
      },
      data: updateInternshipProcessHistoryDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryRepositoryInterface } from '../../domain/ports/internship-process-history.repository.port';
import { UpdateInternshipProcessHistoryDto } from '../../application/dtos/update-internship-process-history.dto';
import { CreateHistoryWithFileDto } from '../../application/dtos/create-history-with-file.dto';
import { RegisterFileInHistoryDto } from '../../application/dtos/register-file-history.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = prismaClientTransaction || this.prisma;
    const {
      idInternshipProcess,
      fileIds: fileIds,
      ...rest
    } = createInternshipProcessHistoryDto;

    await prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },
        ...(fileIds && {
          files: {
            connect: fileIds.map((fileId) => ({ id: fileId })),
          },
        }),
      },
    });
  }

  async registerHistoryWithFile(
    createHistoryWithFileDto: CreateHistoryWithFileDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = prismaClientTransaction || this.prisma;
    const { idInternshipProcess, files, ...rest } = createHistoryWithFileDto;

    await prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },

        files: {
          connect: files.map((file) => ({ id: file.fileId })),
        },
      },
    });
  }

  async updateHistory(
    updateInternshipProcessHistoryDto: UpdateInternshipProcessHistoryDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = prismaClientTransaction || this.prisma;

    await prisma.internshipProcessHistory.updateMany({
      where: {
        idInternshipProcess:
          updateInternshipProcessHistoryDto.idInternshipProcess,
      },
      data: updateInternshipProcessHistoryDto,
    });
  }

  async getHistoriesByInternshipProcessId(internshipProcessId: string) {
    return this.prisma.internshipProcessHistory.findMany({
      where: {
        idInternshipProcess: internshipProcessId,
      },
      include: {
        files: true,
      },
    });
  }

  async registerFileInHistory(
    registerFileInHistoryDto: RegisterFileInHistoryDto,
  ): Promise<void> {
    await this.prisma.internshipProcessHistory.update({
      where: {
        id: registerFileInHistoryDto.idHistory,
      },
      data: {
        files: {
          connectOrCreate: registerFileInHistoryDto.files.map((file) => ({
            where: {
              filePath: file.fileId,
            },
            create: {
              filePath: file.fileId,
              fileType: file.fileType,
            },
          })),
        },
      },
    });
  }
}

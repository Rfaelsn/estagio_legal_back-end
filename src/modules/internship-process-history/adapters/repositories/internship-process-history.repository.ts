import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessHistoryDto } from '../../application/dtos/create-internship-process-history.dto';
import { InternshipProcessHistoryRepositoryInterface } from '../../domain/ports/internship-process-history.repository.port';
import { UpdateInternshipProcessHistoryDto } from '../../application/dtos/update-internship-process-history.dto';
import { CreateHistoryWithFileDto } from '../../application/dtos/create-history-with-file.dto';

@Injectable()
export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async registerHistory(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryDto,
  ): Promise<void> {
    const {
      idInternshipProcess,
      fileIds: fileIds,
      ...rest
    } = createInternshipProcessHistoryDto;

    await this.prisma.internshipProcessHistory.create({
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
  ): Promise<void> {
    const { idInternshipProcess, files, ...rest } = createHistoryWithFileDto;

    await this.prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },

        files: {
          connectOrCreate: files.map((file) => ({
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

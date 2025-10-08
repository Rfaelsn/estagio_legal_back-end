import { PrismaService } from 'src/config/prisma/prisma.service';
import { RegisterFilePathDto } from '../../application/dtos/registerFilePath.dto';
import { Injectable } from '@nestjs/common';
import { FileEntity, FileType } from '../../domain/entities/file.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFile(downloadFileDto: { fileId: string; fileType: FileType }) {
    return this.prisma.file.findUnique({
      where: {
        id: downloadFileDto.fileId,
        fileType: downloadFileDto.fileType,
      },
    });
  }

  async registerFilePath(
    registerFilePathDto: RegisterFilePathDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<FileEntity> {
    const prisma = prismaClientTransaction || this.prisma;
    return await prisma.file.create({
      data: registerFilePathDto,
    });
  }

  async registerFilePaths(
    registerFilePathDto: RegisterFilePathDto[],
    prismaClientTransaction?: Prisma.TransactionClient,
  ) {
    const prisma = prismaClientTransaction || this.prisma;
    return await prisma.file.createManyAndReturn({
      data: registerFilePathDto,
    });
  }
}

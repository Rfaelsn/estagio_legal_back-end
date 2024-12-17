import { PrismaService } from 'src/config/prisma/prisma.service';
import { RegisterFilePathDto } from '../../application/dtos/registerFilePath.dto';
import { Injectable } from '@nestjs/common';
import { FileEntity } from '../../domain/entities/file.entity';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerFilePath(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<FileEntity> {
    return await this.prisma.file.create({
      data: registerFilePathDto,
    });
  }
}

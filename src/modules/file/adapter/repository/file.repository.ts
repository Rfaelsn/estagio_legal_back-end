import { PrismaService } from 'src/config/prisma/prisma.service';
import { RegisterFilePathDto } from '../../application/dtos/registerFilePath.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerFilePath(
    registerFilePathDto: RegisterFilePathDto,
  ): Promise<void> {
    const { internshipProcessId, ...rest } = registerFilePathDto;
    await this.prisma.file.create({
      data: {
        ...rest,
        internshipProcessId: internshipProcessId,
      },
    });
  }
}

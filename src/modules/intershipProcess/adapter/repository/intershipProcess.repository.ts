import { Injectable } from '@nestjs/common';
import { InternshipProcess, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IInternshipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';

@Injectable()
export class InternshipProcessRepository
  implements IInternshipProcessRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIntershipProcessDTO: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess> {
    const data: Prisma.InternshipProcessCreateInput = {
      ...createIntershipProcessDTO,
    };
    const newIntershipProcess = await this.prisma.internshipProcess.create({
      data,
    });

    return newIntershipProcess;
  }
}

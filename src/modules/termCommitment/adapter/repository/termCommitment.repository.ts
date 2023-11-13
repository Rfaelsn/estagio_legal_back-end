import { Injectable } from '@nestjs/common';
import { Prisma, ProcessoEstagio, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IIntershipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';

@Injectable()
export class TermCommitmentRepository implements IIntershipProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIntershipProcessDTO: CreateIntershipProcessDTO,
  ): Promise<ProcessoEstagio> {
    const data: Prisma.ProcessoEstagioCreateInput = {
      ...createIntershipProcessDTO,
    };
    const newIntershipProcess = await this.prisma.processoEstagio.create({
      data,
    });

    return newIntershipProcess;
  }
}

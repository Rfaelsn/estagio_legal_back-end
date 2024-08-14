import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IInternshipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { CreateIntershipProcessDTO } from '../../application/dto/input/intershipProcess.dto';
import { InternshipProcess } from '../../domain/entities/intershipProcess.entity';

import { InternshipProcessFilterDTO } from '../../application/dto/internshipProcessFilter.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';
import { plainToInstance } from 'class-transformer';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';

@Injectable()
export class InternshipProcessRepository
  implements IInternshipProcessRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIntershipProcessDTO: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess> {
    const newIntershipProcess = await this.prisma.internshipProcess.create({
      data: {
        movement: createIntershipProcessDTO.movement,
        status: createIntershipProcessDTO.status,
        startDateProcess: new Date(),
        id_user: createIntershipProcessDTO.id_user,
        id_termCommitment: createIntershipProcessDTO.id_termCommitment,
      },
      include: {
        termCommitment: true,
      },
    });

    return newIntershipProcess;
  }

  async filter(
    intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ): Promise<InternshipProcess[]> {
    const {
      user,
      termCommitment,
      page,
      pageSize,
      startDateProcessRangeStart,
      startDateProcessRangeEnd,
      endDateProcessRangeStart,
      endDateProcessRangeEnd,
      ...rest
    } = intershipProcessFilterDTO;

    const take: number = pageSize || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where: {
        ...rest,
        startDateProcess: {
          gte: startDateProcessRangeStart,
          lte: startDateProcessRangeEnd,
        },
        endDateProcess: {
          gte: endDateProcessRangeStart,
          lte: endDateProcessRangeEnd,
        },
        user: { ...user },
        termCommitment: { ...termCommitment },
      },
      include: {
        user: true,
        termCommitment: true,
      },
      take,
      skip,
    });

    return internshipProcess;
  }

  async findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]> {
    const { query, page, pageSize } = findInternshipProcessByQueryDTO;

    // Lógica de paginação
    const take: number = pageSize || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where: {
        OR: [
          { movement: { contains: query } },
          { status: { contains: query } },
          { user: { name: { contains: query } } },
          { user: { registration: { contains: query } } },
          { user: { courseStudy: { contains: query } } },
        ],
      },
      include: {
        user: true,
        termCommitment: true,
      },
      take,
      skip,
    });

    return internshipProcess;
  }

  async findById(id: string): Promise<InternshipProcess> {
    const internshipProcess = await this.prisma.internshipProcess.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        termCommitment: true,
      },
    });

    return internshipProcess;
  }
}

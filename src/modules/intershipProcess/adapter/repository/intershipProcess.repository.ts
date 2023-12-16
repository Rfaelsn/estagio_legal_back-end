import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IInternshipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';
import { InternshipProcess } from '../../domain/entities/intershipProcess.entity';

import { InternshipProcessFilterDTO } from '../../application/dto/internshipProcessFilter.dto';
import { FindInternshipProcessByQueryDTO } from '../../application/dto/findInternshipProcessByQuery.dto';

@Injectable()
export class InternshipProcessRepository
  implements IInternshipProcessRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIntershipProcessDTO: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess> {
    const { id_internshipGrantor, ...termFiltrado } =
      createIntershipProcessDTO.termCommitment;

    const termCommitment: Prisma.TermCommitmentCreateInput = {
      ...termFiltrado,
      user: {
        connect: {
          id: createIntershipProcessDTO.id_user,
        },
      },
      internshipGrantor: {
        connect: {
          id: createIntershipProcessDTO.termCommitment.id_internshipGrantor,
        },
      },
    };

    const { id_user, ...rest } = createIntershipProcessDTO;

    const data: Prisma.InternshipProcessCreateInput = {
      ...rest,
      user: {
        connect: {
          id: createIntershipProcessDTO.id_user,
        },
      },
      termCommitment: {
        create: {
          ...termCommitment,
        },
      },
      internshipEvaluation: {},
    };

    const newIntershipProcess = await this.prisma.internshipProcess.create({
      data,
      include: {
        internshipEvaluation: true,
        user: true,
        termCommitment: true,
      },
    });

    return newIntershipProcess;
  }

  async filter(
    intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ): Promise<InternshipProcess[]> {
    const { user, termCommitment, page, pageSize, ...rest } =
      intershipProcessFilterDTO;

    // Lógica de paginação
    const take: number = pageSize || 10; // Número padrão de itens por página
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where: {
        ...rest,
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

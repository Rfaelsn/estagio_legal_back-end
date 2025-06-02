import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessDTO } from '../../application/dto/input/internshipProcess.dto';
import {
  InternshipProcessEntity,
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';
import { InternshipProcessRepositoryPort } from '../../domain/port/internshipProcessRepository.port';

import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { UpdateInternshipProcessDTO } from '../../application/dto/updateInternshipProcess.dto';

@Injectable()
export class InternshipProcessRepository
  implements InternshipProcessRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInternshipProcessDTO: CreateInternshipProcessDTO,
  ): Promise<InternshipProcessEntity> {
    const newInternshipProcess = await this.prisma.internshipProcess.create({
      data: {
        movement: createInternshipProcessDTO.movement,
        status: createInternshipProcessDTO.status,
        startDateProcess: new Date(),
        id_user: createInternshipProcessDTO.id_user,
        id_termCommitment: createInternshipProcessDTO.id_termCommitment,
      },
      include: {
        termCommitment: true,
        statusHistory: true,
      },
    });

    return newInternshipProcess;
  }

  async updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
  ): Promise<boolean> {
    let prismaData: Prisma.InternshipProcessUpdateInput;
    if (updateInternshipProcessStatusDTO.status === 'CONCLUÍDO') {
      prismaData = {
        status: updateInternshipProcessStatusDTO.status,
        movement: updateInternshipProcessStatusDTO.movement,
        endDateProcess: new Date(),
      };
    } else {
      prismaData = {
        status: updateInternshipProcessStatusDTO.status,
        movement: updateInternshipProcessStatusDTO.movement,
      };
    }
    await this.prisma.internshipProcess.update({
      where: { id: updateInternshipProcessStatusDTO.id },
      data: prismaData,
    });

    return true;
  }

  async filter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
  ): Promise<InternshipProcessEntity[]> {
    const {
      user,
      termCommitment,
      page,
      perPage,
      startDateProcessRangeStart,
      startDateProcessRangeEnd,
      endDateProcessRangeStart,
      endDateProcessRangeEnd,
      ...rest
    } = internshipProcessFilterDTO;

    const take: number = perPage || 10;
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
      orderBy: {
        createdAt: 'desc',
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

  async filterByStudent(
    internshipProcessFilterByStudentDto: InternshipProcessFilterDto,
    userId: string,
  ): Promise<InternshipProcessEntity[]> {
    const {
      termCommitment,
      page,
      perPage,
      movement,
      status,
      startDateProcessRangeStart,
      startDateProcessRangeEnd,
      endDateProcessRangeStart,
      endDateProcessRangeEnd,
      internshipGrantor,
    } = internshipProcessFilterByStudentDto;

    const take: number = perPage || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where: {
        startDateProcess: {
          gte: startDateProcessRangeStart,
          lte: startDateProcessRangeEnd,
        },
        endDateProcess: {
          gte: endDateProcessRangeStart,
          lte: endDateProcessRangeEnd,
        },
        movement: movement,
        status: status,
        user: { id: userId, courseStudy: termCommitment.courseStudy },
        termCommitment: {
          grantingCompanyCNPJ: internshipGrantor.cnpj,
          grantingCompanyName: internshipGrantor.name,
          internshipStartDate: {
            gte: termCommitment.startDateInitialSearchInterval,
            lte: termCommitment.startDateFinalSearchInterval,
          },
          internshipEndDate: {
            gte: termCommitment.endDateInitialSearchInterval,
            lte: termCommitment.endDateFinalSearchInterval,
          },
          isMandatory: termCommitment.isMandatory,
        },
      },
      include: {
        user: true,
        termCommitment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    return internshipProcess;
  }

  async findEligibleProcessesForCompletion(
    userId: string,
    page: number,
    pageSize: number,
  ) {
    const take: number = pageSize || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where: {
        user: { id: userId },
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.COMPLETED,
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

  async findById(id: string): Promise<InternshipProcessEntity> {
    const internshipProcess = await this.prisma.internshipProcess.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        termCommitment: true,
        statusHistory: {
          include: {
            files: true,
          },
        },
      },
    });

    return internshipProcess;
  }
}

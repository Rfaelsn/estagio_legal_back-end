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
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity> {
    const prisma = prismaClientTransaction || this.prisma;
    const newInternshipProcess = await prisma.internshipProcess.create({
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
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const prisma = prismaClientTransaction || this.prisma;
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
    await prisma.internshipProcess.update({
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
    const { page, perPage } = internshipProcessFilterByStudentDto;

    const where = this.constructFilterWhere(
      internshipProcessFilterByStudentDto,
      userId,
    );

    const take: number = perPage || 10;
    const skip: number = page ? (page - 1) * take : 0;

    const internshipProcess = await this.prisma.internshipProcess.findMany({
      where,
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

  async isElegibleForCompletion(
    internshipProcessId: string,
    userId: string,
  ): Promise<boolean> {
    const internshipProcess = await this.prisma.internshipProcess.findFirst({
      where: {
        id: internshipProcessId,
        user: { id: userId },
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.COMPLETED,
      },
    });

    return !!internshipProcess;
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

  private constructFilterWhere(
    internshipProcessFilterByStudentDto: InternshipProcessFilterDto,
    userId: string,
  ): any {
    const {
      termCommitment,
      movement,
      status,
      startDateProcessRangeStart,
      startDateProcessRangeEnd,
      endDateProcessRangeStart,
      endDateProcessRangeEnd,
      internshipGrantor,
    } = internshipProcessFilterByStudentDto;
    const where: any = {};

    if (
      startDateProcessRangeStart != null ||
      startDateProcessRangeEnd != null
    ) {
      where.startDateProcess = {
        ...(startDateProcessRangeStart != null && {
          gte: new Date(startDateProcessRangeStart),
        }),
        ...(startDateProcessRangeEnd != null && {
          lte: new Date(startDateProcessRangeEnd),
        }),
      };
    }

    if (endDateProcessRangeStart != null || endDateProcessRangeEnd != null) {
      where.endDateProcess = {
        ...(endDateProcessRangeStart != null && {
          gte: new Date(endDateProcessRangeStart),
        }),
        ...(endDateProcessRangeEnd != null && {
          lte: new Date(endDateProcessRangeEnd),
        }),
      };
    }

    if (movement != null) {
      where.movement = movement;
    }

    if (status != null) {
      where.status = status;
    }

    where.user = { id: userId };

    if (termCommitment?.courseStudy != null) {
      where.user.courseStudy = termCommitment.courseStudy;
    }

    const termCommitmentWhere: any = {};

    if (internshipGrantor) {
      if (internshipGrantor.cnpj != null) {
        termCommitmentWhere.grantingCompanyCNPJ = internshipGrantor.cnpj;
      }
      if (internshipGrantor.name != null) {
        termCommitmentWhere.grantingCompanyName = internshipGrantor.name;
      }
    }

    if (termCommitment) {
      if (
        termCommitment.startDateInitialSearchInterval != null ||
        termCommitment.startDateFinalSearchInterval != null
      ) {
        termCommitmentWhere.internshipStartDate = {
          ...(termCommitment.startDateInitialSearchInterval != null && {
            gte: new Date(termCommitment.startDateInitialSearchInterval),
          }),
          ...(termCommitment.startDateFinalSearchInterval != null && {
            lte: new Date(termCommitment.startDateFinalSearchInterval),
          }),
        };
      }

      if (
        termCommitment.endDateInitialSearchInterval != null ||
        termCommitment.endDateFinalSearchInterval != null
      ) {
        termCommitmentWhere.internshipEndDate = {
          ...(termCommitment.endDateInitialSearchInterval != null && {
            gte: new Date(termCommitment.endDateInitialSearchInterval),
          }),
          ...(termCommitment.endDateFinalSearchInterval != null && {
            lte: new Date(termCommitment.endDateFinalSearchInterval),
          }),
        };
      }

      if (termCommitment.isMandatory != null) {
        termCommitmentWhere.isMandatory = termCommitment.isMandatory;
      }
    }

    if (Object.keys(termCommitmentWhere).length > 0) {
      where.termCommitment = termCommitmentWhere;
    }

    return where;
  }
}

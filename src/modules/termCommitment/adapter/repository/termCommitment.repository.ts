import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../../application/dto/LinkTermCommitmentFilePath.dto';
import { TermCommitmentEntity } from '../../domain/entities/termCommitment.entity';
import { ITermCommitmentRepository } from '../../domain/port/ITermCommitmentRepository.port';
import { UpdateTermInfoDto } from '../../application/dto/updateTermInfo.dto';

@Injectable()
export class TermCommitmentRepository implements ITermCommitmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTermCommitmentDTO: CreateTermCommitmentDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<TermCommitmentEntity> {
    const prisma = prismaClientTransaction || this.prisma;
    const { id_user, ...restTermCommitment } = createTermCommitmentDTO;
    const filteredTermCommitment = restTermCommitment;
    const data: Prisma.TermCommitmentCreateInput = {
      ...filteredTermCommitment,
      internshipActivityPlan: JSON.stringify(
        filteredTermCommitment.internshipActivityPlan,
      ),
      user: {
        connect: {
          id: createTermCommitmentDTO.id_user,
        },
      },
    };

    const newTermCommitment = await prisma.termCommitment.create({
      data,
      include: {
        user: true,
      },
    });

    return newTermCommitment;
  }

  async linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    await this.prisma.termCommitment.update({
      where: { id: linkTermCommitmentFilePathDTO.id },
      data: { filePath: linkTermCommitmentFilePathDTO.termCommitmentFilePath },
    });
  }

  async update(
    internshipProcessId: string,
    updateTermInfoDto: UpdateTermInfoDto,
    prismaClientTransaction?: Prisma.TransactionClient,
  ) {
    const prisma = prismaClientTransaction || this.prisma;
    const internshipProcess = await prisma.internshipProcess.findUnique({
      where: { id: internshipProcessId },
      select: { id_termCommitment: true },
    });

    if (!internshipProcess?.id_termCommitment) {
      throw new Error(
        'Termo de compromisso não encontrado para este processo.',
      );
    }

    const data = {
      ...updateTermInfoDto,
      internshipActivityPlan: JSON.stringify(
        updateTermInfoDto.internshipActivityPlan,
      ),
    };

    return await prisma.termCommitment.update({
      where: { id: internshipProcess.id_termCommitment },
      data,
      include: {
        user: true,
      },
    });
  }

  async findTermsUserInIntervalDates(
    idUser: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TermCommitmentEntity[]> {
    return this.prisma.termCommitment.findMany({
      where: {
        id_user: idUser,
        AND: [
          {
            internshipStartDate: {
              lte: endDate,
            },
          },
          {
            internshipEndDate: {
              gte: startDate,
            },
          },
        ],
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ITermCommitmentRepository } from '../../domain/port/ITermCommitmentRepository';
import { TermCommitmentEntity } from '../../domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';

@Injectable()
export class TermCommitmentRepository implements ITermCommitmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTermCommitmentDTO: CreateTermCommitmentDTO,
  ): Promise<TermCommitmentEntity> {
    const data: Prisma.TermCommitmentCreateInput = {
      ...createTermCommitmentDTO,
      user: {
        connect: {
          id: createTermCommitmentDTO.id_aluno,
        },
      },
      internshipGrantor: {
        connect: {
          id: createTermCommitmentDTO.id_internshipGrantor,
        },
      },
      internshipProcess: {
        connect: {
          id: createTermCommitmentDTO.id_processoEstagio,
        },
      },
    };

    const newTermCommitment = await this.prisma.termCommitment.create({
      data,
      include: {
        user: true,
        internshipGrantor: true,
        internshipProcess: true,
      },
    });

    return newTermCommitment;
  }
}

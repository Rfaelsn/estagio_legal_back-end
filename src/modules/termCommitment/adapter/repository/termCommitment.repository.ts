import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ITermCommitmentRepository } from '../../domain/port/ITermCommitmentRepository.port';
import { TermCommitment } from '../../domain/entities/termCommitment.entity';
import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TermCommitmentRepository implements ITermCommitmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTermCommitmentDTO: CreateTermCommitmentDTO,
  ): Promise<TermCommitment> {
    const { id_user, id_internshipGrantor, ...restTermCommitment } =
      createTermCommitmentDTO;
    const filteredTermCommitment = restTermCommitment;
    const data: Prisma.TermCommitmentCreateInput = {
      ...filteredTermCommitment,
      user: {
        connect: {
          id: createTermCommitmentDTO.id_user,
        },
      },
      internshipGrantor: {
        connect: {
          id: createTermCommitmentDTO.id_internshipGrantor,
        },
      },
    };

    const newTermCommitment = await this.prisma.termCommitment.create({
      data: createTermCommitmentDTO,
      include: {
        user: true,
      },
    });

    // const newTermCommitment = await this.prisma.termCommitment.create({
    //   data,
    //   include: {
    //     user: true,
    //     //internshipGrantor: true,
    //     //internshipProcess: true,
    //   },
    // });

    return newTermCommitment;
  }
}

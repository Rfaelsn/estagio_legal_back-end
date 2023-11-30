import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IInternshipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { CreateIntershipProcessDTO } from '../../application/dto/createIntershipProcess.dto';
import { InternshipProcess } from '../../domain/entities/intershipProcess.entity';

@Injectable()
export class InternshipProcessRepository
  implements IInternshipProcessRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIntershipProcessDTO: CreateIntershipProcessDTO,
  ): Promise<InternshipProcess> {
    const termCommitment: Prisma.TermCommitmentCreateInput = {
      ...createIntershipProcessDTO.termCommitment,
      user: {
        connect: {
          id: createIntershipProcessDTO.idUser,
        },
      },
      internshipGrantor: {
        connect: {
          id: createIntershipProcessDTO.idInternshipGrantor,
        },
      },
    };

    const { idUser, idInternshipGrantor, ...rest } = createIntershipProcessDTO;

    const data: Prisma.InternshipProcessCreateInput = {
      ...rest,
      user: {
        connect: {
          id: createIntershipProcessDTO.idUser,
        },
      },
      termCommitment: {
        create: {
          ...termCommitment,
        },
      },
      internshipEvaluation: {},
    };

    console.log(data);

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
}

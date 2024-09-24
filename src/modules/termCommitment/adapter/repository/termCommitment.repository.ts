import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateTermCommitmentDTO } from '../../application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../../application/dto/LinkTermCommitmentFilePath.dto';
import { TermCommitment } from '../../domain/entities/termCommitment.entity';
import { ITermCommitmentRepository } from '../../domain/port/ITermCommitmentRepository.port';

@Injectable()
export class TermCommitmentRepository implements ITermCommitmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTermCommitmentDTO: CreateTermCommitmentDTO,
  ): Promise<TermCommitment> {
    const { id_user, ...restTermCommitment } = createTermCommitmentDTO;
    const filteredTermCommitment = restTermCommitment;
    const data: Prisma.TermCommitmentCreateInput = {
      ...filteredTermCommitment,
      planoAtividadesEstagio: JSON.stringify(
        filteredTermCommitment.planoAtividadesEstagio,
      ),
      user: {
        connect: {
          id: createTermCommitmentDTO.id_user,
        },
      },
      // internshipGrantor: {
      //   connect: {
      //     id: createTermCommitmentDTO.id_internshipGrantor,
      //   },
      // },
    };

    const newTermCommitment = await this.prisma.termCommitment.create({
      data,
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

  async linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    await this.prisma.termCommitment.update({
      where: { id: linkTermCommitmentFilePathDTO.id },
      data: { filePath: linkTermCommitmentFilePathDTO.termCommitmentFilePath },
    });
  }
}

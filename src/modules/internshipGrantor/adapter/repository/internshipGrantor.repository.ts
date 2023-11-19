import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IInternshipGrantorRepository } from '../../domain/port/IInternshipGrantorRepository.port';
import { CreateInternshipGrantorDTO } from '../../application/dto/createInternshipGrantor.dto';
import { InternshipGrantor } from '../../domain/entities/internshipGrantor.entity';

@Injectable()
export class InternshipGrantorRepository
  implements IInternshipGrantorRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    internshipGrantorDTO: CreateInternshipGrantorDTO,
  ): Promise<InternshipGrantor> {
    const data: Prisma.InternshipGrantorCreateInput = {
      ...internshipGrantorDTO,
    };

    const newTermCommitment = await this.prisma.internshipGrantor.create({
      data,
    });

    return newTermCommitment;
  }
}

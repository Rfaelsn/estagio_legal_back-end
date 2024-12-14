import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateInternshipProcessHistoryByFuncionarioDto } from '../../application/dtos/create-internship-process-history-by-funcionario.dto';
import { InternshipProcessHistoryRepositoryInterface } from '../../domain/ports/internship-process-history.repository.port';
import { CreateInternshipProcessHistoryByAlunoDto } from '../../application/dtos/create-internship-process-history-by-aluno.dto';

@Injectable()
export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async registerHistoryByFuncionario(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryByFuncionarioDto,
  ): Promise<void> {
    const { idInternshipProcess, ...rest } = createInternshipProcessHistoryDto;

    await this.prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },
      },
    });
  }

  async registerHistoryByAluno(
    createInternshipProcessHistoryByAlunoDto: CreateInternshipProcessHistoryByAlunoDto,
  ): Promise<void> {
    const { idInternshipProcess, ...rest } =
      createInternshipProcessHistoryByAlunoDto;

    await this.prisma.internshipProcessHistory.create({
      data: {
        ...rest,
        internshipProcess: {
          connect: {
            id: idInternshipProcess,
          },
        },
      },
    });
  }
}

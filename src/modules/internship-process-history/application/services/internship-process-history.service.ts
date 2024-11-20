import { Injectable } from '@nestjs/common';

import { CreateInternshipProcessHistoryByFuncionarioDto } from '../dtos/create-internship-process-history-by-funcionario.dto';
import { InternshipProcessHistoryServiceInterface } from '../../domain/ports/internship-process-history.service.port';
import { InternshipProcessHistoryRepository } from '../../adapters/repositories/internship-process-history.repository';
import { CreateInternshipProcessHistoryByAlunoDto } from '../dtos/create-internship-process-history-by-aluno.dto';

@Injectable()
export class InternshipProcessHistoryService
  implements InternshipProcessHistoryServiceInterface
{
  constructor(
    private readonly internshipProcessHistoryRepository: InternshipProcessHistoryRepository,
  ) {}

  async registerHistoryByFuncionario(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryByFuncionarioDto,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.registerHistoryByFuncionario(
        createInternshipProcessHistoryDto,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async registerHistoryByAluno(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryByAlunoDto,
  ): Promise<void> {
    try {
      await this.internshipProcessHistoryRepository.registerHistoryByFuncionario(
        createInternshipProcessHistoryDto,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

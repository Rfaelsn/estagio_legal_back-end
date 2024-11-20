import { CreateInternshipProcessHistoryByFuncionarioDto } from '../../application/dtos/create-internship-process-history-by-funcionario.dto';

export interface InternshipProcessHistoryRepositoryInterface {
  registerHistoryByFuncionario(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryByFuncionarioDto,
  ): Promise<void>;
}

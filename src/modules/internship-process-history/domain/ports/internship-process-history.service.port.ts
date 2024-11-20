import { CreateInternshipProcessHistoryByFuncionarioDto } from '../../application/dtos/create-internship-process-history-by-funcionario.dto';

export interface InternshipProcessHistoryServiceInterface {
  registerHistoryByFuncionario(
    createInternshipProcessHistoryDto: CreateInternshipProcessHistoryByFuncionarioDto,
  ): Promise<void>;
}

import { Prisma } from '@prisma/client';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class FindInternshipProcessByIdUsecase {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(id: string, prismaClientTransaction?: Prisma.TransactionClient) {
    try {
      const intershipProcess = await this.intershipProcessRepository.findById(
        id,
        prismaClientTransaction,
      );

      return intershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

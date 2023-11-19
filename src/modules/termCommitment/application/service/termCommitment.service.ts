import { Injectable } from '@nestjs/common';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { CreateTermCommitmentUsecase } from '../../domain/usecase/createTermCommitment.usecase';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';

@Injectable()
export class TermCommitmentService {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepository,
  ) {}

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const createIntershipProcessUsecase = new CreateTermCommitmentUsecase(
      this.termCommitmentRepository,
    );
    const intershipProcess = await createIntershipProcessUsecase.handle(
      createTermCommitmentDTO,
    );
    return intershipProcess;
  }

  // async getUserById(id: string): Promise<IntershipProcess> {
  //   const findUserUsecase = new FindUserByIdUsecase(
  //     this.intershipProcessRepository,
  //   );
  //   const user = await findUserUsecase.handle(id);
  //   return user;
  // }
}

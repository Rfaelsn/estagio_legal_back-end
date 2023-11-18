import { Injectable } from '@nestjs/common';
import { CreateIntershipProcessDTO } from '../dto/createIntershipProcess.dto';
import { CreateIntershipProcessUsecase } from '../../domain/usecase/creatIntershipProcess.usecase';
import { InternshipProcessRepository } from '../../adapter/repository/intershipProcess.repository';

@Injectable()
export class InternshipProcessService {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepository,
  ) {}

  async create(createIntershipProcessDTO: CreateIntershipProcessDTO) {
    const createIntershipProcessUsecase = new CreateIntershipProcessUsecase(
      this.intershipProcessRepository,
    );
    const intershipProcess = await createIntershipProcessUsecase.handle(
      createIntershipProcessDTO,
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

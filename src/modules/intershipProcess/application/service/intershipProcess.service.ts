import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateIntershipProcessDTO } from '../dto/createIntershipProcess.dto';
import { CreateIntershipProcessUsecase } from '../../domain/usecase/creatIntershipProcessUsecase';
import { IIntershipProcessRepository } from '../../domain/port/intershipProcessRepository.port';
import { IntershipProcess } from '../../domain/entities/intershipProcess.entity';

@Injectable()
export class IntershipProcessService {
  constructor(
    private readonly intershipProcessRepository: IIntershipProcessRepository,
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

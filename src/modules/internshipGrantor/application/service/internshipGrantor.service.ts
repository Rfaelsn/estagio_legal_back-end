import { Injectable } from '@nestjs/common';

import { IInternshipGrantorRepository } from '../../domain/port/IInternshipGrantorRepository.port';
import { CreateInternshipGrantorDTO } from '../dto/createInternshipGrantor.dto';
import { CreateInternshipGrantorUsecase } from '../../domain/usecase/createInternshipGrantor.usecase';
import { InternshipGrantorRepository } from '../../adapter/repository/internshipGrantor.repository';

@Injectable()
export class InternshipGrantorService {
  constructor(
    private readonly internshipGrantorRepository: InternshipGrantorRepository,
  ) {}

  async create(createInternshipGrantorDTO: CreateInternshipGrantorDTO) {
    const createIntershipGrantorUsecase = new CreateInternshipGrantorUsecase(
      this.internshipGrantorRepository,
    );
    const intershipProcess = await createIntershipGrantorUsecase.handle(
      createInternshipGrantorDTO,
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

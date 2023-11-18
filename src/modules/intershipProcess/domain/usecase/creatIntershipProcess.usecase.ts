import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateIntershipProcessDTO } from '../../application/dto/createintershipProcess.dto';
import { IInternshipProcessRepository } from '../port/intershipProcessRepository.port';
import { InternshipProcess } from '../entities/intershipProcess.entity';

export class CreateIntershipProcessUsecase {
  constructor(
    private readonly intershipProcessRepository: IInternshipProcessRepository,
  ) {}

  async handle(createIntershipProcessDTO: CreateIntershipProcessDTO) {
    try {
      const internshipProcess = new InternshipProcess(
        createIntershipProcessDTO,
      );
      const createIntershipProcess =
        await this.intershipProcessRepository.create(internshipProcess);

      return createIntershipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

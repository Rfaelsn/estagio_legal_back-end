// import axios from 'axios';
// import { HttpException, HttpStatus } from '@nestjs/common';
// import { CreateIntershipProcessDTO } from '../../application/dto/createintershipProcess.dto';
// import { IIntershipProcessRepository } from '../port/intershipProcessRepository.port';
// import { IntershipProcess } from '../entities/intershipProcess.entity';

// export class CreateTermCommitmentUsecase {
//   constructor(
//     private readonly intershipProcessRepository: IIntershipProcessRepository,
//   ) {}

//   async handle(createIntershipProcessDTO: CreateIntershipProcessDTO) {
//     try {
//       const intershipProcess = new IntershipProcess(createIntershipProcessDTO);
//       const createIntershipProcess =
//         await this.intershipProcessRepository.create(intershipProcess);

//       return createIntershipProcess;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// import { CreateInternshipGrantorDTO } from '../../application/dto/createInternshipGrantor.dto';
// import { InternshipGrantor } from '../entities/internshipGrantor.entity';
// import { IInternshipGrantorRepository } from '../port/IInternshipGrantorRepository.port';

// export class CreateInternshipGrantorUsecase {
//   constructor(
//     private readonly internshipGrantorRepository: IInternshipGrantorRepository,
//   ) {}

//   async handle(createInternshipGrantorDTO: CreateInternshipGrantorDTO) {
//     try {
//       const createInternshipGrantor =
//         await this.internshipGrantorRepository.create(
//           createInternshipGrantorDTO,
//         );

//       return createInternshipGrantor;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// import { CreateInternshipGrantorDTO } from '../../application/dto/createInternshipGrantor.dto';
// import { IInternshipGrantorRepository } from '../port/IInternshipGrantorRepository.port';

// export class FindInternshipGrantorByCnpjUsecase {
//   constructor(
//     private readonly internshipGrantorRepository: IInternshipGrantorRepository,
//   ) {}

//   async handle(cnpj: string) {
//     try {
//       const createInternshipGrantor =
//         await this.internshipGrantorRepository.findByCnpj(cnpj);

//       return createInternshipGrantor;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

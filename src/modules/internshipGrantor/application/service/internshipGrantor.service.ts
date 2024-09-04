// import { Injectable } from '@nestjs/common';

// import { IInternshipGrantorRepository } from '../../domain/port/IInternshipGrantorRepository.port';
// import { CreateInternshipGrantorDTO } from '../dto/createInternshipGrantor.dto';
// import { CreateInternshipGrantorUsecase } from '../../domain/usecase/createInternshipGrantor.usecase';
// import { InternshipGrantorRepository } from '../../adapter/repository/internshipGrantor.repository';
// import { FindInternshipGrantorByCnpjUsecase } from '../../domain/usecase/findInternshipGrantorByCnpj.usecase';

// @Injectable()
// export class InternshipGrantorService {
//   constructor(
//     private readonly internshipGrantorRepository: InternshipGrantorRepository,
//   ) {}

//   async create(createInternshipGrantorDTO: CreateInternshipGrantorDTO) {
//     const createIntershipGrantorUsecase = new CreateInternshipGrantorUsecase(
//       this.internshipGrantorRepository,
//     );
//     const intershipProcess = await createIntershipGrantorUsecase.handle(
//       createInternshipGrantorDTO,
//     );
//     return intershipProcess;
//   }

//   async findByCnpj(cnpj: string) {
//     const findIntershipGrantorByCpnjUsecase =
//       new FindInternshipGrantorByCnpjUsecase(this.internshipGrantorRepository);
//     const internshipGrantor = await findIntershipGrantorByCpnjUsecase.handle(
//       cnpj,
//     );
//     return internshipGrantor;
//   }
// }

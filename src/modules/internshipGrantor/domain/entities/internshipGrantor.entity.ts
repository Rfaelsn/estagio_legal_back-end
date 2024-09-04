// import { InternshipGrantor as InternshipGrantorPrisma } from '@prisma/client';
// import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
// import { v4 as uuidv4 } from 'uuid';

// export class InternshipGrantor implements InternshipGrantorPrisma {
//   id: string;
//   name: string;
//   endereco: string;
//   cnpj: string;
//   cep: string;
//   email: string;
//   bairro: string;
//   cidade: string;
//   uf: string;
//   representanteLegal: string;
//   funcaoRepresentanteLegal: string;
//   supervisor: string;
//   cargoSupervisor: string;
//   createdAt: Date;
//   updatedAt: Date;
//   termsCommitment?: TermCommitment[];

//   constructor(props: Omit<InternshipGrantor, 'id'>, id?: string) {
//     Object.assign(this, props);
//     if (!id) {
//       this.id = uuidv4();
//     } else {
//       this.id = id;
//     }
//   }
// }

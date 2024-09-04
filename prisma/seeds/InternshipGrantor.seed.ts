// // users.seed.ts
// import { PrismaClient } from '@prisma/client';

// export async function seedInternshipGrantors(prisma: PrismaClient) {
//   await prisma.internshipGrantor.createMany({
//     data: [
//       {
//         name: 'ADVOCACIA GERAL DA UNIÃO',
//         cnpj: '94354412345-766',
//         cep: '66017-070',
//         bairro: 'Campina',
//         cidade: 'Belém',
//         uf: 'PA',
//         endereco: 'Av. Assis de Vasconcelos, 625',
//         email: 'supervisor@email.com',
//         representanteLegal: 'Afonso',
//         funcaoRepresentanteLegal: 'Analista de Sistemas',
//         supervisor: 'Afonso',
//         cargoSupervisor: 'Analista',
//       },
//     ],
//   });

//   console.log('Dados de concedentes inseridos com sucesso!');
// }

// users.seed.ts
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(
  prismaTransaction: Prisma.TransactionClient,
  institutionId: string,
) {
  await prismaTransaction.user.createMany({
    data: [
      {
        name: 'Rafael',
        cpf: '12354476876',
        rg: '804669',
        academicRegistrationCode: '20190796543',
        birthDate: new Date('2001-04-18'),
        email: 'rafael@gmail.com',
        telephone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: await bcrypt.hash('#Rafael01', await bcrypt.genSalt()),
        role: 'STUDENT',
        id_institution: institutionId,
        UF: 'PA',
        city: 'Ananindeua',
        district: 'Paar',
        address: 'tv.castanhal qd77 n04',
        postalCode: '67145855',
      },
      {
        name: 'Diego',
        cpf: '45676654213',
        rg: '804669',
        academicRegistrationCode: '20190796755',
        birthDate: new Date('2001-04-18'),
        email: 'diego@gmail.com',
        telephone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: await bcrypt.hash('#Rafael01', await bcrypt.genSalt()),
        role: 'ADMINISTRATOR',
        id_institution: institutionId,
        UF: 'PA',
        city: 'Ananindeua',
        district: 'Paar',
        address: 'tv.castanhal qd77 n04',
        postalCode: '67145855',
      },
    ],
  });

  console.log('Dados de usuários inseridos com sucesso!');
}

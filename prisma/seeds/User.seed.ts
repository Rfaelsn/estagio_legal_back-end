// users.seed.ts
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prismaTransaction: Prisma.TransactionClient) {
  await prismaTransaction.user.createMany({
    data: [
      {
        name: 'Rafael',
        cpf: '12354476876',
        registration: '20190796543',
        email: 'rafael@gmail.com',
        telephone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: await bcrypt.hash('#Rafael01', await bcrypt.genSalt()),
        role: 'ALUNO',
      },
      {
        name: 'Diego',
        cpf: '45676654213',
        registration: '20190796755',
        email: 'diego@gmail.com',
        telephone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: await bcrypt.hash('#Rafael01', await bcrypt.genSalt()),
        role: 'ADMINISTRADOR',
      },
    ],
  });

  console.log('Dados de usuários inseridos com sucesso!');
}

// users.seed.ts
import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        name: 'SHEL THEA HORACE',
        cpf: '12354476876',
        registration: '20190796543',
        email: 'shelhorace@gmail.com',
        telefone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: '12345',
        role: 'ADMINISTRADOR',
      },
      {
        name: 'Diego',
        cpf: '45676654213',
        registration: '20190796755',
        email: 'diego@gmail.com',
        telefone: '3278163183618736',
        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
        password: '12345',
        role: 'ADMINISTRADOR',
      },
    ],
  });

  console.log('Dados de usuários inseridos com sucesso!');
}

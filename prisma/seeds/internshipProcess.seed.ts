// users.seed.ts
import { Prisma, PrismaClient } from '@prisma/client';

export async function seedInternshipProcess(prisma: PrismaClient) {
  const concedente = await prisma.internshipGrantor.findFirst({
    where: {
      cnpj: '94354412345-766',
    },
  });
  const alunos = await prisma.user.findMany();
  const process1: Prisma.InternshipProcessCreateInput = {
    movement: 'INÍCIO DE ESTÁGIO',
    status: 'EM ANDAMENTO',
    startDateProcess: '2023-11-10T00:00:00Z',
    endDateProcess: '2024-01-01T00:00:00Z',
    user: {
      connect: {
        id: alunos[0].id,
      },
    },
    termCommitment: {
      create: {
        numApoliceSeguro: '123456789',
        nomeSeguradora: 'IFPA',
        profOrientador: 'Joelma',
        codSiape: '123456',
        dataInicioEstagio: '2023-11-15T00:00:00Z',
        dataFimEstagio: '2023-11-15T00:00:00Z',
        horaInicioEstagio: '2023-11-15T00:00:00Z',
        horaFimEstagio: '2023-11-15T00:00:00Z',
        user: {
          connect: {
            id: alunos[0].id,
          },
        },
        internshipGrantor: {
          connect: {
            id: concedente.id,
          },
        },
      },
    },
    internshipEvaluation: {},
  };
  await prisma.internshipProcess.create({
    data: process1,
  });

  console.log('Dados de concedentes inseridos com sucesso!');
}

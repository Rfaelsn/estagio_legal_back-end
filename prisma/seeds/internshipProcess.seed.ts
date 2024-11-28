// users.seed.ts
import { Prisma, PrismaClient } from '@prisma/client';
import {
  IntershipProcessMovement,
  IntershipProcessStatus,
} from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';

export async function seedInternshipProcess(
  prismaTransaction: Prisma.TransactionClient,
) {
  const alunos = await prismaTransaction.user.findMany();
  const process1: Prisma.TermCommitmentCreateInput = {
    dataInicioEstagio: new Date(),
    dataFimEstagio: new Date(),
    horaInicioEstagio: new Date(),
    horaFimEstagio: new Date(),
    jornadaSemanal: new Date(),
    isObrigatorio: true,
    bolsaAuxilio: 200.5,
    auxilioTransporte: 200.5,
    razaoSocialConcedente: 'Empresa ABC LTDA',
    cnpjConcedente: '05026406000167',
    cepConcedente: '12345678',
    bairroConcedente: 'Centro',
    cidadeConcedente: 'São Paulo',
    ufConcedente: 'SP',
    enderecoConcedente: 'Rua das Flores, 123',
    emailConcedente: 'contato@empresaabc.com',
    representanteLegalConcedente: 'Carlos Souza',
    funcaoRepresentanteLegalConcedente: 'Diretor',
    supervisor: 'Maria Pereira',
    cargoSupervisor: 'Gerente',
    user: {
      connect: {
        id: alunos[0].id,
      },
    },
    planoAtividadesEstagio: `['atividade 1','atividade 2','atividade 3','atividade 4','atividade 5',]`,
  };
  const termCommitment1 = await prismaTransaction.termCommitment.create({
    data: process1,
  });

  const internshipProcess1 = {
    movement: 'INÍCIO DE ESTÁGIO',
    status: 'EM ANALISE',
    startDateProcess: new Date(),
    id_user: alunos[0].id,
    id_termCommitment: termCommitment1.id,
  };

  await prismaTransaction.internshipProcess.create({
    data: internshipProcess1,
  });

  const process2: Prisma.TermCommitmentCreateInput = {
    dataInicioEstagio: new Date(),
    dataFimEstagio: new Date(),
    horaInicioEstagio: new Date(),
    horaFimEstagio: new Date(),
    jornadaSemanal: new Date(),
    isObrigatorio: true,
    bolsaAuxilio: 200.5,
    auxilioTransporte: 200.5,
    razaoSocialConcedente: 'Empresa ABC LTDA',
    cnpjConcedente: '05026406000167',
    cepConcedente: '12345678',
    bairroConcedente: 'Centro',
    cidadeConcedente: 'São Paulo',
    ufConcedente: 'SP',
    enderecoConcedente: 'Rua das Flores, 123',
    emailConcedente: 'contato@empresaabc.com',
    representanteLegalConcedente: 'Carlos Souza',
    funcaoRepresentanteLegalConcedente: 'Diretor',
    supervisor: 'Maria Pereira',
    cargoSupervisor: 'Gerente',
    user: {
      connect: {
        id: alunos[0].id,
      },
    },
    planoAtividadesEstagio: `['atividade 1','atividade 2','atividade 3','atividade 4','atividade 5',]`,
  };
  const termCommitment2 = await prismaTransaction.termCommitment.create({
    data: process2,
  });

  const internshipProcess2 = {
    movement: 'RENOVAÇÃO DE ESTÁGIO',
    status: 'EM ANALISE',
    startDateProcess: new Date(),
    id_user: alunos[0].id,
    id_termCommitment: termCommitment2.id,
  };

  await prismaTransaction.internshipProcess.create({
    data: internshipProcess2,
  });

  const process3: Prisma.TermCommitmentCreateInput = {
    dataInicioEstagio: new Date(),
    dataFimEstagio: new Date(),
    horaInicioEstagio: new Date(),
    horaFimEstagio: new Date(),
    jornadaSemanal: new Date(),
    isObrigatorio: true,
    bolsaAuxilio: 200.5,
    auxilioTransporte: 200.5,
    razaoSocialConcedente: 'Empresa ABC LTDA',
    cnpjConcedente: '05026406000167',
    cepConcedente: '12345678',
    bairroConcedente: 'Centro',
    cidadeConcedente: 'São Paulo',
    ufConcedente: 'SP',
    enderecoConcedente: 'Rua das Flores, 123',
    emailConcedente: 'contato@empresaabc.com',
    representanteLegalConcedente: 'Carlos Souza',
    funcaoRepresentanteLegalConcedente: 'Diretor',
    supervisor: 'Maria Pereira',
    cargoSupervisor: 'Gerente',
    user: {
      connect: {
        id: alunos[0].id,
      },
    },
    planoAtividadesEstagio: `['atividade 1','atividade 2','atividade 3','atividade 4','atividade 5',]`,
  };
  const termCommitment3 = await prismaTransaction.termCommitment.create({
    data: process3,
  });

  const internshipProcess3 = {
    movement: 'FIM DE ESTÁGIO',
    status: 'EM ANALISE',
    startDateProcess: new Date(),
    id_user: alunos[0].id,
    id_termCommitment: termCommitment3.id,
  };

  await prismaTransaction.internshipProcess.create({
    data: internshipProcess3,
  });

  console.log('Dados de processos inseridos com sucesso!');
}

import { FindInternshipProcessByQueryDTO } from 'src/modules/intershipProcess/application/dto/findInternshipProcessByQuery.dto';
import { CreateInternshipProcessDTO } from 'src/modules/intershipProcess/application/dto/input/intershipProcess.dto';
import { InternshipProcessFilterByEmployeeDTO } from 'src/modules/intershipProcess/application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { InternshipProcess } from 'src/modules/intershipProcess/domain/entities/internshipProcess.entity';
import { IInternshipProcessRepository } from 'src/modules/intershipProcess/domain/port/intershipProcessRepository.port';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';
import { InternshipProcessController } from './intershipProcess.controller';
import { TermCommitmentRepository } from 'src/modules/termCommitment/adapter/repository/termCommitment.repository';
import { InternshipProcessRepository } from '../../repository/intershipProcess.repository';
import { PrismaService } from 'src/config/prisma/prisma.service';

class InternshipProcessServiceMock extends InternshipProcessService {}
class TermCommitmentServiceMock extends TermCommitmentService {}
class PrismaServiceMock extends PrismaService {}
class InternshipProcessRepositoryMock extends InternshipProcessRepository {
  create(
    intershipProcess: CreateInternshipProcessDTO,
  ): Promise<InternshipProcess> {
    throw new Error('Method not implemented.');
  }
  filter(
    intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ): Promise<InternshipProcess[]> {
    throw new Error('Method not implemented.');
  }
  findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<InternshipProcess> {
    throw new Error('Method not implemented.');
  }
}

class TermCommitmentRepositoryMock extends TermCommitmentRepository {}

const createSut = () => {
  const prismaServiceMock = new PrismaServiceMock();
  const termCommitmentRepository = new TermCommitmentRepositoryMock(
    prismaServiceMock,
  );

  const termCommitmentService = new TermCommitmentServiceMock(
    termCommitmentRepository,
  );
  const intershipProcessRepository = new InternshipProcessRepositoryMock(
    prismaServiceMock,
  );
  const intershipProcessService = new InternshipProcessServiceMock(
    intershipProcessRepository,
    termCommitmentService,
  );
  return new InternshipProcessController(intershipProcessService);
};

describe('internhipProcessController', () => {
  it('should return http status code 201', () => {
    const sut = createSut();
    const createInternshipProcessDTO: CreateInternshipProcessDTO = {
      movement: 'INÍCIO DE ESTÁGIO',
      status: 'CONCLUÍDO',
      id_user: 'ea0550e7-d377-4b98-a044-c5c6935360d2',
      termCommitment: {
        numApoliceSeguro: '12345678910',
        nomeSeguradora: 'IFPA',
        profOrientador: 'Fanny Pro',
        codSiape: '123456',
        dataInicioEstagio: new Date(),
        dataFimEstagio: new Date(),
        horaInicioEstagio: new Date(),
        horaFimEstagio: new Date(),
        id_internshipGrantor: '0d1c7804-718f-4795-8667-2d867dad9b9d',
        id_user: 'ea0550e7-d377-4b98-a044-c5c6935360d2',
      },
    };
    const response = sut.createIntershipProcess(createInternshipProcessDTO);

    // expect(response.status).toBe(201);
  });
});

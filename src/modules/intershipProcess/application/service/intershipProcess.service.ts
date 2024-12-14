import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';
import { InternshipProcessRepository } from '../../adapter/repository/intershipProcess.repository';
import {
  InternshipProcess,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';
import { CreateInternshipProcessUseCase } from '../../domain/usecase/creatIntershipProcess.usecase';
import { FilterInternshipProcessUsecase } from '../../domain/usecase/filterInternshipProcess.usecase';
import { FindInternshipProcessByIdUsecase } from '../../domain/usecase/findByIdInternshipProcess.usecase';
import { FindInternshipProcessByQueryUsecase } from '../../domain/usecase/findInternshipProcessByQuery.usecase';
import { FindInternshipProcessByQueryDTO } from '../dto/findInternshipProcessByQuery.dto';
import { InternshipProcessFilterByEmployeeDTO } from '../dto/internshipProcessFilterByEmployee.dto';
import { UpdateIntershipProcessDTO } from '../dto/updateInternshiProcess.dto';
import { DirectCreateIntershipProcessDTO } from '../dto/input/directCreateInternshipProcess.dto';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';
import { InternshipProcessHistoryService } from 'src/modules/internship-process-history/application/services/internship-process-history.service';
import { FileService } from 'src/modules/file/application/services/file.service';
import { registerAssignTermCommitmentDto } from '../dto/register-assign-term-commitment.dto';
import { InternshipProcessFilterByStudentDTO } from '../dto/internshipProcessFilterByStudent.dto';

@Injectable()
export class InternshipProcessService {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepository,
    @Inject(forwardRef(() => TermCommitmentService))
    private readonly termCommitmentService: TermCommitmentService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,
  ) {}

  async create(idTermCommitment: string, idUser: string) {
    const createIntershipProcessUsecase = new CreateInternshipProcessUseCase(
      this.internshipProcessRepository,
    );

    const intershipProcess = await createIntershipProcessUsecase.handle(
      idTermCommitment,
      idUser,
    );

    await this.internshipProcessHistoryService.registerHistoryByFuncionario({
      status: InternshipProcessStatus.EM_ANDAMENTO,
      movement: intershipProcess.movement,
      observacoes: 'registrado pelo aluno',
      idInternshipProcess: intershipProcess.id,
    });

    this.notificationService.sendNotification(
      idUser,
      'novo processo de estágio cadastrado',
    );

    return intershipProcess;
  }

  async registerAssignTermCommitment(
    registerAssignTermDto: registerAssignTermCommitmentDto,
  ) {
    const registerFile = {
      filePath: registerAssignTermDto.filePath,
      fileType: registerAssignTermDto.fileType,
      internshipProcessId: registerAssignTermDto.idInternshipProcess,
    };

    await this.fileService.registerFilePathProcess(registerFile);

    const internshipProcess = await this.findById(
      registerAssignTermDto.idInternshipProcess,
    );

    const history = {
      idInternshipProcess: registerAssignTermDto.idInternshipProcess,
      status: internshipProcess.status,
      movement: internshipProcess.movement,
      description: 'registrando termo assinado',
    };

    this.internshipProcessHistoryService.registerHistoryByAluno(history);
  }

  async updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.internshipProcessRepository.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  async directCreate(
    directCreateIntershipProcessDTO: DirectCreateIntershipProcessDTO,
  ) {
    const termCommitmentEntity = await this.termCommitmentService.directCreate(
      directCreateIntershipProcessDTO.termCommitment,
    );

    directCreateIntershipProcessDTO.id_termCommitment = termCommitmentEntity.id;
  }
  // async createTermCommitment(
  //   createIntershipProcessByTermCommitmentDTO: CreateIntershipProcessDTO,
  // ) {
  //   const TermCommitment = this.termCommitmentService.create(
  //     createIntershipProcessByTermCommitmentDTO.termCommitment,
  //   );

  //   // createIntershipProcessByTermCommitmentDTO.termCommitment = TermCommitment;

  //   const createIntershipProcessByTermCommitmentUsecase =
  //     new CreateIntershipProcessByTermCommitmentUsecase(
  //       this.intershipProcessRepository,
  //     );

  //   const intershipProcess =
  //     await createIntershipProcessByTermCommitmentUsecase.handle(
  //       createIntershipProcessByTermCommitmentDTO,
  //     );

  //   return intershipProcess;
  // }

  async filterByEmployee(
    intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ): Promise<InternshipProcess[]> {
    const filterInternshipProcessUsecase = new FilterInternshipProcessUsecase(
      this.internshipProcessRepository,
    );

    const internshipProcess = await filterInternshipProcessUsecase.handle(
      intershipProcessFilterDTO,
    );
    return internshipProcess;
  }

  async filterByStudent(
    internshipProcessFilterByStudentDto: InternshipProcessFilterByStudentDTO,
  ): Promise<InternshipProcess[]> {
    const internshipProcess =
      await this.internshipProcessRepository.filterByStudent(
        internshipProcessFilterByStudentDto,
      );
    return internshipProcess;
  }

  async findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]> {
    const filterInternshipProcessUsecase =
      new FindInternshipProcessByQueryUsecase(this.internshipProcessRepository);
    const internshipProcess = await filterInternshipProcessUsecase.handle(
      findInternshipProcessByQueryDTO,
    );
    return internshipProcess;
  }

  async findById(id: string): Promise<InternshipProcess> {
    const filterInternshipProcessUsecase = new FindInternshipProcessByIdUsecase(
      this.internshipProcessRepository,
    );
    const internshipProcess = await filterInternshipProcessUsecase.handle(id);
    return internshipProcess;
  }
}

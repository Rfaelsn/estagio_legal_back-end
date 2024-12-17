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
import { NotificationService } from 'src/modules/notification/application/service/notification.service';
import { InternshipProcessHistoryService } from 'src/modules/internship-process-history/application/services/internship-process-history.service';
import { FileService } from 'src/modules/file/application/services/file.service';
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

    await this.internshipProcessHistoryService.registerHistory({
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

  async updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.internshipProcessRepository.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

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

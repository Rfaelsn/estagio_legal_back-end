import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';
import { InternshipProcessRepository } from '../../adapter/repository/intershipProcess.repository';
import {
  InternshipProcessEntity,
  InternshipProcessMovement,
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
import { RegisterEndInternshipProcessDto } from '../dto/registerEndInternshipProcess.dto';
import { CreateInternshipProcessHistoryDto } from '@/modules/internship-process-history/application/dtos/create-internship-process-history.dto';
import { ValidateAssignEndInternshipProcessDto } from '../dto/validateAssignEndInternshipProcess.dto';

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

    // await this.internshipProcessHistoryService.registerHistory({
    //   status: InternshipProcessStatus.EM_ANDAMENTO,
    //   movement: intershipProcess.movement,
    //   observacoes: 'registrado pelo aluno',
    //   idInternshipProcess: intershipProcess.id,
    // });

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
  ): Promise<InternshipProcessEntity[]> {
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
  ): Promise<InternshipProcessEntity[]> {
    const internshipProcess =
      await this.internshipProcessRepository.filterByStudent(
        internshipProcessFilterByStudentDto,
      );
    return internshipProcess;
  }

  async findEligibleProcessesForCompletion(
    userId: string,
    page: number,
    pageSize: number,
  ) {
    const internshipProcess =
      await this.internshipProcessRepository.findEligibleProcessesForCompletion(
        userId,
        page,
        pageSize,
      );
    return internshipProcess;
  }

  async registerEndInternshipProcess(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  ) {
    // const formatFilePaths =
    //   registerEndInternshipProcessDto.internshipEvaluationFilesPaths.map(
    //     (filePath) => {
    //       if (filePath) {
    //         return {
    //           filePath,
    //           fileType: FileType.EVALUATION,
    //         };
    //       }
    //     },
    //   );
    const registeredFiles = await this.fileService.registerFilePathsProcess(
      registerEndInternshipProcessDto.internshipEvaluationFilesPaths,
    );

    await this.updateInternshipProcess({
      id: registerEndInternshipProcessDto.internshipProcessId,
      status: InternshipProcessStatus.EM_ANALISE,
      movement: InternshipProcessMovement.FIM_ESTAGIO,
    });

    const newHistory: CreateInternshipProcessHistoryDto = {
      movement: InternshipProcessMovement.FIM_ESTAGIO,
      status: InternshipProcessStatus.EM_ANALISE,
      idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId,
      fileIds: registeredFiles.map((registeredFile) => {
        return registeredFile.id;
      }),
    };

    // await this.internshipProcessHistoryService.updateHistory({
    //   endDate: new Date(),
    //   idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId,
    // });

    await this.internshipProcessHistoryService.registerHistory(newHistory);
  }

  async validateAssignEndInternshipProcess(
    validateAssignEndInternshipProcessDto: ValidateAssignEndInternshipProcessDto,
  ) {
    if (
      validateAssignEndInternshipProcessDto.validate &&
      validateAssignEndInternshipProcessDto.internshipCertificateFilePath
    ) {
      const formatFilePaths =
        validateAssignEndInternshipProcessDto.internshipCertificateFilePath;

      const registeredFiles =
        await this.fileService.registerFilePathProcess(formatFilePaths);

      this.updateInternshipProcess({
        id: validateAssignEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.CONCLUIDO,
        movement: InternshipProcessMovement.FIM_ESTAGIO,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.FIM_ESTAGIO,
        status: InternshipProcessStatus.CONCLUIDO,
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
        fileIds: [registeredFiles.id],
      };

      //ajustar para determinar a data apenas da ultima movimentação
      this.internshipProcessHistoryService.updateHistory({
        endDate: new Date(),
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
      });

      this.internshipProcessHistoryService.registerHistory(newHistory);
    } else {
      this.updateInternshipProcess({
        id: validateAssignEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.RECUSADO,
        movement: InternshipProcessMovement.FIM_ESTAGIO,
      });

      this.internshipProcessHistoryService.updateHistory({
        endDate: new Date(),
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.FIM_ESTAGIO,
        status: InternshipProcessStatus.RECUSADO,
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
        observacoes: validateAssignEndInternshipProcessDto.remark,
      };

      this.internshipProcessHistoryService.registerHistory(newHistory);
    }
  }

  async findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcessEntity[]> {
    const filterInternshipProcessUsecase =
      new FindInternshipProcessByQueryUsecase(this.internshipProcessRepository);
    const internshipProcess = await filterInternshipProcessUsecase.handle(
      findInternshipProcessByQueryDTO,
    );
    return internshipProcess;
  }

  async findById(id: string): Promise<InternshipProcessEntity> {
    const filterInternshipProcessUsecase = new FindInternshipProcessByIdUsecase(
      this.internshipProcessRepository,
    );
    const internshipProcess = await filterInternshipProcessUsecase.handle(id);
    return internshipProcess;
  }
}

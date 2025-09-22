import { HttpCode, Inject, Injectable } from '@nestjs/common';
import {
  InternshipProcessEntity,
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '../../domain/entities/internshipProcess.entity';
import { CreateInternshipProcessUseCase } from '../../domain/usecase/creatIntershipProcess.usecase';
import { FilterInternshipProcessUseCase } from '../../domain/usecase/filterInternshipProcess.usecase';
import { FindInternshipProcessByIdUsecase } from '../../domain/usecase/findByIdInternshipProcess.usecase';
import { InternshipProcessFilterDto } from '../dto/internshipProcessFilter.dto';
import { UpdateInternshipProcessDTO } from '../dto/updateInternshipProcess.dto';
import { InternshipProcessHistoryService } from 'src/modules/internship-process-history/application/services/internship-process-history.service';
import { RegisterEndInternshipProcessDto } from '../dto/registerEndInternshipProcess.dto';
import { CreateInternshipProcessHistoryDto } from '@/modules/internship-process-history/application/dtos/create-internship-process-history.dto';
import { ValidateAssignEndInternshipProcessDto } from '../dto/validateAssignEndInternshipProcess.dto';
import { InternshipProcessRepositoryPort } from '../../domain/port/internshipProcessRepository.port';
import { IFileServicePort } from '@/modules/file/domain/ports/IFileService.port';
import { INotificationServicePort } from '@/modules/notification/domain/port/INotificationService.port';
import { InternshipProcessServicePort } from '../../domain/port/internshipProcessService.port';
import { Prisma } from '@prisma/client';
import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { FileStorageService } from '@/modules/file-storage/application/services/file-storage.service';
import {
  FileEntity,
  FileType,
} from '@/modules/file/domain/entities/file.entity';
import { RegisterFilePathDto } from '@/modules/file/application/dtos/registerFilePath.dto';
import { PrismaService } from '@/config/prisma/prisma.service';
import { Role } from '@/modules/user/domain/entities/user.entity';

@Injectable()
export class InternshipProcessService implements InternshipProcessServicePort {
  constructor(
    @Inject('InternshipProcessRepository')
    private internshipProcessRepository: InternshipProcessRepositoryPort,

    @Inject('FileService')
    private readonly fileService: IFileServicePort,

    @Inject('NotificationService')
    private readonly notificationService: INotificationServicePort,

    @Inject('InternshipProcessHistoryService')
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,

    @Inject('FileStorageService')
    private readonly fileStorageService: FileStorageService,

    @Inject('PrismaService')
    private readonly prismaService: PrismaService,
  ) {}
  registerEndInternshipProcess(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
    file: Express.Multer.File[],
    user: UserFromJwt,
  ) {
    console.log('teste');
  }

  async create(
    idTermCommitment: string,
    idUser: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity> {
    const createInternshipProcessUseCase = new CreateInternshipProcessUseCase(
      this.internshipProcessRepository,
    );

    const internshipProcess = await createInternshipProcessUseCase.handle(
      idTermCommitment,
      idUser,
      prismaClientTransaction,
    );

    return internshipProcess;
  }

  async updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateInternshipProcessDTO,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<boolean> {
    return await this.internshipProcessRepository.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
      prismaClientTransaction,
    );
  }

  @HttpCode(200)
  async filter(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
    userId: string,
    userRole: string,
  ): Promise<InternshipProcessEntity[]> {
    const filterInternshipProcessUseCase = new FilterInternshipProcessUseCase(
      this.internshipProcessRepository,
    );

    const internshipProcess = await filterInternshipProcessUseCase.handle(
      internshipProcessFilterDTO,
      userId,
      userRole,
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

  async assignEndInternshipProcess(
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
    files: Express.Multer.File[],
    user: UserFromJwt,
  ) {
    if (
      user.role !== Role.EMPLOYEE &&
      user.role !== Role.ADMINISTRATOR &&
      (registerEndInternshipProcessDto.validate ||
        registerEndInternshipProcessDto.remark)
    ) {
      throw new Error(
        'Apenas o funcionário ou administrador pode validar o processo de estágio.',
      );
    }

    const isElegible = await this.isElegibleForCompletion(
      registerEndInternshipProcessDto.internshipProcessId,
      user.id,
    );

    if (!isElegible && user.role === Role.STUDENT) {
      throw new Error(
        'O processo de estágio não está elegível para ser concluído. precisa estar no estágio de início de estágio concluído.',
      );
    }

    const filePaths: RegisterFilePathDto[] = [];

    if (files.length !== 0) {
      for (const file of files) {
        const fileType = this.getFileType(file.originalname);
        const filePath = await this.fileStorageService.uploadPdfFile(
          file.buffer,
          fileType,
        );
        filePaths.push({
          filePath,
          fileType,
          isAssigned: true,
        });
      }
    }

    try {
      await this.prismaService.$transaction(async (prismaClientTransaction) => {
        if (
          filePaths.length === 0 &&
          !registerEndInternshipProcessDto.validate &&
          (user.role === Role.EMPLOYEE || user.role === Role.ADMINISTRATOR)
        ) {
          const newHistory = this.getNewInternshipProcessHistoryByUserRole(
            user.role,
            [],
            registerEndInternshipProcessDto,
          );

          const updatedInternshipProcessStateData =
            this.getNewInternshipProcessStateDataByUserRole(
              user.role,
              registerEndInternshipProcessDto,
            );

          await this.updateInternshipProcess(
            updatedInternshipProcessStateData,
            prismaClientTransaction,
          );

          await this.internshipProcessHistoryService.updateLatestHistory(
            {
              endDate: new Date(),
              idInternshipProcess:
                registerEndInternshipProcessDto.internshipProcessId,
            },
            prismaClientTransaction,
          );

          await this.internshipProcessHistoryService.registerHistory(
            newHistory,
            prismaClientTransaction,
          );
        } else {
          const registeredFiles =
            await this.fileService.registerFilePathsProcess(
              filePaths,
              prismaClientTransaction,
            );

          const newHistory = this.getNewInternshipProcessHistoryByUserRole(
            user.role,
            registeredFiles,
            registerEndInternshipProcessDto,
          );

          const updatedInternshipProcessStateData =
            this.getNewInternshipProcessStateDataByUserRole(
              user.role,
              registerEndInternshipProcessDto,
            );

          await this.updateInternshipProcess(
            updatedInternshipProcessStateData,
            prismaClientTransaction,
          );

          await this.internshipProcessHistoryService.updateLatestHistory(
            {
              endDate: new Date(),
              idInternshipProcess:
                registerEndInternshipProcessDto.internshipProcessId,
            },
            prismaClientTransaction,
          );

          await this.internshipProcessHistoryService.registerHistory(
            newHistory,
            prismaClientTransaction,
          );
        }
      });
    } catch (error) {
      if (filePaths.length > 0) {
        filePaths.forEach((filePath) => {
          this.fileStorageService.deletePdfFile(filePath.filePath);
        });
      }
      console.error('Erro ao deletar arquivo:', error);
    }
  }

  private getNewInternshipProcessHistoryByUserRole(
    userRole: Role | string,
    registeredFiles: FileEntity[],
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  ) {
    if (userRole === Role.STUDENT) {
      return {
        movement: InternshipProcessMovement.STAGE_END,
        status: InternshipProcessStatus.UNDER_REVIEW,
        idInternshipProcess:
          registerEndInternshipProcessDto.internshipProcessId,
        fileIds: registeredFiles.map((file) => file.id),
      };
    } else if (
      registerEndInternshipProcessDto.validate &&
      (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR)
    ) {
      return {
        movement: InternshipProcessMovement.STAGE_END,
        status: InternshipProcessStatus.COMPLETED,
        endDate: new Date(),
        idInternshipProcess:
          registerEndInternshipProcessDto.internshipProcessId,
        fileIds: registeredFiles.map((file) => file.id),
      };
    } else if (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR) {
      return {
        movement: InternshipProcessMovement.STAGE_END,
        status: InternshipProcessStatus.REJECTED,
        idInternshipProcess:
          registerEndInternshipProcessDto.internshipProcessId,
        observations: registerEndInternshipProcessDto.remark,
      };
    }
  }

  private getNewInternshipProcessStateDataByUserRole(
    userRole: Role | string,
    registerEndInternshipProcessDto: RegisterEndInternshipProcessDto,
  ) {
    if (userRole === Role.STUDENT) {
      return {
        id: registerEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.UNDER_REVIEW,
        movement: InternshipProcessMovement.STAGE_END,
      };
    } else if (
      registerEndInternshipProcessDto.validate &&
      (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR)
    ) {
      return {
        id: registerEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.COMPLETED,
        movement: InternshipProcessMovement.STAGE_END,
      };
    } else if (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR) {
      return {
        id: registerEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.REJECTED,
        movement: InternshipProcessMovement.STAGE_END,
      };
    }
  }

  private getFileType(fileName: string): FileType {
    if (fileName === 'auto_avaliacao_estagiario.pdf') {
      return FileType.STUDENT_SELF_EVALUATION;
    } else if (fileName === 'avaliacao_concedente.pdf') {
      return FileType.INTERNSHIP_GRANTOR_EVALUATION;
    } else if (fileName === 'avaliacao_professor_orientador.pdf') {
      return FileType.SUPERVISOR_EVALUATION;
    } else if (fileName === 'certificado_conclusao_estagio.pdf') {
      return FileType.INTERNSHIP_CERTIFICATE;
    } else {
      console.log(fileName);
      throw new Error(`Tipo de arquivo desconhecido ${fileName}`);
    }
  }

  private async isElegibleForCompletion(
    internshipProcessId: string,
    userId: string,
  ): Promise<boolean> {
    return this.internshipProcessRepository.isElegibleForCompletion(
      internshipProcessId,
      userId,
    );
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
        status: InternshipProcessStatus.COMPLETED,
        movement: InternshipProcessMovement.STAGE_END,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.STAGE_END,
        status: InternshipProcessStatus.COMPLETED,
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
        fileIds: [registeredFiles.id],
      };

      //ajustar para determinar a data apenas da ultima movimentação
      this.internshipProcessHistoryService.updateLatestHistory({
        endDate: new Date(),
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
      });

      this.internshipProcessHistoryService.registerHistory(newHistory);
    } else {
      this.updateInternshipProcess({
        id: validateAssignEndInternshipProcessDto.internshipProcessId,
        status: InternshipProcessStatus.REJECTED,
        movement: InternshipProcessMovement.STAGE_END,
      });

      this.internshipProcessHistoryService.updateLatestHistory({
        endDate: new Date(),
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.STAGE_END,
        status: InternshipProcessStatus.REJECTED,
        idInternshipProcess:
          validateAssignEndInternshipProcessDto.internshipProcessId,
        observations: validateAssignEndInternshipProcessDto.remark,
      };

      this.internshipProcessHistoryService.registerHistory(newHistory);
    }
  }

  async findById(
    id: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<InternshipProcessEntity> {
    const filterInternshipProcessUsecase = new FindInternshipProcessByIdUsecase(
      this.internshipProcessRepository,
    );
    const internshipProcess = await filterInternshipProcessUsecase.handle(
      id,
      prismaClientTransaction,
    );
    return internshipProcess;
  }
}

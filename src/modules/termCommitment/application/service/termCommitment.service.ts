import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../dto/LinkTermCommitmentFilePath.dto';
import { InternshipProcessHistoryService } from '@/modules/internship-process-history/application/services/internship-process-history.service';
import { FileService } from '@/modules/file/application/services/file.service';
import { FileType } from '@/modules/file/domain/entities/file.entity';
import { ValidateAssignTermDto } from '../dto/validate-assign-term.dto';
import { UpdateTermInfoDto } from '../dto/updateTermInfo.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/modules/internshipProcess/domain/entities/internshipProcess.entity';
import { InternshipProcessService } from '@/modules/internshipProcess/application/service/internshipProcess.service';
import { ITermCommitmentService } from '../../domain/port/ITermCommitmentService.port';
import { InternshipProcessServicePort } from '@/modules/internshipProcess/domain/port/internshipProcessService.port';
import { GeneratePdfService } from '@/modules/generate-pdf/application/services/generate-pdf.service';
import { FileStorageService } from '@/modules/file-storage/application/services/file-storage.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateTermCommitmentUseCase } from '../../domain/usecase/createTermCommitment.usecase';
import { UserService } from '@/modules/user/application/service/user.service';
import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { Role } from '@/modules/user/domain/entities/user.entity';

@Injectable()
export class TermCommitmentService implements ITermCommitmentService {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepository,
    @Inject(forwardRef(() => InternshipProcessService))
    private readonly internshipProcessService: InternshipProcessServicePort,
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,
    private readonly fileService: FileService,
    private readonly generatePdfService: GeneratePdfService,
    private readonly fileStorageService: FileStorageService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  private termCommitmentFileId: string;

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    // if (
    //   await this.isValidWeeklyWorkloadLimit(
    //     createTermCommitmentDTO.id_user,
    //     createTermCommitmentDTO.weeklyWorkload,
    //     createTermCommitmentDTO.internshipStartDate,
    //     createTermCommitmentDTO.internshipEndDate,
    //   )
    // ) {
    try {
      const userData = await this.userService.getUserById(
        createTermCommitmentDTO.id_user,
      );

      const pdf = await this.generatePdfService.createTermCommitmentPdf({
        ...createTermCommitmentDTO,
        user: {
          ...userData,
        },
        institution: {
          ...userData.institution,
        },
      });

      this.termCommitmentFileId = await this.fileStorageService.uploadPdfFile(
        pdf,
        FileType.TERM_COMMITMENT,
      );

      const result = await this.prismaService.$transaction(
        async (prismaClientTransaction) => {
          const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
            this.termCommitmentRepository,
          );
          const termCommitment = await createTermCommitmentUseCase.handle(
            createTermCommitmentDTO,
            prismaClientTransaction,
          );
          const { id } = await this.internshipProcessService.create(
            termCommitment.id,
            termCommitment.id_user,
            prismaClientTransaction,
          );

          const { id: termCommitmentEntityFileId } =
            await this.fileService.registerFilePathProcess({
              filePath: this.termCommitmentFileId,
              fileType: FileType.TERM_COMMITMENT,
            });

          await this.internshipProcessHistoryService.registerHistoryWithFile(
            {
              status: InternshipProcessStatus.IN_PROGRESS,
              movement: InternshipProcessMovement.STAGE_START,
              description: 'processo iniciado pelo aluno',
              idInternshipProcess: id,
              files: [
                {
                  fileId: termCommitmentEntityFileId,
                },
              ],
            },
            prismaClientTransaction,
          );
          return { id, termCommitment, termCommitmentEntityFileId };
        },
      );

      return {
        termFilePathId: result.termCommitmentEntityFileId,
        internshipProcessId: result.id,
      };
    } catch (error) {
      if (this.termCommitmentFileId) {
        try {
          await this.fileStorageService.deletePdfFile(
            this.termCommitmentFileId,
          );
        } catch (deleteError) {
          console.error('Erro ao deletar arquivo:', deleteError);
        }
      }

      throw error;
    }
    // } else {
    //   throw new HttpException(
    //     'período de criação de termo inválido (limite de carga horária 30hrs semanais)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  async assign(
    validateAssignTermDto: ValidateAssignTermDto,
    file: Express.Multer.File,
    user: UserFromJwt,
  ): Promise<void> {
    let termCommitmentFilePathId: string = '';
    try {
      if (file?.buffer) {
        termCommitmentFilePathId = await this.fileStorageService.uploadPdfFile(
          file.buffer,
          FileType.TERM_COMMITMENT,
        );
      }

      await this.prismaService.$transaction(async (prismaClientTransaction) => {
        let termCommitmentEntityFileId: string;
        if (file?.buffer) {
          const { id } = await this.fileService.registerFilePathProcess(
            {
              filePath: termCommitmentFilePathId,
              fileType: FileType.TERM_COMMITMENT,
              isAssigned: true,
            },
            prismaClientTransaction,
          );

          termCommitmentEntityFileId = id;
        }

        const newHistory = this.getNewInternshipProcessHistoryByUserRole(
          user.role,
          validateAssignTermDto,
          termCommitmentEntityFileId,
        );

        const updatedInternshipProcessStateData =
          this.getNewInternshipProcessStateDataByUserRole(
            user.role,
            validateAssignTermDto,
          );

        await this.internshipProcessService.updateInternshipProcess(
          updatedInternshipProcessStateData,
          prismaClientTransaction,
        );

        await this.internshipProcessHistoryService.updateLatestHistory(
          {
            endDate: new Date(),
            idInternshipProcess: validateAssignTermDto.internshipProcessId,
          },
          prismaClientTransaction,
        );

        await this.internshipProcessHistoryService.registerHistory(
          newHistory,
          prismaClientTransaction,
        );
      });
    } catch (error) {
      if (termCommitmentFilePathId) {
        try {
          await this.fileStorageService.deletePdfFile(termCommitmentFilePathId);
        } catch (deleteError) {
          console.error('Erro ao deletar arquivo:', deleteError);
        }
      }

      throw error;
    }
  }

  private getNewInternshipProcessHistoryByUserRole(
    userRole: Role | string,
    validateAssignTermDto: ValidateAssignTermDto,
    registeredFileId?: string,
  ) {
    if (userRole === Role.STUDENT) {
      return {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.UNDER_REVIEW,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        fileIds: [registeredFileId],
      };
    } else if (
      validateAssignTermDto.validate &&
      (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR)
    ) {
      return {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.COMPLETED,
        endDate: new Date(),
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        fileIds: [registeredFileId],
      };
    } else if (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR) {
      return {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.REJECTED,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        observations: validateAssignTermDto.remark,
      };
    }
  }

  private getNewInternshipProcessStateDataByUserRole(
    userRole: Role | string,
    validateAssignTermDto: ValidateAssignTermDto,
  ) {
    if (userRole === Role.STUDENT) {
      return {
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.UNDER_REVIEW,
        movement: InternshipProcessMovement.STAGE_START,
      };
    } else if (
      validateAssignTermDto.validate &&
      (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR)
    ) {
      return {
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.COMPLETED,
        movement: InternshipProcessMovement.STAGE_START,
      };
    } else if (userRole === Role.EMPLOYEE || userRole === Role.ADMINISTRATOR) {
      return {
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.REJECTED,
        movement: InternshipProcessMovement.STAGE_START,
      };
    }
  }

  async linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    return this.termCommitmentRepository.linkDocumentToTermCommitment(
      linkTermCommitmentFilePathDTO,
    );
  }

  async updateTermInfo(
    internshipProcessId: string,
    idUser: string,
    updateTermInfoDto: UpdateTermInfoDto,
  ): Promise<void> {
    try {
      const userData = await this.userService.getUserById(idUser);

      const pdf = await this.generatePdfService.createTermCommitmentPdf({
        ...updateTermInfoDto,
        user: {
          ...userData,
        },
        institution: {
          ...userData.institution,
        },
      });

      this.termCommitmentFileId = await this.fileStorageService.uploadPdfFile(
        pdf,
        FileType.TERM_COMMITMENT,
      );

      await this.prismaService.$transaction(async (prismaClientTransaction) => {
        const { id: termCommitmentEntityFileId } =
          await this.fileService.registerFilePathProcess({
            filePath: this.termCommitmentFileId,
            fileType: FileType.TERM_COMMITMENT,
          });

        await this.internshipProcessHistoryService.registerHistoryWithFile(
          {
            status: InternshipProcessStatus.IN_PROGRESS,
            movement: InternshipProcessMovement.STAGE_START,
            description: 'atualizado pelo aluno',
            idInternshipProcess: internshipProcessId,
            files: [
              {
                fileId: termCommitmentEntityFileId,
              },
            ],
          },
          prismaClientTransaction,
        );

        await this.internshipProcessService.updateInternshipProcess(
          {
            id: internshipProcessId,
            status: InternshipProcessStatus.IN_PROGRESS,
            movement: InternshipProcessMovement.STAGE_START,
          },
          prismaClientTransaction,
        );

        await this.internshipProcessHistoryService.updateLatestHistory(
          {
            endDate: new Date(),
            idInternshipProcess: internshipProcessId,
          },
          prismaClientTransaction,
        );

        await this.termCommitmentRepository.update(
          internshipProcessId,
          updateTermInfoDto,
          prismaClientTransaction,
        );
      });
    } catch (error) {
      if (this.termCommitmentFileId) {
        try {
          await this.fileStorageService.deletePdfFile(
            this.termCommitmentFileId,
          );
        } catch (deleteError) {
          console.error('Erro ao deletar arquivo:', deleteError);
        }
      }

      throw error;
    }
  }

  async isValidWeeklyWorkloadLimit(
    idUser: string,
    newWeeklyWorkload: number,
    startDateNewInternship: Date,
    endDateNewInternship: Date,
  ): Promise<boolean> {
    const userTerms =
      await this.termCommitmentRepository.findTermsUserInIntervalDates(
        idUser,
        startDateNewInternship,
        endDateNewInternship,
      );

    const totWeeklyWorkloadInInterval = userTerms.reduce(
      (totWeeklyWorkloadInterval, term) => {
        return totWeeklyWorkloadInterval + term.weeklyWorkload;
      },
      0,
    );
    return totWeeklyWorkloadInInterval + newWeeklyWorkload <= 30;
  }
}

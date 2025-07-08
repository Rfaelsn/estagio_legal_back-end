import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../dto/LinkTermCommitmentFilePath.dto';
import { InternshipProcessHistoryService } from '@/modules/internship-process-history/application/services/internship-process-history.service';
import { CreateInternshipProcessHistoryDto } from '@/modules/internship-process-history/application/dtos/create-internship-process-history.dto';
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
import { Prisma } from '@prisma/client';
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

  async registerAssignTerm(
    validateAssignTermDto: ValidateAssignTermDto,
    file: Express.Multer.File,
    user: UserFromJwt,
  ): Promise<void> {
    let termCommitmentFileId: string = '';
    try {
      termCommitmentFileId = await this.fileStorageService.uploadPdfFile(
        file.buffer,
        FileType.TERM_COMMITMENT,
      );

      await this.prismaService.$transaction(async (prismaClientTransaction) => {
        if (user.role !== Role.STUDENT) {
          this.validateAssignTerm(
            validateAssignTermDto,
            termCommitmentFileId,
            prismaClientTransaction,
          );
        } else {
          this.registerAssignTermByStudent(
            validateAssignTermDto,
            termCommitmentFileId,
            prismaClientTransaction,
          );
        }
      });
    } catch (error) {
      if (termCommitmentFileId) {
        try {
          await this.fileStorageService.deletePdfFile(termCommitmentFileId);
        } catch (deleteError) {
          console.error('Erro ao deletar arquivo:', deleteError);
        }
      }

      throw error;
    }
  }

  private async registerAssignTermByStudent(
    validateAssignTermDto: ValidateAssignTermDto,
    termCommitmentFileId: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ) {
    this.internshipProcessService.updateInternshipProcess(
      {
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.UNDER_REVIEW,
        movement: InternshipProcessMovement.STAGE_START,
      },
      prismaClientTransaction,
    );

    const newHistory: CreateInternshipProcessHistoryDto = {
      movement: InternshipProcessMovement.STAGE_START,
      status: InternshipProcessStatus.UNDER_REVIEW,
      idInternshipProcess: validateAssignTermDto.internshipProcessId,
      fileIds: [termCommitmentFileId],
    };

    this.internshipProcessHistoryService.updateHistory(
      {
        endDate: new Date(),
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
      },
      prismaClientTransaction,
    );

    this.internshipProcessHistoryService.registerHistory(
      newHistory,
      prismaClientTransaction,
    );
  }

  private async validateAssignTerm(
    validateAssignTermDto: ValidateAssignTermDto,
    termCommitmentFileId: string,
    prismaClientTransaction?: Prisma.TransactionClient,
  ): Promise<void> {
    if (validateAssignTermDto.validate && validateAssignTermDto.termFilePath) {
      this.internshipProcessService.updateInternshipProcess(
        {
          id: validateAssignTermDto.internshipProcessId,
          status: InternshipProcessStatus.COMPLETED,
          movement: InternshipProcessMovement.STAGE_START,
        },
        prismaClientTransaction,
      );

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.COMPLETED,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        fileIds: [termCommitmentFileId],
      };

      this.internshipProcessHistoryService.updateHistory(
        {
          endDate: new Date(),
          idInternshipProcess: validateAssignTermDto.internshipProcessId,
        },
        prismaClientTransaction,
      );

      this.internshipProcessHistoryService.registerHistory(
        newHistory,
        prismaClientTransaction,
      );
    } else {
      this.internshipProcessService.updateInternshipProcess(
        {
          id: validateAssignTermDto.internshipProcessId,
          status: InternshipProcessStatus.REJECTED,
          movement: InternshipProcessMovement.STAGE_START,
        },
        prismaClientTransaction,
      );

      this.internshipProcessHistoryService.updateHistory(
        {
          endDate: new Date(),
          idInternshipProcess: validateAssignTermDto.internshipProcessId,
        },
        prismaClientTransaction,
      );

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.STAGE_START,
        status: InternshipProcessStatus.REJECTED,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        observations: validateAssignTermDto.remark,
      };

      this.internshipProcessHistoryService.registerHistory(
        newHistory,
        prismaClientTransaction,
      );
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
    idTerm: string,
    updateTermInfoDto: UpdateTermInfoDto,
  ): Promise<any> {
    await this.internshipProcessHistoryService.registerHistory({
      status: InternshipProcessStatus.IN_PROGRESS,
      movement: InternshipProcessMovement.STAGE_START,
      observations: 'atualizado pelo aluno',
      idInternshipProcess: updateTermInfoDto.internshipProcessId,
    });

    this.internshipProcessService.updateInternshipProcess({
      id: updateTermInfoDto.internshipProcessId,
      status: InternshipProcessStatus.IN_PROGRESS,
      movement: InternshipProcessMovement.STAGE_START,
    });

    return await this.termCommitmentRepository.update(
      idTerm,
      updateTermInfoDto,
    );
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

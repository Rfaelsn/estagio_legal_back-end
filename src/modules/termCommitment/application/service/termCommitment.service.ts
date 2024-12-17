import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';
import { CreateTermCommitmentUsecase } from '../../domain/usecase/createTermCommitment.usecase';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../dto/LinkTermCommitmentFilePath.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { InternshipProcessHistoryService } from '@/modules/internship-process-history/application/services/internship-process-history.service';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/modules/intershipProcess/domain/entities/internshipProcess.entity';
import { CreateInternshipProcessHistoryDto } from '@/modules/internship-process-history/application/dtos/create-internship-process-history.dto';
import { FileService } from '@/modules/file/application/services/file.service';
import { FileType } from '@/modules/file/domain/entities/file.entity';
import { RegisterAssignDto } from '../dto/register-assign.dto';
import { ValidateAssignTermDto } from '../dto/validate-assign-term.dto';

@Injectable()
export class TermCommitmentService {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepository,
    @Inject(forwardRef(() => InternshipProcessService))
    private readonly internshipProcessService: InternshipProcessService,
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,
    private readonly fileService: FileService,
  ) {}

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const createTermCommitmentUsecase = new CreateTermCommitmentUsecase(
      this.termCommitmentRepository,
    );
    const termCommitment = await createTermCommitmentUsecase.handle(
      createTermCommitmentDTO,
    );

    this.internshipProcessService.create(
      termCommitment.id,
      termCommitment.id_user,
    );
    return termCommitment;
  }

  async registerAssignTermByAluno(
    registerAssignDto: RegisterAssignDto,
  ): Promise<void> {
    const registeredFile = await this.fileService.registerFilePathProcess({
      filePath: registerAssignDto.termFilePath,
      fileType: FileType.TERM_COMMITMENT,
    });

    this.internshipProcessService.updateInternshipProcess({
      id: registerAssignDto.internshipProcessId,
      status: InternshipProcessStatus.EM_ANALISE,
      movement: InternshipProcessMovement.INICIO_ESTAGIO,
    });

    const newHistory: CreateInternshipProcessHistoryDto = {
      movement: InternshipProcessMovement.INICIO_ESTAGIO,
      status: InternshipProcessStatus.EM_ANALISE,
      idInternshipProcess: registerAssignDto.internshipProcessId,
      fileId: registeredFile.id,
    };
    //transação
    this.internshipProcessHistoryService.updateHistory({
      endDate: new Date(),
      idInternshipProcess: registerAssignDto.internshipProcessId,
    });

    this.internshipProcessHistoryService.registerHistory(newHistory);
  }

  async validateAssignTerm(
    validateAssignTermDto: ValidateAssignTermDto,
  ): Promise<void> {
    if (validateAssignTermDto.validate && validateAssignTermDto.termFilePath) {
      const registeredFile = await this.fileService.registerFilePathProcess({
        filePath: validateAssignTermDto.termFilePath,
        fileType: FileType.TERM_COMMITMENT,
      });

      this.internshipProcessService.updateInternshipProcess({
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.CONCLUIDO,
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
        status: InternshipProcessStatus.CONCLUIDO,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
        fileId: registeredFile.id,
      };
      this.internshipProcessHistoryService.updateHistory({
        endDate: new Date(),
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
      });

      this.internshipProcessHistoryService.registerHistory(newHistory);
    } else {
      this.internshipProcessService.updateInternshipProcess({
        id: validateAssignTermDto.internshipProcessId,
        status: InternshipProcessStatus.RECUSADO,
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
      });

      this.internshipProcessHistoryService.updateHistory({
        endDate: new Date(),
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
      });

      const newHistory: CreateInternshipProcessHistoryDto = {
        movement: InternshipProcessMovement.INICIO_ESTAGIO,
        status: InternshipProcessStatus.RECUSADO,
        idInternshipProcess: validateAssignTermDto.internshipProcessId,
      };

      this.internshipProcessHistoryService.registerHistory(newHistory);
    }
  }

  // async

  async linkDocumentToTermCommitment(
    linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    return this.termCommitmentRepository.linkDocumentToTermCommitment(
      linkTermCommitmentFilePathDTO,
    );
  }
}

import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TermCommitmentRepository } from '../../adapter/repository/termCommitment.repository';
import { CreateTermCommitmentUseCase } from '../../domain/usecase/createTermCommitment.usecase';
import { CreateTermCommitmentDTO } from '../dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '../dto/LinkTermCommitmentFilePath.dto';
import { InternshipProcessHistoryService } from '@/modules/internship-process-history/application/services/internship-process-history.service';
import { CreateInternshipProcessHistoryDto } from '@/modules/internship-process-history/application/dtos/create-internship-process-history.dto';
import { FileService } from '@/modules/file/application/services/file.service';
import { FileType } from '@/modules/file/domain/entities/file.entity';
import { RegisterAssignDto } from '../dto/register-assign.dto';
import { ValidateAssignTermDto } from '../dto/validate-assign-term.dto';
import { UpdateTermInfoDto } from '../dto/updateTermInfo.dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/modules/internshipProcess/domain/entities/internshipProcess.entity';
import { InternshipProcessService } from '@/modules/internshipProcess/application/service/internshipProcess.service';
import { ITermCommitmentService } from '../../domain/port/ITermCommitmentService.port';
import { InternshipProcessServicePort } from '@/modules/internshipProcess/domain/port/internshipProcessService.port';

@Injectable()
export class TermCommitmentService implements ITermCommitmentService {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepository,
    @Inject(forwardRef(() => InternshipProcessService))
    private readonly internshipProcessService: InternshipProcessServicePort,
    private readonly internshipProcessHistoryService: InternshipProcessHistoryService,
    private readonly fileService: FileService,
  ) {}

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    if (
      await this.isValidWeeklyWorkloadLimit(
        createTermCommitmentDTO.id_user,
        createTermCommitmentDTO.jornadaSemanal,
        createTermCommitmentDTO.dataInicioEstagio,
        createTermCommitmentDTO.dataFimEstagio,
      )
    ) {
      const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
        this.termCommitmentRepository,
      );
      const termCommitment = await createTermCommitmentUseCase.handle(
        createTermCommitmentDTO,
      );

      const { id } = await this.internshipProcessService.create(
        termCommitment.id,
        termCommitment.id_user,
      );

      const outputDto = {
        ...termCommitment,
        dataInicioEstagio: termCommitment.dataInicioEstagio
          .toISOString()
          .split('Z')[0],
        dataFimEstagio: termCommitment.dataFimEstagio
          .toISOString()
          .split('Z')[0],
        internshipProcessId: id,
      };

      return outputDto;
    }

    throw new HttpException(
      `A jornada semanal ultrapassa o limite permitido de 30 horas. verifique a jornada semanal de seus processos no intervalo de ${new Date(
        createTermCommitmentDTO.dataInicioEstagio.toISOString().split('Z')[0],
      ).toLocaleDateString('pt-BR')} a ${new Date(
        createTermCommitmentDTO.dataFimEstagio.toISOString().split('Z')[0],
      ).toLocaleDateString('pt-BR')}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  async registerAssignTermByStudent(
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
      fileIds: [registeredFile.id],
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
    //se ja tiver o status de aprovação nao deve ir pro fluxo de aprovação novamente o mesmo para recusa
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
        fileIds: [registeredFile.id],
      };

      //ajustar para determinar a data apenas da ultima movimentação
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
        observacoes: validateAssignTermDto.remark,
      };

      this.internshipProcessHistoryService.registerHistory(newHistory);
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
    //procurar id do processo pelo id do termo ou pegar do dto
    await this.internshipProcessHistoryService.registerHistory({
      status: InternshipProcessStatus.EM_ANDAMENTO,
      movement: InternshipProcessMovement.INICIO_ESTAGIO,
      observacoes: 'atualizado pelo aluno',
      idInternshipProcess: updateTermInfoDto.internshipProcessId,
    });

    //atualizar o processo também entidade processo
    this.internshipProcessService.updateInternshipProcess({
      id: updateTermInfoDto.internshipProcessId,
      status: InternshipProcessStatus.EM_ANDAMENTO,
      movement: InternshipProcessMovement.INICIO_ESTAGIO,
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
        return totWeeklyWorkloadInterval + term.jornadaSemanal;
      },
      0,
    );
    return totWeeklyWorkloadInInterval + newWeeklyWorkload <= 30;
  }
}

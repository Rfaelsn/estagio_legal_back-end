import { Injectable } from '@nestjs/common';
import { CreateIntershipProcessDTO } from '../dto/input/intershipProcess.dto';
import { CreateIntershipProcessUsecase } from '../../domain/usecase/creatIntershipProcess.usecase';
import { InternshipProcessRepository } from '../../adapter/repository/intershipProcess.repository';
import { InternshipProcess } from '../../domain/entities/intershipProcess.entity';
import { InternshipProcessFilterDTO } from '../dto/internshipProcessFilter.dto';
import { FilterInternshipProcessUsecase } from '../../domain/usecase/filterInternshipProcess.usecase';
import { FindInternshipProcessByQueryDTO } from '../dto/findInternshipProcessByQuery.dto';
import { FindInternshipProcessByQueryUsecase } from '../../domain/usecase/findInternshipProcessByQuery.usecase';
import { FindInternshipProcessByIdUsecase } from '../../domain/usecase/findByIdInternshipProcess.usecase';
import { CreateIntershipProcessByTermCommitmentUsecase } from '../../domain/usecase/createInternshipProcessByTermCommitment.usecase';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';
import { create } from 'domain';
import { plainToInstance } from 'class-transformer';
import { TermCommitmentDTO } from 'src/modules/termCommitment/application/dto/termCommitmentDTO';

@Injectable()
export class InternshipProcessService {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepository,
    private readonly termCommitmentService: TermCommitmentService,
  ) {}

  async create(createIntershipProcessDTO: CreateIntershipProcessDTO) {
    const createIntershipProcessUsecase = new CreateIntershipProcessUsecase(
      this.intershipProcessRepository,
    );

    const termCommitmentEntity = await this.termCommitmentService.create(
      createIntershipProcessDTO.termCommitment,
    );

    createIntershipProcessDTO.id_termCommitment = termCommitmentEntity.id;

    const intershipProcess = await createIntershipProcessUsecase.handle(
      createIntershipProcessDTO,
    );
    return intershipProcess;
  }

  async createTermCommitment(
    createIntershipProcessByTermCommitmentDTO: CreateIntershipProcessDTO,
  ) {
    const TermCommitment = this.termCommitmentService.create(
      createIntershipProcessByTermCommitmentDTO.termCommitment,
    );

    // createIntershipProcessByTermCommitmentDTO.termCommitment = TermCommitment;

    const createIntershipProcessByTermCommitmentUsecase =
      new CreateIntershipProcessByTermCommitmentUsecase(
        this.intershipProcessRepository,
      );

    const intershipProcess =
      await createIntershipProcessByTermCommitmentUsecase.handle(
        createIntershipProcessByTermCommitmentDTO,
      );

    return intershipProcess;
  }

  async filter(
    intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ): Promise<InternshipProcess[]> {
    const filterInternshipProcessUsecase = new FilterInternshipProcessUsecase(
      this.intershipProcessRepository,
    );

    const internshipProcess = await filterInternshipProcessUsecase.handle(
      intershipProcessFilterDTO,
    );
    return internshipProcess;
  }

  async findByQuery(
    findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ): Promise<InternshipProcess[]> {
    const filterInternshipProcessUsecase =
      new FindInternshipProcessByQueryUsecase(this.intershipProcessRepository);
    const internshipProcess = await filterInternshipProcessUsecase.handle(
      findInternshipProcessByQueryDTO,
    );
    return internshipProcess;
  }

  async findById(id: string): Promise<InternshipProcess> {
    const filterInternshipProcessUsecase = new FindInternshipProcessByIdUsecase(
      this.intershipProcessRepository,
    );
    const internshipProcess = await filterInternshipProcessUsecase.handle(id);
    return internshipProcess;
  }
}

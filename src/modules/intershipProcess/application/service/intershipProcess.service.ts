import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';
import { InternshipProcessRepository } from '../../adapter/repository/intershipProcess.repository';
import { InternshipProcess } from '../../domain/entities/intershipProcess.entity';
import { CreateIntershipProcessByTermCommitmentUsecase } from '../../domain/usecase/createInternshipProcessByTermCommitment.usecase';
import { CreateIntershipProcessUsecase } from '../../domain/usecase/creatIntershipProcess.usecase';
import { FilterInternshipProcessUsecase } from '../../domain/usecase/filterInternshipProcess.usecase';
import { FindInternshipProcessByIdUsecase } from '../../domain/usecase/findByIdInternshipProcess.usecase';
import { FindInternshipProcessByQueryUsecase } from '../../domain/usecase/findInternshipProcessByQuery.usecase';
import { FindInternshipProcessByQueryDTO } from '../dto/findInternshipProcessByQuery.dto';
import { CreateIntershipProcessDTO } from '../dto/input/intershipProcess.dto';
import { InternshipProcessFilterDTO } from '../dto/internshipProcessFilter.dto';
import { UpdateIntershipProcessDTO } from '../dto/updateInternshiProcess.dto';
import { DirectCreateIntershipProcessDTO } from '../dto/input/directCreateInternshipProcess.dto';
import { NotificationService } from 'src/modules/notification/application/service/notification.service';

@Injectable()
export class InternshipProcessService {
  constructor(
    private readonly intershipProcessRepository: InternshipProcessRepository,
    @Inject(forwardRef(() => TermCommitmentService))
    private readonly termCommitmentService: TermCommitmentService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(idTermCommitment: string, idUser: string) {
    const createIntershipProcessUsecase = new CreateIntershipProcessUsecase(
      this.intershipProcessRepository,
    );

    const intershipProcess = await createIntershipProcessUsecase.handle(
      idTermCommitment,
      idUser,
    );

    this.notificationService.sendNotification(
      idUser,
      'novo processo de estágio cadastrado',
    );

    return intershipProcess;
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

  async updateInternshipProcess(
    updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.intershipProcessRepository.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Query,
  UseInterceptors,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/input/intershipProcess.dto';
import { InternshipProcessFilterDTO } from 'src/modules/intershipProcess/application/dto/internshipProcessFilter.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { InternshipProcessFilterValidationInterceptor } from '../../interceptor/InternshipProcessFilterValidation.interceptor';
import { FindInternshipProcessByQueryDTO } from 'src/modules/intershipProcess/application/dto/findInternshipProcessByQuery.dto';
import { Role } from 'src/modules/user/domain/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { plainToInstance } from 'class-transformer';
import { TermCommitment } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { InternshipProcess } from 'src/modules/intershipProcess/domain/entities/intershipProcess.entity';
import { UpdateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/updateInternshiProcess.dto';
import { DirectCreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/input/directCreateInternshipProcess.dto';
import { registerAssignTermCommitmentDto } from 'src/modules/intershipProcess/application/dto/register-assign-term-commitment.dto';

@Controller('processo/estagio')
@UseGuards(RoleGuard)
export class InternshipProcessController {
  constructor(
    private readonly intershipProcessService: InternshipProcessService,
  ) {}

  @IsPublic()
  @Post('create')
  async createIntershipProcess(
    @Body() directCreateIntershipProcessDTO: DirectCreateIntershipProcessDTO,
  ) {
    return this.intershipProcessService.directCreate(
      directCreateIntershipProcessDTO,
    );
  }

  @IsPublic()
  @Patch('update/status')
  async updateInternshipProcess(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.intershipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @IsPublic()
  @Patch('register/assign-term')
  async registerAssignTermCommitmentByAluno(
    @Body() registerAssignTermDto: registerAssignTermCommitmentDto,
  ) {
    return await this.intershipProcessService.registerAssignTermCommitment(
      registerAssignTermDto,
    );
  }

  @Patch('register/response/submit/docs')
  async registerRenovationByAluno(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.intershipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Patch('register/assign-end-internship')
  async registerEndInternshipByAluno(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.intershipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  // @IsPublic()
  // @Post('create/internshipProcess')
  // async createIntershipProcessByTermCommitment(
  //   @Body()
  //   createIntershipProcessByTermCommitmentDTO: CreateIntershipProcessDTO,
  // ) {
  //   const internshipProcess = plainToInstance(
  //     InternshipProcess,
  //     createIntershipProcessByTermCommitmentDTO,
  //   );

  //   return this.intershipProcessService.createTermCommitment(
  //     createIntershipProcessByTermCommitmentDTO,
  //   );
  // }

  // @IsPublic()
  // @Post('create/external/termCommitment')
  // async createIntershipProcessByExtrenalTermCommitment(
  //   @Body()
  //   createIntershipProcessByTermCommitmentDTO: CreateIntershipProcessDTO,
  // ) {
  //   return this.intershipProcessService.create(
  //     createIntershipProcessByTermCommitmentDTO,
  //   );
  // }

  @Roles(Role.ADMINISTRADOR)
  @Get('filter')
  async intershipProcessFilter(
    @Query() intershipProcessFilterDTO: InternshipProcessFilterDTO,
  ) {
    console.log('estou filtrando');
    return this.intershipProcessService.filter(intershipProcessFilterDTO);
  }

  @IsPublic()
  @Get('findBy')
  async findByQuery(
    @Query() findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ) {
    return this.intershipProcessService.findByQuery(
      findInternshipProcessByQueryDTO,
    );
  }

  @IsPublic()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.intershipProcessService.findById(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { InternshipProcessFilterByEmployeeDTO } from 'src/modules/intershipProcess/application/dto/internshipProcessFilterByEmployee.dto';
import { InternshipProcessService } from 'src/modules/intershipProcess/application/service/intershipProcess.service';
import { FindInternshipProcessByQueryDTO } from 'src/modules/intershipProcess/application/dto/findInternshipProcessByQuery.dto';

import { UpdateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/updateInternshiProcess.dto';
import { RoleGuard } from '@/auth/guards/role.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/modules/user/domain/entities/user.entity';
import { InternshipProcessFilterByStudentDTO } from '@/modules/intershipProcess/application/dto/internshipProcessFilterByStudent.dto';

@Controller('processo/estagio')
@UseGuards(RoleGuard)
export class InternshipProcessController {
  constructor(
    private readonly internshipProcessService: InternshipProcessService,
  ) {}

  @IsPublic()
  @Patch('update/status')
  async updateInternshipProcess(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.internshipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Patch('register/response/submit/docs')
  async registerRenovationByAluno(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.internshipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Patch('register/assign-end-internship')
  async registerEndInternshipByAluno(
    @Body() updateInternshipProcessStatusDTO: UpdateIntershipProcessDTO,
  ) {
    return await this.internshipProcessService.updateInternshipProcess(
      updateInternshipProcessStatusDTO,
    );
  }

  @Roles(Role.ADMINISTRADOR)
  @Get('filter')
  async intershipProcessFilter(
    @Query() intershipProcessFilterDTO: InternshipProcessFilterByEmployeeDTO,
  ) {
    return this.internshipProcessService.filterByEmployee(
      intershipProcessFilterDTO,
    );
  }

  @Roles(Role.ALUNO)
  @Get('filter/my-process')
  async intershipProcessFilterByStudent(
    @Query()
    internshipProcessFilterByStudentDto: InternshipProcessFilterByStudentDTO,
    @Request() req,
  ) {
    internshipProcessFilterByStudentDto.idUser = req.user.id;
    return this.internshipProcessService.filterByStudent(
      internshipProcessFilterByStudentDto,
    );
  }

  @IsPublic()
  @Get('findBy')
  async findByQuery(
    @Query() findInternshipProcessByQueryDTO: FindInternshipProcessByQueryDTO,
  ) {
    return this.internshipProcessService.findByQuery(
      findInternshipProcessByQueryDTO,
    );
  }

  @IsPublic()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.internshipProcessService.findById(id);
  }
}

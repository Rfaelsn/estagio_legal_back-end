import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/input/intershipProcess.dto';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';

@Controller('termCommitment')
export class termCommitmentController {
  constructor(private readonly termCommitmentService: TermCommitmentService) {}

  @IsPublic()
  @Post('create')
  async createIntershipProcess(
    @Body() createTermCommitmentDTO: CreateTermCommitmentDTO,
  ) {
    console.log(createTermCommitmentDTO);
    return this.termCommitmentService.create(createTermCommitmentDTO);
  }
}

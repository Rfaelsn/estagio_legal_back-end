import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateTermCommitmentDTO } from 'src/modules/termCommitment/application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from 'src/modules/termCommitment/application/dto/LinkTermCommitmentFilePath.dto';
import { CreatedTermCommitmentOutputDTO } from 'src/modules/termCommitment/application/dto/output/termCommitmentOutPut.dto';
import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';

@Controller('termCommitment')
export class termCommitmentController {
  constructor(private readonly termCommitmentService: TermCommitmentService) {}

  @IsPublic()
  @Post('create')
  async createIntershipProcess(
    @Body() createTermCommitmentDTO: CreateTermCommitmentDTO,
  ) {
    const termCommitmentEntity = await this.termCommitmentService.create(
      createTermCommitmentDTO,
    );

    const termCommitmentOutput = plainToInstance(
      CreatedTermCommitmentOutputDTO,
      termCommitmentEntity,
      { excludeExtraneousValues: true },
    );

    const erros = await validateSync(termCommitmentOutput);

    return termCommitmentOutput;
  }

  @IsPublic()
  @Post('update/filepath')
  async linkDocumentToTermCommitment(
    @Body() linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    return this.termCommitmentService.linkDocumentToTermCommitment(
      linkTermCommitmentFilePathDTO,
    );
  }
}

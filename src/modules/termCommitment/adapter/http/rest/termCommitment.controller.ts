// import { Body, Controller, Post } from '@nestjs/common';
// import { IsPublic } from 'src/auth/decorators/is-public.decorator';
// import { CreateIntershipProcessDTO } from 'src/modules/intershipProcess/application/dto/createIntershipProcess.dto';
// import { TermCommitmentService } from 'src/modules/termCommitment/application/service/termCommitment.service';

// @Controller('processo/estagio')
// export class termCommitmentController {
//   constructor(private readonly termCommitmentService: TermCommitmentService) {}

//   @IsPublic()
//   @Post('create')
//   async createIntershipProcess(
//     @Body() createIntershipProcessDTO: CreateIntershipProcessDTO,
//   ) {
//     return this.termCommitmentService.create(createIntershipProcessDTO);
//   }
// }

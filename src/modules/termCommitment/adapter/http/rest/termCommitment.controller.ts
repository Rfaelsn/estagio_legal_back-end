import { Roles } from '@/auth/decorators/roles.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { UserFromJwt } from '@/auth/models/UserFromJwt';
import { UpdateTermInfoDto } from '@/modules/termCommitment/application/dto/updateTermInfo.dto';
import { ValidateAssignTermDto } from '@/modules/termCommitment/application/dto/validate-assign-term.dto';
import { Role } from '@/modules/user/domain/entities/user.entity';
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { IsPublic } from '@/auth/decorators/is-public.decorator';
import { CreateTermCommitmentDTO } from '@/modules/termCommitment/application/dto/createTermCommitment.dto';
import { LinkTermCommitmentFilePathDTO } from '@/modules/termCommitment/application/dto/LinkTermCommitmentFilePath.dto';
import { TermCommitmentService } from '@/modules/termCommitment/application/service/termCommitment.service';
import { filePipe } from '@/modules/file/adapter/interceptors/config-file-interceptor';
@Controller('termCommitment')
export class termCommitmentController {
  constructor(private readonly termCommitmentService: TermCommitmentService) {}

  @Roles(Role.STUDENT)
  @Post('create')
  async createIntershipProcess(
    @Body() createTermCommitmentDTO: CreateTermCommitmentDTO,
    @User('sub') userId,
  ) {
    createTermCommitmentDTO.id_user = userId;
    const termCommitmentEntity = await this.termCommitmentService.create(
      createTermCommitmentDTO,
    );

    // const termCommitmentOutput = plainToInstance(
    //   CreatedTermCommitmentOutputDTO,
    //   termCommitmentEntity,
    //   { excludeExtraneousValues: true },
    // );

    // const erros = await validateSync(termCommitmentOutput);

    return termCommitmentEntity;
  }

  @Roles(Role.STUDENT, Role.ADMINISTRATOR, Role.EMPLOYEE)
  @Post('assign')
  async registerAssign(
    @UploadedFile(filePipe)
    file: Express.Multer.File,
    @Body() validateAssignTermDto: ValidateAssignTermDto,
    @User() user: UserFromJwt,
  ) {
    await this.termCommitmentService.registerAssignTerm(
      validateAssignTermDto,
      file,
      user,
    );
  }

  // @Roles(Role.ADMINISTRATOR, Role.EMPLOYEE)
  // @Post('validate/assign')
  // async validateAssignTerm(
  //   @Body() validateAssignTermDto: ValidateAssignTermDto,
  //   @User() user: UserFromJwt,
  // ) {
  //   if (
  //     user.role === Role.ADMINISTRATOR &&
  //     !validateAssignTermDto.remark &&
  //     !validateAssignTermDto.validate
  //   ) {
  //     throw new HttpException('remark is required', HttpStatus.BAD_REQUEST);
  //   }
  //   await this.termCommitmentService.validateAssignTerm(validateAssignTermDto);
  // }

  @IsPublic()
  @Post('update/filepath')
  async linkDocumentToTermCommitment(
    @Body() linkTermCommitmentFilePathDTO: LinkTermCommitmentFilePathDTO,
  ) {
    return this.termCommitmentService.linkDocumentToTermCommitment(
      linkTermCommitmentFilePathDTO,
    );
  }

  @IsPublic()
  @Patch('update/:id')
  async updateTermInfo(
    @Param('id') idTerm: string,
    @Body() updateTermInfoDto: UpdateTermInfoDto,
  ): Promise<any> {
    try {
      return await this.termCommitmentService.updateTermInfo(
        idTerm,
        updateTermInfoDto,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

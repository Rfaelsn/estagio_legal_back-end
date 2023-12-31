import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateInternshipGrantorDTO } from 'src/modules/internshipGrantor/application/dto/createInternshipGrantor.dto';
import { InternshipGrantorService } from 'src/modules/internshipGrantor/application/service/internshipGrantor.service';

@Controller('internshiGrantor')
export class InternshipGrantorController {
  constructor(
    private readonly internshipGrantorService: InternshipGrantorService,
  ) {}

  @IsPublic()
  @Post('create')
  async createInternshipGrantor(
    @Body() createInternshipGrantorDTO: CreateInternshipGrantorDTO,
  ) {
    return this.internshipGrantorService.create(createInternshipGrantorDTO);
  }

  @IsPublic()
  @Get('findByCnpj/:cnpj')
  async findInternshipGrantorByCnpj(@Param('cnpj') cnpj: string) {
    return this.internshipGrantorService.findByCnpj(cnpj);
  }
}

import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { IsCNPJ } from 'src/shared/decorators/isCnpj.decorator';
import { IsTime } from 'src/shared/decorators/isTime.decorator';

export class CreateTermCommitmentDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  insurancePolicyNumber?: string;

  @IsString()
  @IsOptional()
  insuranceCompanyName?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  internshipStartDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  internshipEndDate: Date;

  @IsNotEmpty()
  @IsTime('toDate')
  internshipStartTime: Date;

  @IsNotEmpty()
  @IsTime('toDate')
  internshipEndTime: Date;

  @IsNotEmpty()
  @IsNumber()
  weeklyWorkload: number;

  @IsBoolean()
  @IsNotEmpty()
  isMandatory: boolean;

  @IsNumber()
  internshipGrant: number;

  @IsNumber()
  transportationAllowance: number;

  @IsArray()
  @ArrayMinSize(5, {
    message: 'internshipActivityPlan must contain exactly 5 activities',
  })
  @ArrayMaxSize(5, {
    message: 'internshipActivityPlan must contain exactly 5 activities',
  })
  @IsString({
    each: true,
    message: 'Each activity in internshipActivityPlan must be a string',
  })
  @IsNotEmpty({
    each: true,
    message: 'Each activity in internshipActivityPlan must not be empty',
  })
  @MaxLength(200, {
    each: true,
    message:
      'Each activity in internshipActivityPlan must be no more than 200 characters',
  })
  internshipActivityPlan: string[];

  @IsString()
  @IsNotEmpty()
  grantingCompanyName: string;

  @IsCNPJ()
  @IsNotEmpty()
  grantingCompanyCNPJ: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyPostalCode: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyDistrict: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyCity: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyState: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyAddress: string;

  @IsEmail()
  @IsNotEmpty()
  grantingCompanyEmail: string;

  @IsString()
  @IsNotEmpty()
  grantingCompanyLegalRepresentative: string;

  @IsString()
  @IsNotEmpty()
  legalRepresentativeRole: string;

  @IsString()
  @IsNotEmpty()
  supervisor: string;

  @IsString()
  @IsNotEmpty()
  supervisorPosition: string;

  @IsString()
  @IsOptional()
  id_user?: string;

  @IsString()
  @IsOptional()
  termFilePathId?: string;
}

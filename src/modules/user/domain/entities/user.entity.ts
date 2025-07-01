import { InstitutionEntity } from '@/modules/institution/domain/entities/institution.entity';
import { InternshipProcessEntity } from '@/modules/internshipProcess/domain/entities/internshipProcess.entity';
import { TermCommitmentEntity } from '@/modules/termCommitment/domain/entities/termCommitment.entity';
import { v4 as uuid } from 'uuid';

export enum Role {
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export class UserEntity {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  academicRegistrationCode?: string | null;
  email: string;
  telephone: string;
  courseStudy?: string | null;
  password: string;
  role: string;
  UF: string;
  city: string;
  district: string;
  address: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  id_institution?: string | null;
  institution?: InstitutionEntity;
  termsCommitment?: TermCommitmentEntity[];
  internshipProcess?: InternshipProcessEntity[];
  files?: File[];

  constructor(props: Omit<UserEntity, 'id'>, id?: string) {
    props = {
      ...props,
      academicRegistrationCode: props.academicRegistrationCode ?? null,
      courseStudy: props.academicRegistrationCode ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      id_institution: props.academicRegistrationCode ?? null,
    };
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}

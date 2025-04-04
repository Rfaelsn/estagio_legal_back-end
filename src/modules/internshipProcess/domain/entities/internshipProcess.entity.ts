import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { InternshipProcessHistory, InternshipProcess } from '@prisma/client';
import { TermCommitmentEntity } from 'src/modules/termCommitment/domain/entities/termCommitment.entity';
import { v4 as uuid } from 'uuid';

export enum InternshipProcessStatus {
  COMPLETED = 'COMPLETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
}

export enum InternshipProcessMovement {
  STAGE_START = 'INTERNSHIP_START',
  RENEWAL = 'INTERNSHIP_RENEWAL',
  STAGE_END = 'INTERNSHIP_END',
  CREDIT = 'CREDIT',
}

export class InternshipProcessEntity implements InternshipProcess {
  id: string;
  movement: string;
  status: string;
  startDateProcess: Date;
  endDateProcess: Date;
  id_user: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
  id_termCommitment: string | null;
  termCommitment?: TermCommitmentEntity;
  statusHistory?: InternshipProcessHistory[];

  constructor(props: Omit<InternshipProcessEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}

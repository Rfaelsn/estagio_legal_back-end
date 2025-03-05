import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  filePath: string;
  fileType: string;
}

export enum FileType {
  TERM_COMMITMENT = 'TERM_COMMITMENT',
  STUDENT_SELF_EVALUATION = 'STUDENT_SELF_EVALUATION',
  INTERNSHIP_GRANTOR_EVALUATION = 'INTERNSHIP_GRANTOR_EVALUATION',
  SUPERVISOR_EVALUATION = 'SUPERVISOR_EVALUATION',
  RENEWAL_DOCUMENT = 'RENEWAL_DOCUMENT',
}

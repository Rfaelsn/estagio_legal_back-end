import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  filePath: string;
  fileType: FileType;
  internshipProcessId: string;
}

export enum FileType {
  TERM_COMMITMENT = 'TERM_COMMITMENT',
  EVALUATION = 'EVALUATION',
  RENOVATION = 'RENOVATION',
}

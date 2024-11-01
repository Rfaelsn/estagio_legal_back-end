import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  filePath: string;
  internshipProcessId: string;
}

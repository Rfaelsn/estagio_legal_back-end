import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  filePath: string;
  fileType: string;
  isAssigned: boolean;
}

export enum FileType {
  TERM_COMMITMENT = 'TERM_COMMITMENT',
  STUDENT_SELF_EVALUATION = 'STUDENT_SELF_EVALUATION',
  INTERNSHIP_GRANTOR_EVALUATION = 'INTERNSHIP_GRANTOR_EVALUATION',
  SUPERVISOR_EVALUATION = 'SUPERVISOR_EVALUATION',
  RENEWAL_DOCUMENT = 'RENEWAL_DOCUMENT',
  INTERNSHIP_CERTIFICATE = 'INTERNSHIP_CERTIFICATE',
}

export const FileTypeToFileName: Record<FileType, string> = {
  [FileType.TERM_COMMITMENT]: 'termo_compromisso',
  [FileType.STUDENT_SELF_EVALUATION]: 'autoavaliacao_estudante',
  [FileType.INTERNSHIP_GRANTOR_EVALUATION]: 'avaliacao_concedente',
  [FileType.SUPERVISOR_EVALUATION]: 'avaliacao_supervisor',
  [FileType.RENEWAL_DOCUMENT]: 'documento_renovacao',
  [FileType.INTERNSHIP_CERTIFICATE]: 'certificado_estagio',
};

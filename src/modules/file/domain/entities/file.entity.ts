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
  [FileType.TERM_COMMITMENT]: 'TermoCompromisso',
  [FileType.STUDENT_SELF_EVALUATION]: 'AutoAvaliacaoEstudante',
  [FileType.INTERNSHIP_GRANTOR_EVALUATION]: 'AvaliacaoConcedente',
  [FileType.SUPERVISOR_EVALUATION]: 'AvaliacaoSupervisor',
  [FileType.RENEWAL_DOCUMENT]: 'DocumentoRenovacao',
  [FileType.INTERNSHIP_CERTIFICATE]: 'CertificadoEstagio',
};

import { InternshipProcessHistory } from '@prisma/client';

export class InternshipProcessHistoryEntity
  implements InternshipProcessHistory
{
  id: string;
  startDate: Date | null;
  endDate: Date;
  status: string;
  movement: string;
  description: string;
  observacoes: string | null;
  fileId: string;
  idInternshipProcess: string;
}

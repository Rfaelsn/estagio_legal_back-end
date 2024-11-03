import { InternshipProcessHistory } from '@prisma/client';

export class InternshipProcessHistoryEntity
  implements InternshipProcessHistory
{
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  observacoes: string;
  id_internshipProcess: string;
}

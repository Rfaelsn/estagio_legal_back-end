import { InternshipProcessHistory } from '@prisma/client';

export class InternshipProcessHistoryEntity
  implements InternshipProcessHistory
{
  id: string;
  startDate: Date;
  endDate: Date | null;
  status: string;
  movement: string;
  description: string;
  observations: string | null;
  idInternshipProcess: string;
}

import { Role } from '@/modules/user/domain/entities/user.entity';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { InternshipProcessRepositoryPort } from '../port/internshipProcessRepository.port';

export class FilterInternshipProcessUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryPort,
  ) {}

  async handle(
    internshipProcessFilterDTO: InternshipProcessFilterDto,
    userId: string,
    userRole: string,
  ) {
    try {
      let filteredInternshipProcess = [];
      if (userRole === Role.ADMINISTRATOR || userRole === Role.EMPLOYEE) {
        filteredInternshipProcess =
          await this.internshipProcessRepository.filter(
            internshipProcessFilterDTO,
          );
      } else if (userRole === Role.STUDENT) {
        filteredInternshipProcess =
          await this.internshipProcessRepository.filterByStudent(
            internshipProcessFilterDTO,
            userId,
          );
      }

      return filteredInternshipProcess;
    } catch (error) {
      console.error(error);
    }
  }
}

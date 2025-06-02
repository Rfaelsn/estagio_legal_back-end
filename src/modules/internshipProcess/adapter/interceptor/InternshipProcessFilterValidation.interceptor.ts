// user-filter-validation.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InternshipProcessFilterDto } from '../../application/dto/internshipProcessFilter.dto';
import { UserFilterDTO } from 'src/modules/user/application/dto/userFilter.dto';
import { TermCommitmentFilterDTO } from 'src/modules/termCommitment/application/dto/termCommitmentFilter.dto';

@Injectable()
export class InternshipProcessFilterValidationInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const internshipProcessFilterDto = new InternshipProcessFilterDto();
    const allowedInternshipProcessAttributes = [
      'movement',
      'status',
      'startDateProcess',
      'endDateProcess',
      'user',
      'termCommitment',
      'page',
      'pageSize',
    ];

    for (const key in request.query) {
      if (!allowedInternshipProcessAttributes.includes(key)) {
        throw new BadRequestException(
          `Atributo '${key}' não é permitido no filtro do processo de estágio.`,
        );
      }
    }

    //validando filtro do usuario
    const userFilterDto = new UserFilterDTO();
    const allowedUserAttributes = [
      'name',
      'cpf',
      'registration',
      'email',
      'telefone',
      'courseStudy',
      'role',
    ];

    if (request.query?.user) {
      const userFilter = new UserFilterDTO();

      for (const key in request.query.user) {
        if (allowedUserAttributes.includes(key)) {
          userFilter[key] = request.query.user[key];
        } else {
          throw new BadRequestException(
            `Atributo '${key}' não é permitido no filtro do usuário.`,
          );
        }
      }

      request.query.user = userFilter;
    }

    //validando filtro do termo de compromisso
    const termCommitmentFilterDto = new TermCommitmentFilterDTO();
    const allowedTermCommitmentAttributes = [
      'numApoliceSeguro',
      'nomeSeguradora',
      'profOrientador',
      'codSiape',
      'dataInicioEstagio',
      'dataFimEstagio',
      'horaInicioEstagio',
      'horaFimEstagio',
    ];

    if (request.query?.termCommitment) {
      const termCommitmentFilter = new TermCommitmentFilterDTO();

      for (const key in request.query.termCommitment) {
        if (allowedTermCommitmentAttributes.includes(key)) {
          termCommitmentFilter[key] = request.query.termCommitment[key];
        } else {
          throw new BadRequestException(
            `Atributo '${key}' não é permitido no filtro do termo de compromisso.`,
          );
        }
      }

      request.query.termCommitment = termCommitmentFilter;
    }

    return next.handle().pipe(
      catchError((error) => {
        // Tratar erros, se necessário
        throw error;
      }),
    );
  }
}

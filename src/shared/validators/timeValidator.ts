import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTime', async: false })
export class IsTimeConstraint implements ValidatorConstraintInterface {
  validate(value: string | Date, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    const conversionType = args.constraints[0];

    if (conversionType === 'toDate') {
      if (typeof value !== 'string') {
        return false;
      }

      const timeRegex = /^(?:([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?)$/;
      const match = value.match(timeRegex);

      if (match) {
        const seconds = match[3] ? match[3] : '00';
        const dateValue = new Date(
          `1970-01-01T${match[1]}:${match[2]}:${seconds}.000Z`,
        );
        (args.object as any)[args.property] = dateValue;
        return true;
      }

      return false;
    } else if (conversionType === 'toTime') {
      if (!(value instanceof Date)) {
        return false;
      }

      const hours = String(value.getUTCHours()).padStart(2, '0');
      const minutes = String(value.getUTCMinutes()).padStart(2, '0');
      (args.object as any)[args.property] = `${hours}:${minutes}`;
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const conversionType = args.constraints[0];

    if (conversionType === 'toDate') {
      return `${args.property} deve estar no formato HH:MM ou HH:MM:SS`;
    } else if (conversionType === 'toTime') {
      return `${args.property} deve ser uma instância de Date`;
    }

    return `${args.property} deve ser um formato válido`;
  }
}

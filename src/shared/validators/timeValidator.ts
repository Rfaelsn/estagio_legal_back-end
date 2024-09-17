import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTime', async: false })
export class IsTimeConstraint implements ValidatorConstraintInterface {
  validate(time: string, args: ValidationArguments) {
    if (!time) {
      return false;
    }

    const timeRegex = /^(?:([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?)$/;
    const match = time.match(timeRegex);

    if (match) {
      const seconds = match[3] ? match[3] : '00';
      const dateValue = new Date(
        `1970-01-01T${match[1]}:${match[2]}:${seconds}.000Z`,
      );
      (args.object as any)[args.property] = dateValue;
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} deve estar no formato HH:MM ou HH:MM:SS`;
  }
}

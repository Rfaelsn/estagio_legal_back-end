import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsTimeConstraint } from '../validators/timeValidator';

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeConstraint,
    });
  };
}

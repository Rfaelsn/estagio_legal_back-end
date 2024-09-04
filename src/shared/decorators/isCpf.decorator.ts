import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsCPFConstraint } from '../validators/cpfValidator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}

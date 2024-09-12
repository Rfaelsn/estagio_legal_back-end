import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsCNPJConstraint } from '../validators/cnpjValidator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCNPJConstraint,
    });
  };
}

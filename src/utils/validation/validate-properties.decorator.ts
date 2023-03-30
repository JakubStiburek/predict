import { validateSync } from 'class-validator';
import { InvalidPropertyValueException } from './invalid-property.exception';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ValidateProperties<T extends Constructor>(constructor: T): T {
  return class ValidatedClass extends constructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.validate();
    }

    private validate(): void {
      const errors = validateSync(this, { stopAtFirstError: true });

      if (errors.length) {
        const [err] = errors;
        const className = Object.getPrototypeOf(this.constructor).name;
        const failedValidation = Object.keys(err.constraints ?? []);
        const strErr =
          `An instance of ${className} has failed the validation.` +
          ` Property: ${err.property}. Constraint: ${failedValidation}. Value provided: ${err.value}.`;

        throw new InvalidPropertyValueException(strErr);
      }
    }
  };
}

import { BaseSchema } from './BaseSchema';
import { CustomValidatorFn } from './types';

export class ArraySchema extends BaseSchema {
  constructor(customValidators: Record<string, CustomValidatorFn> = {}) {
    super(customValidators);
  }

  sizeof(size: number) {
    this.checks.sizeof = (value: any[]) => value.length === size;

    return this;
  }
}

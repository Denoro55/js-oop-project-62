import { BaseSchema } from './BaseSchema';
import { CustomValidatorFn } from './types';

export class StringSchema extends BaseSchema {
    constructor(customValidators: Record<string, CustomValidatorFn> = {}) {
        super(customValidators);
    }

    contains(substring: string) {
        this.checks.contains = (value: string) => value.includes(substring);

        return this;
    }

    minLength(minLength: number) {
        this.checks.minLength = (value: string) => value.length >= minLength;

        return this;
    }
}

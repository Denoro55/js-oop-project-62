import { BaseSchema } from './BaseSchema';
import { CustomValidatorFn } from './types';

export class NumberSchema extends BaseSchema {
    constructor(customValidators: Record<string, CustomValidatorFn> = {}) {
        super(customValidators);
    }

    contains(substring: string) {
        this.checks.contains = (value: string) => value.includes(substring);

        return this;
    }

    positive() {
        this.checks.positive = (value: number) => value > 0;

        return this;
    }

    range(min: number, max: number) {
        this.checks.range = (value: number) => value >= min && value <= max;

        return this;
    }
}

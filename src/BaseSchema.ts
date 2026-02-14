import { CustomValidatorFn } from './types';

export class BaseSchema {
    protected checks: Record<string, (value: any) => boolean> = {};
    private customValidators: Record<string, CustomValidatorFn>;

    constructor(customValidators: Record<string, CustomValidatorFn> = {}) {
        this.customValidators = customValidators;
    }

    required() {
        this.checks.required = (value: any) => Boolean(value) && value !== undefined && value !== null;

        return this;
    }

    test(name: string, ...args: any[]) {
        this.checks[name] = (value: any) => this.customValidators[name](value, ...args);

        return this;
    }

    isValid(value: any) {
        if (!this.checks.required && (value === undefined || value === null)) {
            return true;
        }

        return Object.values(this.checks).every((rule) => {
            return rule(value);
        });
    }
}

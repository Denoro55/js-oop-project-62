import { BaseSchema } from './BaseSchema';
import { CustomValidatorFn } from './types';

export class ObjectSchema extends BaseSchema {
    constructor(customValidators: Record<string, CustomValidatorFn> = {}) {
        super(customValidators);
    }

    shape(schema: Record<string, any>) {
        this.checks.shape = (value: any) => {
            return Object.entries(value).every(([key, value]) => {
                console.log(key, value, schema[key].isValid(value));

                return schema[key].isValid(value);
            });
        };

        return this;
    }
}

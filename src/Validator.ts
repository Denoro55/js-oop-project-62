import { ArraySchema } from './ArraySchema';
import { NumberSchema } from './NumberSchema';
import { ObjectSchema } from './ObjectSchema';
import { StringSchema } from './StringSchema';
import { CustomValidatorFn, TypeSchema } from './types';

export class Validator {
    private customValidators: Partial<Record<TypeSchema, Record<string, CustomValidatorFn>>> = {};

    addValidator(type: TypeSchema, name: string, fn: CustomValidatorFn) {
        if (!this.customValidators[type]) {
            this.customValidators[type] = {};
        }

        this.customValidators[type][name] = fn;
    }

    string() {
        return new StringSchema(this.customValidators['string']);
    }

    number() {
        return new NumberSchema(this.customValidators['number']);
    }

    array() {
        return new ArraySchema(this.customValidators['array']);
    }

    object() {
        return new ObjectSchema(this.customValidators['object']);
    }
}

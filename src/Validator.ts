type RuleFn = (value) => boolean;

export class Validator {
    private rules: Record<string, RuleFn>;

    constructor(rules: Record<string, RuleFn> = {}) {
        this.rules = rules;
    }

    static withUndefinedOrNullCheck(value: unknown, fn: (value: unknown) => boolean) {
        if (typeof value === 'undefined' || value === null) {
            return true;
        }

        return fn(value);
    }

    isValid(value: unknown) {
        return Object.entries(this.rules).every(([key, rule]) => {
            if (rule(value)) {
                return true;
            }

            console.info('Rule failed: ', key);

            return false;
        });
    }

    string() {
        const ruleString = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => typeof value === 'string');
        };

        return new Validator({ string: ruleString });
    }

    number() {
        const ruleNumber = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => typeof value === 'number');
        };

        return new Validator({ number: ruleNumber });
    }

    range(min: number, max: number) {
        this.rules.range = (value) => value >= min && value <= max;

        return this;
    }

    positive() {
        this.rules.positive = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => Number(value) > 0);
        };

        return this;
    }

    required() {
        this.rules.required = (value) => Boolean(value);

        return this;
    }

    contains(substr: string) {
        this.rules.contains = (value) => value.includes(substr);

        return this;
    }

    minLength(minValue: number) {
        this.rules.minLength = (value) => value.length >= minValue;

        return this;
    }

    array() {
        this.rules.array = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => Array.isArray(value));
        };

        return this;
    }

    sizeof(size: number) {
        this.rules.sizeof = (value) => value.length === size;

        return this;
    }

    object() {
        this.rules.object = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

        return this;
    }

    shape(schema: Record<string, Validator>) {
        this.rules.shape = (obj) => {
            return Object.entries(obj).every(([key, value]) => {
                return schema[key].isValid(value);
            });
        };

        return this;
    }
}

export class Validator {
    private rules: Record<string, (value) => boolean> = {};

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
        this.rules.string = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => typeof value === 'string');
        };

        return this;
    }

    number() {
        this.rules.number = (value) => {
            return Validator.withUndefinedOrNullCheck(value, (value) => typeof value === 'number');
        };

        return this;
    }

    range(min: number, max: number) {
        this.rules.range = (value) => value >= min && value <= max;

        return this;
    }

    positive() {
        this.rules.positive = (value) => Number(value) > 0;

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
}

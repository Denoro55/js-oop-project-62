export class Validator {
    private rules: Record<string, (value) => boolean> = {};

    static isUndefinedOrNull(value: unknown) {
        return typeof value === 'undefined' || value === null;
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
            if (Validator.isUndefinedOrNull(value)) {
                return true;
            }

            return typeof value === 'string';
        };

        return this;
    }

    number() {
        this.rules.number = (value) => {
            if (Validator.isUndefinedOrNull(value)) {
                return true;
            }

            return typeof value === 'number';
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
}

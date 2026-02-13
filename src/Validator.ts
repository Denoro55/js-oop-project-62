export class Validator {
    private rules: Record<string, (value) => boolean> = {};

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
            if (typeof value === 'undefined' || value === null) {
                return true;
            }

            return typeof value === 'string';
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
}

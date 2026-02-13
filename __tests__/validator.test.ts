import Validator from '../index';

describe('validator', () => {
    describe('step 1', () => {
        test('string schema without required accepts empty values', () => {
            const v = new Validator();
            const schema = v.string();

            expect(schema.isValid('')).toBe(true);
            expect(schema.isValid(null)).toBe(true);
            expect(schema.isValid(undefined)).toBe(true);
        });

        test('string schema with required rejects empty values', () => {
            const v = new Validator();
            const schema = v.string().required();

            expect(schema.isValid('what does the fox say')).toBe(true);
            expect(schema.isValid('hexlet')).toBe(true);
            expect(schema.isValid(null)).toBe(false);
            expect(schema.isValid('')).toBe(false);
        });

        test('contains checks substring', () => {
            const v = new Validator();
            const schema = v.string().required();

            expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
            expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);
        });

        test('last contains has priority', () => {
            const v = new Validator();
            const schema = v.string().required().contains('what').contains('whatthe');

            // false, так как добавлена проверка contains('whatthe')
            expect(schema.isValid('what does the fox say')).toBe(false);
        });

        test('last minLength has priority', () => {
            const v = new Validator();
            const schema = v.string().required();

            // Если один валидатор вызывался несколько раз,
            // то последний имеет приоритет (перетирает предыдущий)
            expect(schema.minLength(10).minLength(4).isValid('Hexlet')).toBe(true);
        });
    });

    describe('step 2', () => {
        test('number schema without required accepts null', () => {
            const v = new Validator();
            const schema = v.number();

            expect(schema.isValid(null)).toBe(true);
        });

        test('number schema with required rejects null and accepts numbers', () => {
            const v = new Validator();
            const schema = v.number().required();

            expect(schema.isValid(null)).toBe(false);
            expect(schema.isValid(7)).toBe(true);
        });

        test('positive checks for positive numbers', () => {
            const v = new Validator();
            const schema = v.number().required().positive();

            expect(schema.isValid(10)).toBe(true);
        });

        test('range checks number is within range', () => {
            const v = new Validator();
            const schema = v.number().required().positive().range(-5, 5);

            expect(schema.isValid(-3)).toBe(false);
            expect(schema.isValid(5)).toBe(true);
        });
    });

    describe('step 3', () => {
        test('array schema without required accepts null', () => {
            const v = new Validator();
            const schema = v.array();

            expect(schema.isValid(null)).toBe(true);
        });

        test('array schema with required rejects null and accepts arrays', () => {
            const v = new Validator();
            const schema = v.array().required();

            expect(schema.isValid(null)).toBe(false);
            expect(schema.isValid([])).toBe(true);
            expect(schema.isValid(['hexlet'])).toBe(true);
        });

        test('sizeof checks array length', () => {
            const v = new Validator();
            const schema = v.array().required().sizeof(2);

            expect(schema.isValid(['hexlet'])).toBe(false);
            expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true);
        });
    });
});

import { Validator } from '../../src/Validator';

describe('Validator', () => {
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

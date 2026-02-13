import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettier,
    // {
    //     files: ['**/*.{js,ts}'],
    //     rules: {
    //         'no-unused-vars': 'off',
    //         '@typescript-eslint/no-unused-vars': 'warn',
    //     },
    // },
];

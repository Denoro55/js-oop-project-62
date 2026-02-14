import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  stylistic.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]);

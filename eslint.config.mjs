import { fixupConfigRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['plugins/**/*', '**/metro.config.js'],
	},
	...fixupConfigRules(
		compat.extends(
			'@react-native',
			'airbnb',
			'eslint:recommended',
			'airbnb/hooks',
			'airbnb-typescript',
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-requiring-type-checking',
			'plugin:prettier/recommended',
			'plugin:import/recommended',
			'plugin:react/recommended',
			'plugin:react/jsx-runtime',
		),
	),
	{
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},

				tsconfigRootDir: '.',
				project: ['./tsconfig.json'],
			},
		},

		settings: {
			'import/resolver': {
				node: {
					extensions: ['.ts', '.tsx'],
				},

				typescript: {},
			},

			react: {
				version: '18.x',
			},
		},

		rules: {
			'@typescript-eslint/no-unused-vars': 'error',
			'global-require': 0,
			'react-hooks/exhaustive-deps': 'off',
			quotes: ['error', 'single'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],

			'react/require-default-props': [
				'error',
				{
					functions: 'defaultArguments',
				},
			],

			'react/default-props-match-prop-types': ['error'],
			'react/sort-prop-types': ['error'],
			'react/no-array-index-key': 'off',
			'no-tabs': 'off',
			'no-void': 'off',
			'react/jsx-props-no-spreading': 'off',
			'import/prefer-default-export': 'off',

			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true,
				},
			],

			'react/display-name': 'off',

			'no-console': [
				'error',
				{
					allow: ['error'],
				},
			],

			'prettier/prettier': [
				'error',
				{
					printWidth: 80,
					endOfLine: 'lf',
					tabWidth: 2,
					indentStyle: 'space',
					useTabs: true,
					arrowParens: 'avoid',
					bracketSameLine: false,
					singleQuote: true,
					trailingComma: 'all',
				},
			],
		},
	},
];

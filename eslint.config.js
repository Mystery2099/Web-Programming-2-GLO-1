import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['node_modules/**', 'dist/**', 'docs/**', '*.js'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: {
				Bun: 'readonly',
				console: 'readonly',
				document: 'readonly',
				window: 'readonly',
				navigator: 'readonly',
				screen: 'readonly',
				localforage: 'readonly',
				lucide: 'readonly',
				GLightbox: 'readonly',
				fetch: 'readonly',
				setTimeout: 'readonly',
				HTMLFormElement: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...prettier.rules,
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': 'off',
		},
	},
];

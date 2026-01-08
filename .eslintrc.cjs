module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', 'node_modules', 'storybook-static', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
};
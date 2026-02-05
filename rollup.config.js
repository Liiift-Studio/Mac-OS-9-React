// Rollup configuration for Mac OS 9 React UI library
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default [
	// Main build for ESM and CJS
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
				banner: '"use client";',
			},
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
				banner: '"use client";',
				exports: 'named',
			},
		],
		plugins: [
			// Automatically externalize peer dependencies
			peerDepsExternal(),

			// Resolve node modules
			resolve({
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			}),

			// Convert CommonJS modules to ES6
			commonjs(),

			// Process CSS with modules support
			postcss({
				plugins: [
					// Process @import statements - MUST be first
					postcssImport(),
					// Copy font files referenced in CSS
					postcssUrl({
						url: 'copy',
						useHash: true,
					}),
					// Check if we need to refine the path handling if using assetsPath relative to root
					// But usually with extract: 'dist/index.css', assetsPath: 'fonts' should work if relative to 'to'
				],
				modules: {
					// Generate scoped class names
					generateScopedName: '[name]_[local]',
				},
				// Extract CSS to separate file
				extract: 'dist/index.css',
				// Explicitly set the output path for correct relative path calculation
				to: 'dist/index.css',
				// Minimize CSS in production
				minimize: false,
				// Enable source maps
				sourceMap: true,
				// Auto-prefix CSS
				autoModules: true,
				// Process .css and .module.css files
				test: /\.css$/,
			}),

			// Compile TypeScript
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationDir: 'dist/types',
				declarationMap: false,
				exclude: [
					'**/*.test.tsx',
					'**/*.test.ts',
					'**/*.stories.tsx',
					'node_modules',
					'dist',
				],
			}),

			// Copy font files to dist
			copy({
				targets: [
					{
						src: 'src/fonts/pixelOperator/*.ttf',
						dest: 'dist/fonts/pixelOperator',
					},
					{
						src: 'src/fonts/pixelOperator/LICENSE.txt',
						dest: 'dist/fonts/pixelOperator',
					},
				],
			}),
		],
		external: ['react', 'react-dom', 'react/jsx-runtime'],
	},

	// Bundle TypeScript declaration files
	{
		input: 'dist/types/index.d.ts',
		output: [
			{
				file: 'dist/index.d.ts',
				format: 'esm',
			},
		],
		plugins: [dts()],
		external: [/\.css$/],
	},
];

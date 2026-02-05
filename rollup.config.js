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
					// Inline font files as base64 data URLs
					postcssUrl({
						url: 'inline',
					}),
				],
				modules: {
					// Generate scoped class names
					generateScopedName: '[name]_[local]',
				},
				// Extract CSS to separate file
				extract: 'index.css',
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
						src: 'src/fonts/Pixel',
						dest: 'dist/fonts',
					},
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

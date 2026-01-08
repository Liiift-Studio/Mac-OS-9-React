import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: false,
	external: ['react', 'react-dom'],
	outDir: 'dist',
	esbuildOptions(options) {
		options.banner = {
			js: '"use client";',
		};
	},
	onSuccess: 'tsc --emitDeclarationOnly --declaration',
});
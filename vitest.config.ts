import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'dist/',
				'storybook-static/',
				'**/*.stories.tsx',
				'**/*.config.ts',
				'vitest.setup.ts',
			],
		},
	},
});
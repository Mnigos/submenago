/// <reference types="vitest" />

import React from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [React(), tsconfigPaths()],
	test: {
		resolveSnapshotPath: (testPath, snapshotExtension) =>
			`./tests/snapshots/${testPath.split('/').at(-1)}${snapshotExtension}`,
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			exclude: [
				'**/node_modules/**',
				'**/.next/**',
				'**/modules/**',
				'**/pages/**',
				'**/types/**',
				'**/constants/**',
				'**/tests/**',
				'**/index.ts',
				'**/*.config.ts',
				'**/*.config.js',
				'**/*.d.ts',
				'**/*.svg.*',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/*.stories.tsx',
				'**/*.skeleton.tsx',
				'**/.storybook/**',
				'**/storybook-static/**',
				'postcss.config.mjs',
				'convex/_generated/**',
			],
			all: true,
		},
		exclude: ['**/tests/**', '**/node_modules/**'],
	},
})

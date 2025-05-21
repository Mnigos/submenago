import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	skipValidation: process.env.GITHUB_ACTIONS === 'true',
	server: {
		DATABASE_URL: z.string().url(),
		DIRECT_URL: z.string().url().optional(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url().optional(),
		VERCEL_URL: z.string().optional(),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		DIRECT_URL: process.env.DIRECT_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		VERCEL_URL: process.env.VERCEL_URL,
	},
})

import type { NextConfig } from 'next'
import './env'

const CSPHeader = `
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

export default {
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
    taint: true,
	},
	logging: {
		fetches: {
			hmrRefreshes: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
			},
			{
				protocol: 'https',
				hostname: 'dev.afrocharts.com',
			},
			{
				protocol: 'https',
				hostname: 'scontent-*.xx.fbcdn.net',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'x-frame-options',
						value: 'deny',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Content-Security-Policy',
						value: CSPHeader.replaceAll('\n', ''),
					},
				],
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/ingest/static/:path*',
				destination: 'https://us-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/ingest/:path*',
				destination: 'https://us.i.posthog.com/:path*',
			},
			{
				source: '/ingest/decide',
				destination: 'https://us.i.posthog.com/decide',
			},
		]
	},
} satisfies NextConfig

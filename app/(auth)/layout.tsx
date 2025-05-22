import type { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main className="container mx-auto flex min-h-screen w-screen items-center justify-center">
			{children}
		</main>
	)
}

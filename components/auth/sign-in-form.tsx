'use client'

import { authClient } from '@/lib/auth.client'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Message, useAppForm } from '../ui/form'
import { Input } from '../ui/input'

const SignInFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
})

export function SignInForm() {
	const [isLoading, startTransition] = useTransition()
	const [error, setError] = useState<string>('')
	const router = useRouter()
	const form = useAppForm({
		validators: { onChange: SignInFormSchema },
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value: { email, password } }) => {
			await authClient.signIn.email(
				{
					email,
					password,
					callbackURL: '/',
				},
				{
					onSuccess: () => {
						router.push('/')
						router.refresh()
					},
					onError: ({ error }) => {
						setError(error.message)
					},
				},
			)
		},
	})

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		event.stopPropagation()
		startTransition(async () => {
			await form.handleSubmit()
		})
	}

	return (
		<form.AppForm>
			<form onSubmit={handleSubmit} className="flex w-80 flex-col gap-0.5">
				<form.AppField name="email">
					{field => (
						<field.FormItem>
							<field.FormLabel>Email</field.FormLabel>
							<field.FormControl>
								<Input
									type="email"
									value={field.state.value}
									onChange={({ target }) => field.handleChange(target.value)}
									onBlur={field.handleBlur}
								/>
							</field.FormControl>
							<field.FormMessage />
						</field.FormItem>
					)}
				</form.AppField>

				<form.AppField name="password">
					{field => (
						<field.FormItem>
							<field.FormLabel>Password</field.FormLabel>
							<field.FormControl>
								<Input
									type="password"
									value={field.state.value}
									onChange={({ target }) => field.handleChange(target.value)}
									onBlur={field.handleBlur}
								/>
							</field.FormControl>
							<field.FormMessage />
						</field.FormItem>
					)}
				</form.AppField>

				<Button type="submit" disabled={isLoading} className="mt-2">
					{isLoading ? (
						<>
							<LoaderCircle className="animate-spin" />
							Signing in...
						</>
					) : (
						'Sign In'
					)}
				</Button>

				<Message className="mt-2">{error}</Message>
			</form>
		</form.AppForm>
	)
}

import { SignInForm } from '@/components/auth/sign-in-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignInPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
			</CardHeader>

			<CardContent>
				<SignInForm />
			</CardContent>
		</Card>
	)
}

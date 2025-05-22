import { SignUpForm } from '@/components/auth/sign-up-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUpPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>

			<CardContent>
				<SignUpForm />
			</CardContent>
		</Card>
	)
}

import Link from 'next/link'
import { Button } from '../ui/button'
import {
	NavigationBarUserPopover,
	type NavigationBarUserPopoverProps,
} from './navigation-bar-user-popover'

export function NavigationBar({
	user,
}: Readonly<Partial<NavigationBarUserPopoverProps>>) {
	return (
		<nav className="border-b bg-slate-950">
			<div className="container mx-auto flex h-12 w-full items-center justify-between gap-2 p-2">
				<p className="font-medium uppercase">Submenago</p>

				<div className="flex gap-4">
					{user ? (
						<NavigationBarUserPopover user={user} />
					) : (
						<>
							<Button asChild>
								<Link href="/sign-in">Sign In</Link>
							</Button>

							<Button asChild variant="outline">
								<Link href="/sign-up">Sign Up</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

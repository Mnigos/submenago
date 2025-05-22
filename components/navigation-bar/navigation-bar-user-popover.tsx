'use client'

import { authClient } from '@/lib/auth.client'
import type { User } from 'better-auth'
import { LogOut, User as UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export interface NavigationBarUserPopoverProps {
	user: Pick<User, 'name' | 'email'>
}

export function NavigationBarUserPopover({
	user,
}: Readonly<NavigationBarUserPopoverProps>) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" aria-label="User">
					<UserIcon className="h-4 w-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="gap-2">
				<div>
					<p className="uppercase">{user.name}</p>
					<p className="text-foreground/50 text-sm uppercase">{user.email}</p>
				</div>
				<Button variant="outline" onClick={() => authClient.signOut()}>
					<LogOut className="h-4 w-4" />
					Sign Out
				</Button>
			</PopoverContent>
		</Popover>
	)
}

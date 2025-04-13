import type { AdapterUser } from '@auth/sveltekit/adapters';
import { User } from '@axium/core/schemas';
import { adapter } from '@axium/server/auth.js';
import { pick } from 'utilium';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const { user, session } = await event.parent();

	if (!user) return { user, session, friends: [] };

	const friends: Pick<AdapterUser, keyof User>[] = [];

	for (const id of user.preferences._friends) {
		const friend = await adapter.getUser!(id);
		if (!friend) continue;
		friends.push(pick(friend, Object.keys(User.keyof().enum) as (keyof User)[]));
	}

	return { user, session, friends };
}

import type { AdapterUser } from '@auth/sveltekit/adapters';
import { User } from '@axium/core/schemas';
import { adapter } from '@axium/server/auth.js';
import { loadSession } from '@axium/server/web/server';
import { pick } from 'utilium';
import type { PageServerLoadEvent } from './$types';

/**
 * @todo This will be implemented in the future.
 * A @axium/social package would work nicely.
 */
function getFriendsOf(id: string) {
	return [];
}

export async function load(event: PageServerLoadEvent) {
	const { session } = await loadSession(event);
	const { user } = await event.parent();

	if (!user) return { user, session, friends: [] };

	const friends: Pick<AdapterUser, keyof User>[] = [];

	for (const id of getFriendsOf(user.id)) {
		const friend = await adapter.getUser!(id);
		if (!friend) continue;
		friends.push(pick(friend, Object.keys(User.keyof().enum) as (keyof User)[]));
	}

	return { user, session, friends };
}

import { adapter, createAdapter } from '@axium/server/auth.js';
import * as db from '@axium/server/database.js';
import { redirect } from '@sveltejs/kit';

createAdapter();

export async function load(event) {
	const session = await event.locals.auth();

	const user = session?.user?.email ? await adapter.getUserByEmail?.(session.user.email) : null;

	if (user?.preferences) {
		if (!user.preferences._friends) await adapter.updateUser?.({ id: user.id, preferences: { ...user.preferences, _friends: [] } });
		if (!user.preferences._roles) {
			const { users } = await db.status();
			await adapter.updateUser?.({ id: user.id, preferences: { ...user.preferences, _roles: users == 1 ? ['admin'] : [] } });
		}
	}

	if (user && !user.name && event.url.pathname != '/account/edit/name') redirect(307, '/account/edit/name');

	return { session, user };
}

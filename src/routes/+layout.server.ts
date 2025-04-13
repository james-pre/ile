import { adapter, createAdapter } from '@axium/server/auth.js';

createAdapter();

export async function load(event) {
	const session = await event.locals.auth();

	const user = session?.user?.email ? await adapter.getUserByEmail?.(session.user.email) : null;

	if (user?.preferences) {
		if (!user.preferences._friends) await adapter.updateUser?.({ id: user.id, preferences: { ...user.preferences, _friends: [] } });
		if (!user.preferences._roles) await adapter.updateUser?.({ id: user.id, preferences: { ...user.preferences, _roles: [] } });
	}

	return { session, user };
}

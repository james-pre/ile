import { fail, type Actions } from '@sveltejs/kit';
import { UserSettings } from '../../lib/settings.js';
import { parseForm } from '@axium/server/web/server';
import { adapter } from '@axium/server/auth.js';

export const actions = {
	async settings(event) {
		const session = await event.locals.auth();
		if (!session?.user?.email) return fail(401, { error: 'You are not signed in' });

		const [settings, error] = await parseForm(event, UserSettings);
		if (error) return error;

		const user = await adapter.getUserByEmail!(session.user.email);
		if (!user) return fail(500, { settings, error: 'User does not exist' });

		await adapter.updateUser!({ id: user.id, preferences: { ...settings, _roles: user.preferences._roles } });

		return { success: true, settings };
	},
} satisfies Actions;

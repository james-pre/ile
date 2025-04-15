import { fail, type Actions } from '@sveltejs/kit';
import { Settings } from '../../lib/settings';
import { tryZod } from '@axium/server/web/utils.js';
import { adapter } from '@axium/server/auth.js';

export const actions = {
	async settings(event) {
		const session = await event.locals.auth();
		if (!session?.user?.email) return fail(401, { error: 'Unauthorized' });

		const [settings, error] = tryZod(Settings.safeParse(Object.fromEntries(await event.request.formData())));
		if (error) return error;

		const user = await adapter.getUserByEmail!(session.user.email);
		if (!user) return fail(500, { settings, error: 'User does not exist' });

		return { success: true };
	},
} satisfies Actions;

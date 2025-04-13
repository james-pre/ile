import { adapter } from '@axium/server/auth.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ params }: PageServerLoadEvent) {
	const user = await adapter.getUser!(params.user);

	if (!user) return fail(404, { message: 'User not found' });

	return { viewing: user };
}

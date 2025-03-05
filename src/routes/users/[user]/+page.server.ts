import * as demo from '$lib/demo.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export function load({ params }: PageServerLoadEvent) {
	if (!(params.user in demo.users)) {
		return fail(404);
	}

	return { user: demo.users[params.user], viewer: demo.users.john_doe };
}

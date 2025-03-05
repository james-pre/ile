import * as demo from '$lib/demo.js';
import type { PageServerLoadEvent } from './$types';

export function load({ params }: PageServerLoadEvent) {
	return { user: demo.users.john_doe };
}

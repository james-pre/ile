import * as demo from '$lib/demo.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export function load({ params }: PageServerLoadEvent) {
	if (params.course != 'demo') fail(404);

	return { course: demo.course };
}

import { getCourses } from '$lib/data.server.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const data = await event.parent();
	if (!data.user) redirect(307, '/auth/signin');

	const courses = await getCourses(data.user.id);

	return { ...data, courses };
}

import { hasPermission } from '$lib/data.js';
import { getCourse } from '$lib/data.server.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const data = await event.parent();
	const { user } = data;

	const id = event.params.course;

	const course = await getCourse(id);
	if (!course) return fail(404, { message: 'Course does not exist' });
	if (hasPermission(course, user?.id, 0)) return fail(403, { message: 'You do not have permission to view this course' });

	return { ...data, course };
}

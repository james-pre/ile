import { hasPermission } from '$lib/data.js';
import { getCourse } from '$lib/data.server.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const data = await event.parent();
	const { session, user } = data;

	const id = event.params.course;

	const course = await getCourse(id);
	if (!course) return error(404, 'Course does not exist');
	console.log(course.userId, user?.id);
	if (!hasPermission(course, user?.id, 1)) return error(403, 'You do not have permission to view this course');

	return { session, user, course };
}

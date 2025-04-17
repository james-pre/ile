import { createCourse, deleteCourse, getCourse, getCourses } from '$lib/data.server.js';
import { adapter } from '@axium/server/auth.js';
import { parseForm } from '@axium/server/web/utils.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import * as z from 'zod';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const data = await event.parent();
	if (!data.user) redirect(307, '/auth/signin');

	const courses = await getCourses(data.user.id);

	return { ...data, courses };
}

export const actions = {
	async create(event) {
		const session = await event.locals.auth();
		if (!session?.user?.email) return fail(401, { error: 'You are not signed in' });

		const user = await adapter.getUserByEmail!(session.user.email);
		if (!user) return fail(500, { error: 'User does not exist' });

		const [data, error] = await parseForm(event, z.object({ name: z.string().min(1).max(100) }));
		if (error) return error;

		try {
			await createCourse(data.name, user.id);
		} catch {
			return fail(500, { error: 'Failed to create course' });
		}
		return { success: true };
	},
	async remove(event) {
		const session = await event.locals.auth();
		if (!session?.user?.email) return fail(401, { error: 'You are not signed in' });

		const user = await adapter.getUserByEmail!(session.user.email);
		if (!user) return fail(500, { error: 'User does not exist' });

		const [{ id }, error] = await parseForm(event, z.object({ id: z.string().uuid() }));
		if (error) return error;

		const course = await getCourse(id);
		if (!course) return fail(404, { error: 'Course not found' });

		if (course.userId !== user.id) return fail(403, { error: 'Only the course owner can delete the course' });

		try {
			await deleteCourse(id);
		} catch {
			return fail(500, { error: 'Failed to delete course' });
		}
		return { success: true };
	},
} satisfies Actions;

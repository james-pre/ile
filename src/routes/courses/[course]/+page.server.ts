import { hasPermission, UploadResource } from '$lib/data.js';
import { createResource, getCourse } from '$lib/data.server.js';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';
import { parseForm } from '@axium/server/web/utils.js';
import { createHash } from 'node:crypto';
import { adapter } from '@axium/server/auth.js';

const hash = createHash('BLAKE2s256');

export async function load(event: PageServerLoadEvent) {
	const data = await event.parent();
	const { session, user } = data;

	const id = event.params.course;

	const course = await getCourse(id);
	if (!course) return error(404, 'Course does not exist');
	if (!hasPermission(course, user?.id, 1)) return error(403, 'You do not have permission to view this course');

	return { session, user, course };
}

export const actions = {
	async upload_resource(event) {
		const session = await event.locals.auth();
		if (!session?.user?.email) return fail(401, { error: 'You are not signed in' });

		const user = await adapter.getUserByEmail!(session.user.email);
		if (!user) return fail(500, { error: 'User does not exist' });

		const courseId = event.params.course;
		if (!courseId) return fail(500, { error: 'Missing course ID' });

		const [{ file } = {}, error] = await parseForm(event, UploadResource);
		if (error) return error;
		if (!file) return fail(400, { error: 'File is required' });

		const u8 = new Uint8Array(await file.arrayBuffer());
		const hashed = hash.update(u8).digest('hex');

		try {
			await createResource({ userId: user.id, courseId, name: file.name, type: file.type, content: hashed });
		} catch {
			return fail(500, { error: 'Failed to upload resource' });
		}
	},
	async add_resource(event) {},
	async remove_resource(event) {},
} satisfies Actions;

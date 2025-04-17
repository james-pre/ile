import { database } from '@axium/server/database.js';
import type { CourseMetadata } from './data.js';

export async function getCourses(userId: string): Promise<CourseMetadata[]> {
	return await database.withSchema('arc').selectFrom('Course').selectAll().where('userId', '=', userId).execute();
}

export async function getCourse(id: string): Promise<CourseMetadata> {
	return await database.withSchema('arc').selectFrom('Course').selectAll().where('id', '=', id).executeTakeFirstOrThrow();
}

export async function createCourse(name: string, userId: string): Promise<void> {
	await database.withSchema('arc').insertInto('Course').values({ userId, name }).execute();
}

export async function shareCourse(courseId: string, userId: string, permission: number): Promise<void> {
	await database.withSchema('arc').insertInto('CourseShare').values({ courseId, userId, permission }).execute();
}

export async function unshareCourse(courseId: string, userId: string): Promise<void> {
	await database.withSchema('arc').deleteFrom('CourseShare').where('courseId', '=', courseId).where('userId', '=', userId).execute();
}

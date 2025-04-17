import { database } from '@axium/server/database.js';
import { type Course } from './data.js';

export async function getCourses(userId: string): Promise<Course[]> {
	const result: Course[] = [];

	for (const course of await database.withSchema('arc').selectFrom('Course').selectAll().where('userId', '=', userId).execute()) {
		result.push({ ...course, isShared: false });
	}

	for (const course of await database
		.withSchema('arc')
		.selectFrom('Course as course')
		.innerJoin('CourseShare as share', 'share.courseId', 'course.id')
		.where('share.userId', '=', userId)
		.selectAll()
		.execute()) {
		result.push({ ...course, isShared: true });
	}

	return result;
}

export async function getCourse(id: string): Promise<Course | undefined> {
	const course: Course | undefined = await database.withSchema('arc').selectFrom('Course').selectAll().where('id', '=', id).executeTakeFirst();
	if (!course) return undefined;

	course.shares = await database.withSchema('arc').selectFrom('CourseShare').where('courseId', '=', id).selectAll().execute();
	course.resources = await database.withSchema('arc').selectFrom('Resource').where('courseId', '=', id).selectAll().execute();
	return course;
}

export async function createCourse(name: string, userId: string): Promise<void> {
	await database.withSchema('arc').insertInto('Course').values({ name, userId }).execute();
}

export async function deleteCourse(id: string): Promise<void> {
	await database.withSchema('arc').deleteFrom('Course').where('id', '=', id).execute();
}

export async function shareCourse(courseId: string, userId: string, permission: number): Promise<void> {
	await database.withSchema('arc').insertInto('CourseShare').values({ courseId, userId, permission }).execute();
}

export async function unshareCourse(courseId: string, userId: string): Promise<void> {
	await database.withSchema('arc').deleteFrom('CourseShare').where('courseId', '=', courseId).where('userId', '=', userId).execute();
}

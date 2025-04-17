import type { Generated } from 'kysely';
import type { ResourceKind } from './data.js';

export interface DBCourse {
	id: Generated<string>;
	name: string;
	description?: string;
	userId: string;
	createdAt: Generated<Date>;
	visibility: Generated<number>;
	labels: Generated<string[]>;
}

export interface DBCourseShare {
	courseId: string;
	userId: string;
	sharedAt: Generated<Date>;
	permission: number;
}

export interface DBResource {
	id: Generated<string>;
	courseId: string;
	userId: string;
	name: string;
	kind: ResourceKind;
	createdAt: Generated<Date>;
	modifiedAt: Generated<Date>;
	title: string;
	content: string;
	metadata: Generated<Record<string, unknown>>;
}

declare module '@axium/server/database.js' {
	export interface Schema {
		Course: DBCourse;
		Resource: DBResource;
		CourseShare: DBCourseShare;
	}
}

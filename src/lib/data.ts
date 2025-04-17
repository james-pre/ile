export function randomID() {
	return Math.random().toString(36).substring(2);
}

export type ResourceKind = 'generic' | 'plain' | 'document' | 'audio' | 'video' | 'website';

export interface Resource<K extends ResourceKind = ResourceKind> {
	id: string;
	userId: string;
	name: string;
	kind: K;
	createdAt: Date;
	modifiedAt: Date;
	title: string;
	content: string;
}

export interface Resource_S extends Resource {
	selected?: boolean;
}

export const resourceIcons = {
	audio: 'waveform-lines',
	document: 'memo-pad',
	generic: 'file',
	plain: 'memo',
	video: 'clapperboard-play',
	website: 'link-simple',
} satisfies Record<ResourceKind, string>;

/**
 * Resources uploaded from files are stored as BLAKE3 hashes to reduce DB size and to de-duplicate files.
 * This hash is what is actually stored in these resources' `content` field.
 * This function gets the URL to the file.
 */
export function resourceURL(content: string): string {
	/** @todo Replace with the actual domain and such once implemented! */
	return 'https://resources.example.com/' + content;
}

export interface Project {
	id: string;
	title: string;
}

export interface Course {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
	description?: string;
	labels: string[];
	visibility: number;
	isShared?: boolean;
	shares?: CourseShare[];
	resources?: Resource[];
	projects?: Project[];
}

export interface CourseShare {
	courseId: string;
	userId: string;
	sharedAt: Date;
	permission: number;
}

export enum Visibility {
	Private = 0,
	Friends = 10,
	Public = 20,
}

export enum Permission {
	None = 0,
	Read = 1,
	Comment = 2,
	Write = 3,
	Manage = 5,
}

export function hasPermission(course: Course, userId: string | undefined, permission: number): boolean {
	if (course.visibility >= Visibility.Public) return true;
	if (!userId) return false;
	if (course.userId == userId) return true;

	/** @todo Once friends are implemented, add logic here */

	const share = course.shares?.find(share => share.userId == userId);
	if (!share) return false;

	return share.permission >= permission;
}

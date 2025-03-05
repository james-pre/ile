export function randomID() {
	return Math.random().toString(36).substring(2);
}

export type ResourceKind = 'generic' | 'plain' | 'document' | 'audio' | 'video' | 'website';

export interface Resource {
	id: string;
	kind: ResourceKind;
	title: string;
	contents: string;
	selected?: boolean;
}

export interface Project {
	id: string;
	title: string;
}

export interface CourseMetadata {
	id: string;
	name: string;
}

export interface Course extends CourseMetadata {
	resources: Resource[];
	projects: Project[];
}

export interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
}

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

export interface Role {
	id: string;
	name: string;
}

export interface UserSettings {
	hide_full_name: boolean;
	hide_profile_picture: boolean;
}

export interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	picture: string;
	roles: string[];
	friends: string[];
	settings: UserSettings;
}

/**
 * Smaller numbers are reserved for fine grained controls in the future.
 */
export enum Access {
	Public = 0,
	Friend = 0x50,
	Protected = 0x100,
	Private = 0x200,
	Ultimate = 0x300,
}

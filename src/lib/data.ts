import * as z from 'zod';

export function randomID() {
	return Math.random().toString(36).substring(2);
}

export type ResourceKind = 'generic' | 'plain' | 'document' | 'audio' | 'video' | 'website';

export interface ResourceMetadata {
	id: string;
	userId: string;
	name: string;
	kind: ResourceKind;
	createdAt: Date;
	modifiedAt: Date;
	title: string;
	content: string;
	metadata: Record<string, unknown>;
}

export interface Resource extends ResourceMetadata {
	selected?: boolean;
}

export const resourceIcons = {
	audio: 'waveform-lines',
	document: 'file-word',
	generic: 'file',
	plain: 'file-lines',
	video: 'clapperboard-play',
	website: 'link-simple',
} satisfies Record<ResourceKind, string>;

export interface Project {
	id: string;
	title: string;
}

export interface CourseMetadata {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
}

export interface Course extends CourseMetadata {
	resources: Resource[];
	projects: Project[];
}

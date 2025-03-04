export type Kind = 'generic' | 'plain' | 'document' | 'audio' | 'video' | 'website';

export interface ResourceInfo {
	id: string;
	kind: Kind;
	title: string;
	contents: string;
	selected?: boolean;
}

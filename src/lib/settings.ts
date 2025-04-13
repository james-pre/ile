import type { Preferences } from '@axium/server/auth.js';

export interface Setting {
	id: Exclude<keyof Preferences, `_${string}`>;
	label: string;
	description?: string;
	type: 'checkbox' | 'select' | 'text' | 'range';
	min?: number;
	max?: number;
	options?: string[];
}

export const settings = [
	{
		id: 'debug',
		label: 'Enable Debugging',
		description: 'View additional information',
		type: 'checkbox',
	},
] satisfies Setting[];

declare module '@axium/server/auth.js' {
	export interface Preferences {
		_friends: string[];
		_roles: string[];
		debug: boolean;
	}
}

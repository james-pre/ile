import type { Preferences } from '@axium/server/auth.js';
import * as z from 'zod';

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

export const Settings = z.object({
	debug: z.boolean(),
});
export type Settings = z.infer<typeof Settings>;

declare module '@axium/server/auth.js' {
	export interface Preferences extends Settings {
		// Internal role tracking
		_roles: string[];
	}
}

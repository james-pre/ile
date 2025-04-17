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

export const userSettings = [
	{
		id: 'debug',
		label: 'Enable Debugging',
		description: 'View additional information',
		type: 'checkbox',
	},
] satisfies Setting[];

export const UserSettings = z.object({
	debug: z.boolean(),
});
export type UserSettings = z.infer<typeof UserSettings>;

declare module '@axium/server/auth.js' {
	export interface Preferences extends UserSettings {
		// Internal role tracking
		_roles: string[];
	}
}

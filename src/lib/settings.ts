import type { User } from './data';

export interface Setting {
	id: keyof User['settings'];
	label: string;
	description?: string;
	type: 'checkbox' | 'select' | 'text' | 'range';
	min?: number;
	max?: number;
	options?: string[];
}

export const settings = [
	{
		id: 'hide_full_name',
		label: 'Hide Full Name',
		description: 'Hide your full name when friends view your profile',
		type: 'checkbox',
	},
	{
		id: 'hide_profile_picture',
		label: 'Hide Profile Picture',
		description: 'Hide your profile picture when friends view your profile',
		type: 'checkbox',
	},
] satisfies Setting[];

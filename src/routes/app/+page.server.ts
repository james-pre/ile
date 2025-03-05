import type { User, CourseMetadata } from '$lib/data';
import type { PageServerLoadEvent } from './$types';
import * as demo from '$lib/demo';

export function load({ params }: PageServerLoadEvent): {
	user: User;
	courses: CourseMetadata[];
} {
	return {
		user: demo.john,
		courses: [demo.course],
	};
}

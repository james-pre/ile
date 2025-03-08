import type { CourseMetadata } from '$lib/data';
import * as demo from '$lib/demo';

export function load(): {
	courses: CourseMetadata[];
} {
	return {
		courses: [demo.course],
	};
}

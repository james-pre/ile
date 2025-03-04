import * as demo from '$lib/demo.js';
import type { PageLoadEvent } from './$types';
import type { ResourceInfo } from '$lib/resource.js';

export function load({ params }: PageLoadEvent) {
	return {
		course: params.course,
		resources: params.course == 'demo' ? demo.resources.map(r => ({ ...r, id: Math.random().toString(36).substring(2) })) : [],
	} as { course: string; resources: ResourceInfo[] };
}

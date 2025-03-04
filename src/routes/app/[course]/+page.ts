import * as demo from '$lib/demo.js';
import type { PageLoadEvent } from './$types';
import type { ResourceInfo } from '$components/resource.svelte';

export function load({ params }: PageLoadEvent) {
	return {
		course: params.course,
		resources: params.course == 'demo' ? demo.resources : [],
	} as { course: string; resources: ResourceInfo[] };
}

import { html, render, nothing } from 'lit';
import * as resources from './resource.js';

/**
 * Initialize the menu
 */
export function init(): void {
	// Find or create necessary container elements
	const sidebars = document.querySelector<HTMLElement>('#sidebar-menu')!;

	for (const sidebar of Array.from(sidebars.querySelectorAll('div'))) {
		sidebar.addEventListener('click', () => switchSidebar(sidebar.className));
	}

	// Initialize with default sidebar
	switchSidebar('resources');
}

/**
 * Display a resource's content in the main area
 */
export function displayContents(resource: resources.Resource): void {
	render(
		html`
			<div class="content-header">
				<h1>${resource.icon ? html`<span class="content-icon">${resources.icons[resource.icon]}</span>` : nothing} ${resource.title}</h1>
			</div>
			<div class="content-body">
				<div class="resource-content">${resource.contents}</div>
			</div>
		`,
		document.querySelector<HTMLElement>('#content')!
	);
}

/**
 * Switch between sidebars
 */
export function switchSidebar(target: string): void {
	const sidebar = document.querySelector<HTMLElement>('#sidebar')!;

	sidebar.querySelectorAll<HTMLElement>('.main').forEach(child => {
		child.style.display = 'none';
	});

	sidebar.querySelector<HTMLElement>('#' + target)!.style.display = 'block';
}

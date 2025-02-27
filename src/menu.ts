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
 * Switch between sidebars
 */
export function switchSidebar(target: string): void {
	const sidebar = document.querySelector<HTMLElement>('#sidebar')!;

	sidebar.querySelectorAll<HTMLElement>('.main').forEach(child => {
		child.style.display = 'none';
	});

	sidebar.querySelector<HTMLElement>('#' + target)!.style.display = 'flex';
}

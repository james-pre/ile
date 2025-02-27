import * as menu from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
	menu.init();

	if (location.search.includes('?demo')) void import('./demo.js');
});

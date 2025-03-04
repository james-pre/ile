import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			strict: true,
		}),
		alias: {
			$components: 'src/components',
			$stores: 'src/stores',
			$lib: 'src/lib',
		},
		files: {
			hooks: {
				server: 'src/hooks.server.ts',
			},
		},
	},
};

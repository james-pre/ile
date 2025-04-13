import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert';

export default {
	server: {
		strictPort: true,
		port: 443,
	},
	plugins: [
		sveltekit(),
		mkcert({
			hosts: ['test.localhost'],
		}),
	],
};

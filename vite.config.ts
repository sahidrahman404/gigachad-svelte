import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [houdini(), sveltekit(), purgeCss()],
	server: {
		watch: {
			usePolling: true
		},
		host: true
	}
});

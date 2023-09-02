import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;',
				noExternal: process.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
			}
		}
	},
	
});

import adapter from '@sveltejs/adapter-auto';
import { sequence } from '@sveltejs/kit/hooks';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { optimizeImports } from "carbon-preprocess-svelte";
import { elements } from "carbon-preprocess-svelte";
import { icons } from "carbon-preprocess-svelte";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence( [vitePreprocess() ,optimizeImports(), elements(), icons()]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// vite: {
		// 	plugins: [process.env.NODE_ENV === "production" && optimizeCss()],
		// }
	}
};

export default config;

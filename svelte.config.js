import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),
	kit: {
		adapter: adapter({
			out: 'build'
		}),
		prerender: {
			enabled: true
		},
		alias: {
			$i18n: path.resolve('src/i18n'),
			$lib: path.resolve('src/lib'),
			$src: path.resolve('src')
		}
	},
	vitePlugin: {
		experimental: {
			prebundleSvelteLibraries: true
		}
	}
};

export default config;

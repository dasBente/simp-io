import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

const makePlugins = (opts = {svelte: false, css: undefined}) => [
	opts.svelte && svelte({
		preprocess: sveltePreprocess({sourceMap: !production}),
		compilerOptions: {
			// enable run-time checks when not in production
			dev: !production
		}
	}),
	opts.css && css({output: `${opts.css}-bundle.css`}),
	resolve(opts.svelte ? {browser: true, dedupe: ['svelte']} : {browser: true}),
	commonjs(),
	typescript({sourceMap: !production, inlineSources: !production}),
	production && terser()
];

export default [
	/** Pop-up **/
	{
		input: 'src/popup/main.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'popup',
			file: './extension_template/default/build/popup-bundle.js'
		},
		plugins: makePlugins({svelte: true, css: 'popup'}),
		watch: {
			clearScreen: false
		}
	},

	/** Background Script **/
	{
		input: 'src/background/main.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'background',
			file: './extension_template/default/build/background.js'
		},
		plugins: makePlugins(),
		watch: {
			clearScreen: false
		}
	},

	/** Content Script **/
	{
		input: 'src/content/main.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'content',
			file: './extension_template/default/build/content.js'
		},
		plugins: makePlugins(),
		watch: {
			clearScreen: false
		}
	}
];

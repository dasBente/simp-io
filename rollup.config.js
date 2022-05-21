import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default [
	/** Pop-up **/
	{
		input: 'src/popup-main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'popup',
			file: './extension/build/popup-bundle.js'
		},
		plugins: [
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				}
			}),

			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'popup-bundle.css' }),

			resolve({
				browser: true,
				dedupe: ['svelte']
			}),

			commonjs(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			terser()
		],
		watch: {
			clearScreen: false
		}
	},

	/** Background Script **/
	{
		input: 'src/background-main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'background',
			file: './extension/build/background.js'
		},
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			terser()
		],
		watch: {
			clearScreen: false
		}
	},

	/** Content Script **/
	{
		input: 'src/content-main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'content',
			file: './extension/build/content.js'
		},
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			terser()
		],
		watch: {
			clearScreen: false
		}
	}
];

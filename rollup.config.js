import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
// import { execSync } from 'child_process';

const OUTPUT_DIRECTORY = 'dist';
const production = process.env.DEV === undefined && !process.env.ROLLUP_WATCH;
const input = 'src/mixmix.ts';
const output = {
	sourcemap: true,
	format: 'umd',
	name: 'mixmix',
};
const watch = {
	clearScreen: false,
};

const config = [{
	input,
	output: {
		...output,
		file: `${OUTPUT_DIRECTORY}/mixmix.js`
	},
	watch,
	plugins: [
		typescript(),

		// !production && {
		// 	writeBundle() {
		// 		try {
		// 			// "npm config set color always" to get colour output
		// 			execSync('npx jest');
		// 		} catch (err) {
		// 			// console.log(err);
		// 		}
		// 	},
		// },
	],
}, {
	input,
	output: {
		...output,
		file: `${OUTPUT_DIRECTORY}/mixmix.min.js`
	},
	watch,
	plugins: [
		typescript(),

		terser(),
	],
}, {
	input,
	output: {
		...output,
		format: 'esm',
		file: `${OUTPUT_DIRECTORY}/mixmix.min.esm.js`
	},
	watch,
	plugins: [
		typescript(),

		terser(),
	],
}, {
	input,
	output: {
		...output,
		format: 'esm',
		file: `${OUTPUT_DIRECTORY}/mixmix.min.es5.js`
	},
	watch,
	plugins: [
		typescript(),

		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
			// extensions: ['.js', '.ts'],
			// include: ['src/**'],
			// babelHelpers: 'bundled',
			plugins: [
				'@babel/plugin-transform-modules-umd'
			],
			// allowAllFormats: true,
		}),

		terser(),
	],
}];

if (!production) {
	config.pop();
	config.pop();
	config.pop();
}

export default config;

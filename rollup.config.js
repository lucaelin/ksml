import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

const resources = [
  { src: 'src/res', dest: 'dist' }
];

export default [{
  input: './src/browser.js',
  output: [
    {
      format: 'esm',
      file: 'dist/browser.js',
      sourcemap: true,
    }
  ],

  plugins: [
    resolve({browser: true}),
    commonjs(),
    sourcemaps(),
    minifyHTML(),
    terser(),
    copy({
      targets: [
        ...resources
      ]
    }),
  ],

  watch: {
    clearScreen: false,
  },
}];

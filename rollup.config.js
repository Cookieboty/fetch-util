/*
 * @Author: Cookie
 * @Date: 2020-05-12 15:47:47
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-22 18:49:38
 * @Description: 
 */
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
  },
  watch: {
    include: 'src/**/*'
  },
  plugins: [
    resolve({
      extensions: ['.js']
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [
        ['@babel/preset-env']
      ],
    }),
    uglify({
      compress: {
        // drop_console: true,  // 过滤 console
        drop_debugger: false  // 过滤 debugger
      }
    })
  ]
};

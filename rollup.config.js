/*
 * @Author: Cookie
 * @Date: 2020-05-12 15:47:47
 * @LastEditors: Cookie
 * @LastEditTime: 2020-07-02 16:20:37
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
    format: 'umd'
  },
  watch: {
    include: 'src/**/*'
  },
  plugins: [
    commonjs({
      exclude: 'src/**',
    }),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [
        ['@babel/preset-env']
      ],
      plugins: [
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    }),
    resolve({
      extensions: ['.js']
    }),
    uglify({
      compress: {
        // drop_console: true,  // 过滤 console
        drop_debugger: false  // 过滤 debugger
      }
    })
  ]
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

/** @type {webpack.Configuration} */
module.exports = {
	entry: {
		bundle: ['./src/app/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	target: 'electron-renderer',
	module: {
		rules: [{
				test: /\.(svelte)$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						preprocess: require('svelte-preprocess')(),
						hotReload: true
					}
				}
			},
			{
				test : /\.ts$/, 
				use:[
					'ts-loader'
				]
			}
		]
	},
};
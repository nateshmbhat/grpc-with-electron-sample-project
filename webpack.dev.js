const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const {
	merge
} = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')

const webpack = require('webpack');

/** @type {webpack.Configuration} */
module.exports = merge(webpackCommonConfig, {
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [

				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hrm: true
					}

				},
				'css-loader'
			]
		}, ]
	},
	mode: 'development',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
	],
	devtool: 'source-map',
});
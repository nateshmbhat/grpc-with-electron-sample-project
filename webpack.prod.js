const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserWebPackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const {
	merge
} = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')

/** @type {webpack.Configuration} */
module.exports = merge(webpackCommonConfig, {
	optimization: {
		minimize : true,
		minimizer: [
			new TerserWebPackPlugin(),
		]
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		}, ]
	},
	mode: 'production',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CssMinimizerPlugin(),
	],
	devtool: false,
});
'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].[name].js'
	},
	performance: {
		hints: 'warning'
	},
	devtool: 'eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		})
	]
});

module.exports = devWebpackConfig;
